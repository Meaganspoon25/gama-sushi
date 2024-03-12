from fastapi import APIRouter
from pydantic import BaseModel
from queries.gallery import PictureOut
import requests
import json

PEXELS_API_KEY = "QEDELBUOXiIWk9okf7M5Lc1Asy1QwHVFM0qvVtmMtv1MXTVStdzx66eC"


router = APIRouter()


class GalleryImage(BaseModel):
    image: str


def get_food_photo(food: str):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "per_page": 1,
        "query": f"{food}",
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)
    print(content)
    try:
        return {"image": content["photos"][0]["src"]["original"]}
    except (KeyError, IndexError):
        return {"image": None}


@router.get("/gallery", response_model=PictureOut)
async def photo(query: str):
    image_url = get_food_photo(query)
    return image_url
