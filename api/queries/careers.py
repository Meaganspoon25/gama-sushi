from pydantic import BaseModel, EmailStr
from queries.pool import pool


class CareersFormIn(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: int
    resume: str


class CareersFormOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: int
    resume: str


class CareerRepository:
    def create(self, careerform: CareersFormIn) -> CareersFormOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO careers
                        (first_name, last_name, email, phone_number, resume)
                    VALUES
                    (%s,%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                        careerform.first_name,
                        careerform.last_name,
                        careerform.email,
                        careerform.phone_number,
                        careerform.resume,
                    ]
                )
                id = result.fetchone()[0]
                old_data = careerform.dict()
                return CareersFormOut(id=id, **old_data)
