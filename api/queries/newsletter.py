from pydantic import BaseModel, EmailStr
from queries.pool import pool


class Error(BaseModel):
    message: str


class NewsletterIn(BaseModel):
    email: EmailStr


class NewsletterOut(BaseModel):
    id: int
    email: EmailStr


class NewsletterRepository:
    def create(self, newsletter: NewsletterIn) -> NewsletterOut:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run out INSERT statement
                result = db.execute(
                    """
                    INSERT INTO newsletter
                        (email)
                    VALUES
                    (%s)
                    RETURNING id;
                    """,
                    [
                        newsletter.email
                    ]
                )
                id = result.fetchone()[0]
                # Return new data
                old_data = newsletter.dict()
                return NewsletterOut(id=id, **old_data)
