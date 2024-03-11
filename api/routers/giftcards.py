from fastapi import (
    APIRouter, Depends
)
from queries.giftcards import GiftCardIn, GiftCardOut, GiftCardRepository
from queries.giftcards import GiftCardError
from authenticator import authenticator
from typing import Union

router = APIRouter()


@router.post("/giftcards", response_model=Union[GiftCardOut, GiftCardError])
def create_giftcard(
    giftcard: GiftCardIn,
    repo: GiftCardRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.create(giftcard, user_id=account_data["id"])


@router.get("/giftcards", response_model=list[GiftCardOut])
def get_giftcards(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: GiftCardRepository = Depends()
):
    return repo.get_all(user_id=account_data["id"])


@router.get("/giftcards/{giftcard_id}")
def get_giftcard(
    giftcard_id: int,
    repo: GiftCardRepository = Depends()
):
    return repo.get(giftcard_id)
