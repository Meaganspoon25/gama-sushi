from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class Account(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str
    first_name: str
    last_name: str


class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str


class AccountRepository:
    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (username, password, email, first_name, last_name)
                    VALUES
                    (%s,%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                    account.username,
                    hashed_password,
                    account.email,
                    account.first_name,
                    account.last_name
                    ]
                )
                id = result.fetchone()[0]
                return Account(id=id, username=account.username, hashed_password=hashed_password,
                                first_name=account.first_name, last_name=account.last_name, email=account.email)

    def get(self, username: str) -> Account:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                    """
                    SELECT
                        id, username, password, email, first_name, last_name
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return Account(
                        id=record[0],
                        username=record[1],
                        hashed_password=record[2],
                        email=record[3],
                        first_name=record[4],
                        last_name=record[5],
                        )

    def get_all(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                pam = cur.execute(
                """
                SELECT
                    username, password, email, first_name, last_name
                FROM accounts
                """,
                )
                results = []
                for row in pam.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results
