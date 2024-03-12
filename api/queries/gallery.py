from pydantic import BaseModel


class DuplicatePictureError(ValueError):
    pass


class PictureIn(BaseModel):
    image: str


class PictureOut(BaseModel):
    image: str


class PictureRepository:
    ...
    # def get_all_photos(self):
    #     # connect the database
    #     with pool.connection() as conn:
    #         # get a cursor (something to run SQL with)
    #         with conn.cursor() as cur:
    #             # Run our INSERT statement
    #             pam = cur.execute(
    #                 """
    #                 SELECT
    #                     image
    #                 FROM gallery
    #                 """,
    #             )
    #             results = []
    #             for row in pam.fetchall():
    #                 record = {}
    #                 for i, column in enumerate(cur.description):
    #                     record[column.name] = row[i]
    #                 results.append(record)
    #             return results

    # def get_food_photo(food):
    #     headers = {"Authorization": PEXELS_API_KEY}
    #     params = {
    #         "per_page": 1,
    #         "query": f"{food}",
    #     }
    #     url = "https://api.pexels.com/v1/search"
    #     response = requests.get(url, params=params, headers=headers)
    #     content = json.loads(response.content)
    #     try:
    #         return {"picture_url": content["photos"][0]["src"]["original"]}
    #     except (KeyError, IndexError):
    #         return {"picture_url": None}

# def get_menu_item(query):
#     headers = {"Authorization": PEXELS_API_KEY}
#     params = {
#         "per_page": 1,
#         "query": query,
#     }
#     url = "https://api.pexels.com/v1/search"
#     response = requests.get(url, params=params, headers=headers)
#     content = json.loads(response.content)
#     try:
#         return {
#             "menu_item": query,
#             "picture_url": content["photos"][0]["src"]["original"]
#         }
#     except (KeyError, IndexError):
#         return {"menu_item": query, "picture_url": None}
