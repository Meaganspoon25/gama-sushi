from fastapi import (APIRouter, Depends, Response, Request, HTTPException, status, File, UploadFile)
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from queries.careers import CareersFormIn, CareersFormOut, CareerRepository

router = APIRouter()

@router.post("/careers", response_model=CareersFormOut)
def create_career_form(careerform: CareersFormIn, repo: CareerRepository = Depends()):
    return repo.create(careerform)
