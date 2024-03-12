from fastapi import (APIRouter, Depends)
from queries.careers import CareersFormIn, CareersFormOut, CareerRepository

router = APIRouter()


@router.post("/careers", response_model=CareersFormOut)
def create_career_form(
    careerform: CareersFormIn,
    repo: CareerRepository = Depends()
):
    return repo.create(careerform)
