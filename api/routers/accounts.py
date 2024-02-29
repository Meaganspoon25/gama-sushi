from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from queries.accounts import AccountIn, AccountOut, AccountRepository
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from queries.accounts import DuplicateAccountError


router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password:str


class AccountToken(Token):
    account: AccountOut


class HTTPError(BaseModel):
    detail: str


@router.post("/accounts", response_model= AccountToken | HTTPError)
async def create_accounts(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends()
    ):
    hashed_password = authenticator.hash_password(info.password)
    print(info)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/accounts")
def get_accounts(
        repo: AccountRepository = Depends()
    ):
    return {
        "accounts": repo.get_all(),
    }


@router.get("/accounts/{username}")
def get_account(
        username: str,
        repo: AccountRepository = Depends()
    ):
    return repo.get(username)


@router.get("/token", response_model=AccountToken | None)
async def get_token(
        request: Request,
        account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
