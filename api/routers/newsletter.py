from fastapi import APIRouter, Depends
from typing import Union
from queries.newsletter import (
    Error, NewsletterOut, NewsletterRepository, NewsletterIn)

router = APIRouter()


@router.post("/newsletter", response_model=Union[NewsletterOut, Error])
def create_newsletter(
    newsletter: NewsletterIn,
    repo: NewsletterRepository = Depends()
):
    return repo.create(newsletter)