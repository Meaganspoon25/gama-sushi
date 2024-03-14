from fastapi import APIRouter, Depends, Response
from queries.reviews import ReviewsIn, ReviewsOut, ReviewsRepo
from typing import List, Optional
from authenticator import authenticator

router = APIRouter()


@router.post("/reviews/create", response_model=ReviewsOut)
def create_reviews(
    review: ReviewsIn, response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewsRepo = Depends()
):
    response.status_code = 200
    print('account data', account_data)
    return repo.create(review, user_id=account_data['id'])


@router.get("/reviews", response_model=List[ReviewsOut])
def get_all(
    repo: ReviewsRepo = Depends(),
):
    return repo.get_all()


@router.get("/reviews/{user_id}", response_model=List[ReviewsOut])
def get_all_by_user(
    repo: ReviewsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_all_by_user(user_id=account_data['id'])


@router.delete("/reviews/{review_id}", response_model=bool)
def delete_review(
    review_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewsRepo = Depends()
) -> bool:
    return repo.delete(review_id, user_id=account_data['id'])


@router.get("/reviews/{review_id}", response_model=Optional[ReviewsOut])
def get_review(
    review_id: int,
    repo: ReviewsRepo = Depends(),
):
    review = repo.get_one(review_id)
    return review


@router.put("/reviews/{review_id}", response_model=ReviewsOut)
def update_review(
    review_id: int,
    reviews: ReviewsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewsRepo = Depends()
) -> Optional[ReviewsOut]:
    updated_review = repo.update(review_id, account_data['id'], reviews)
    return updated_review
