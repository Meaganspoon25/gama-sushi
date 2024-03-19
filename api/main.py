from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, giftcards
from routers import gallery, careers
from routers import reviews
from routers import cart
from routers import newsletter
from routers import contact

app = FastAPI()
app.include_router(giftcards.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(gallery.router)
app.include_router(careers.router)
app.include_router(reviews.router)
app.include_router(cart.router)
app.include_router(newsletter.router)
app.include_router(contact.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
