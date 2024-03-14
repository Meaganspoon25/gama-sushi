from typing import List, Union
from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class OrderIn(BaseModel):
    item_name: str
    item_quantity: int
    item_price: float


class OrderOut(BaseModel):
    id: int
    item_name: str
    item_quantity: int
    item_price: float


class OrderRepository:
    def create(self, order: OrderIn, user_id: int) -> OrderOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Check if the item already exists for the user
                db.execute(
                    """
                    SELECT id, item_quantity
                    FROM orders
                    WHERE item_name = %s AND user_id = %s
                    """,
                    [order.item_name, user_id]
                )
                existing_order = db.fetchone()

                if existing_order:
                    # If the item exists, update its quantity
                    new_quantity = existing_order[1] + order.item_quantity
                    db.execute(
                        """
                        UPDATE orders
                        SET item_quantity = %s
                        WHERE id = %s
                        """,
                        [new_quantity, existing_order[0]]
                    )
                    return OrderOut(id=existing_order[0], **order.dict())
                else:
                    # If the item does not exist, insert a new record
                    result = db.execute(
                        """
                        INSERT INTO orders
                            (item_name, item_quantity, item_price, user_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            order.item_name,
                            order.item_quantity,
                            order.item_price,
                            user_id,
                        ]
                    )
                    new_id = result.fetchone()[0]
                    return OrderOut(id=new_id, **order.dict())

    def delete(self, order_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM orders
                        WHERE id = %s
                        """,
                        [order_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_all(self) -> Union[Error, List[OrderOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    # Run SELECT statement
                    result = db.execute(
                        """
                        SELECT id, item_name, item_quantity, item_price
                        FROM orders
                        ORDER BY item_quantity;
                        """
                    )
                    result = []
                    for record in db:
                        order = OrderOut(
                            id=record[0],
                            item_name=record[1],
                            item_quantity=record[2],
                            item_price=record[3]
                        )
                        result.append(order)
                    return result
        except Exception:
            return {"message": "Could not get all Orders!!"}

    def get_order_byuser(self, user_id: int):
        # connect the database
        with pool.connection() as conn:
            # get a cursor
            with conn.cursor() as db:
                # Run SELECT statement
                result = db.execute(
                    """
                    SELECT id, item_name, item_quantity, item_price
                    FROM orders
                    WHERE user_id = %s
                    """,
                    [user_id]
                )
                results = []
                for row in result.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    results.append(record)
                return results
