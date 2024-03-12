from fastapi import APIRouter, Depends
from typing import List, Union
from queries.cart import Error, OrderIn, OrderRepository, OrderOut
from authenticator import authenticator

router = APIRouter()


@router.post("/orders", response_model=Union[OrderOut, Error])
def create_order(
    order: OrderIn,
    repo: OrderRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.create(order, user_id=account_data["id"])


@router.delete("/orders/{order_id}", response_model=bool)
def delete_order(
    order_id: int,
    repo: OrderRepository = Depends(),
) -> bool:
    return repo.delete(order_id)


@router.get("/orders", response_model=Union[Error, List[OrderOut]])
def get_all(
    repo: OrderRepository = Depends(),
):
    return repo.get_all()


@router.get("/orders/{user_id}")
def get_order_byuser(
    repo: OrderRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_order_byuser(user_id=account_data["id"])


@router.post("/order/checkout", response_model=float)
def checkout_order(
    tip_amount: float,
    repo: OrderRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> float:
    orders = repo.get_order_byuser(user_id=account_data["id"])
    orders = [OrderOut(**order_dict) for order_dict in orders]
    subtotal = sum(
        (order.item_quantity * order.item_price) for order in orders
        )
    tax_rate = 0.10
    tax = tax_rate * subtotal
    total_before_tip = subtotal + tax
    total = total_before_tip + tip_amount
    total = round(total, 2)
    return total