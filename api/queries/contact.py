from pydantic import BaseModel, EmailStr
from queries.pool import pool


class ContactFormIn(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    message: str


class ContactFormOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    message: str


class ContactRepository:
    def create(self, contactform: ContactFormIn) -> ContactFormOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO contact
                        (first_name, last_name, email, message)
                    VALUES
                    (%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                        contactform.first_name,
                        contactform.last_name,
                        contactform.email,
                        contactform.message,
                    ]
                )
                id = result.fetchone()[0]
                old_data = contactform.dict()
                return ContactFormOut(id=id, **old_data)
