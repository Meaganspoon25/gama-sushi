from fastapi import (APIRouter, Depends)
from queries.contact import ContactFormIn, ContactFormOut, ContactRepository

router = APIRouter()


@router.post("/contactus", response_model=ContactFormOut)
def create_contact_form(
    contactform: ContactFormIn,
    repo: ContactRepository = Depends()
):
    return repo.create(contactform)
