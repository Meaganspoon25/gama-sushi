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
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run out INSERT statement
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
                id = result.fetchone()[0]
                # Return new data
                old_data = order.dict()
                return OrderOut(id=id, **old_data)

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



