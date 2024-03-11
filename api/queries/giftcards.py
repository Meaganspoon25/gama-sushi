from pydantic import BaseModel
from queries.pool import pool


class GiftCardError(BaseModel):
    message: str


class GiftCardIn(BaseModel):
    name: str
    email: str
    amount: float


class GiftCardOut(BaseModel):
    id: int
    name: str
    email: str
    amount: float


class GiftCardRepository:
    def create(self, giftcard: GiftCardIn, user_id: int) -> GiftCardOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO giftcards
                        (name, email, amount, user_id)
                    VALUES
                    (%s,%s,%s, %s)
                    RETURNING id;
                    """,
                    [
                        giftcard.name,
                        giftcard.email,
                        giftcard.amount,
                        user_id,
                    ]
                )
                id = result.fetchone()[0]
                old_data = giftcard.dict()
                return GiftCardOut(id=id, **old_data)

    def get(self, giftcard_id: int) -> GiftCardOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                        id, name, email, amount
                    FROM giftcards
                    WHERE id = %s;
                    """,
                    [giftcard_id]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return GiftCardOut(
                    id=record[0],
                    name=record[1],
                    email=record[2],
                    amount=record[3],
                )

    def get_all(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        id, name, email, amount
                    FROM giftcards
                    WHERE user_id = %s
                    """,
                    [user_id]
                 )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results
