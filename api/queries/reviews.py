from pydantic import BaseModel
from queries.pool import pool
from datetime import datetime
from typing import Optional


class ReviewsIn(BaseModel):
    review: str
    recommendation: bool
    date_submitted: datetime
    rating: int


class ReviewsOut(BaseModel):
    id: int
    review: str
    recommendation: bool
    date_submitted: datetime
    rating: int


class ReviewsRepo:
    def review_in_to_out(self, id: int, user_id: int, review: ReviewsIn):
        old_data = review.dict()
        return ReviewsOut(id=id, user_id=user_id, **old_data)

    def record_to_reviews_out(self, record):
        return ReviewsOut(
            id=record[0],
            review=record[1],
            recommendation=record[2],
            date_submitted=record[3],
            rating=record[4],
        )

    def create(self, reviews: ReviewsIn, user_id: int) -> ReviewsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews
                    (review,recommendation,date_submitted,rating,user_id)
                    VALUES
                    (%s,%s,%s,%s,%s)
                    RETURNING id
                    """,
                    [
                        reviews.review,
                        reviews.recommendation,
                        reviews.date_submitted,
                        reviews.rating,
                        user_id
                     ]
                )
                id = result.fetchone()[0]
                return self.review_in_to_out(id, user_id, reviews)

    def get_all(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                    id, review, recommendation, date_submitted, rating
                    FROM reviews
                    """
                )
                result = cur.fetchall()
                return [
                    self.record_to_reviews_out(record)
                    for record in result
                ]

    def get_all_by_user(self, user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, review, recommendation, date_submitted, rating
                    FROM reviews
                    WHERE user_id = %s
                    """,
                    [user_id]
                )
                result = cur.fetchall()
                return [
                    self.record_to_reviews_out(record)
                    for record in result
                ]

    def delete(self, id: int, user_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reviews
                        WHERE id = %s AND user_id = %s
                        """,
                        [id, user_id]
                    )
                    if db.rowcount > 0:
                        return True
        except Exception as e:
            print(e)
            return False

    def get_one(self, id: int) -> Optional[ReviewsOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, review, recommendation, date_submitted, rating
                    FROM reviews
                    WHERE id = %s
                    """,
                    [id]
                )
                record = cur.fetchone()
                if record:
                    return self.record_to_reviews_out(record)
                else:
                    return None

    def update(self, id: int, user_id: int, reviews: ReviewsIn) -> ReviewsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE reviews
                    SET review = %s,
                        recommendation = %s,
                        date_submitted = %s,
                        rating = %s
                    WHERE id = %s AND user_id = %s
                    """,
                    [
                        reviews.review,
                        reviews.recommendation,
                        reviews.date_submitted,
                        reviews.rating,
                        id,
                        user_id
                    ]
                )
                return self.review_in_to_out(id, user_id, reviews)
