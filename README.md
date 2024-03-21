# Module3 Project Gamma
## Gama Sushi
. Gary San Angelo
. Aakash Thapa
. Meagan Weatherspoon
. Abdullah Raja
Gama Sushi - An exquisite sushi restaurant located in the heart of downtown Las Vegas, Nevada
Gama Sushi - Known for it's unique sushi creations along with other popular Japanese cuisines
Gama Sushi - Innovative and authentic
## Design
- API design
- Data Model
- GHI
- Integrations
## Intended market
- Locals and tourists in downtown Las Vegas
- Sushi enthusiasts and food lovers
- Individuals interested in experiencing authentic Japanese cuisine
## Functionality
## Authentication
JWTdown authentication was used for this application to set up an account creation as well as requiring a valid token for logging in and out. docuementation is provided below:
    https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html
## Backend Endpoints
Utilizing RESTful APIs, we facilitated CRUD operations for our cart,reviews,accounts,careers,gallery,giftcards, and news letter. backend endpoints through our frontend components using react.
## example of classes/models/attributes and how its used in FastAPI (This model is for our cart)
    class OrderIn(BaseModel):
    item_name: str
    item_quantity: int
    item_price: float
    class OrderOut(BaseModel):
        id: int
        item_name: str
        item_quantity: int
        item_price: float
## example of methods used in FastAPI (Methods are for our cart)
    class OrderRepository:
    def create(self, order: OrderIn, user_id: int) -> OrderOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Check if the item already exists for the user
                db.execute(
                    """
                    SELECT id, item_quantity
                    FROM orders
                    WHERE item_name = %s AND user_id = %s
                    """,
                    [order.item_name, user_id]
                )
                existing_order = db.fetchone()
                if existing_order:
                    # If the item exists, update its quantity
                    new_quantity = existing_order[1] + order.item_quantity
                    db.execute(
                        """
                        UPDATE orders
                        SET item_quantity = %s
                        WHERE id = %s
                        """,
                        [new_quantity, existing_order[0]]
                    )
                    return OrderOut(id=existing_order[0], **order.dict())
                else:
                    # If the item does not exist, insert a new record
                    result = db.execute(
                        """
                        INSERT INTO orders
                            (item_name, item_quantity, item_price, user_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            order.item_name,
                            order.item_quantity,
                            order.item_price,
                            user_id,
                        ]
                    )
                    new_id = result.fetchone()[0]
                    return OrderOut(id=new_id, **order.dict())
## Accessing Endpoints to Send and View Data - Access through SwaggerUI (Sends and returns JSON bodys):
### Giftcards:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List giftcards | GET | http://localhost:8000/docs#/default/get_giftcards_giftcards_get
| Create a giftcard | POST | http://localhost:8000/docs#/default/create_giftcard_giftcards_post
| Show a specific giftcard | GET | http://localhost:8000/docs#/default/get_giftcard_giftcards__giftcard_id__get
To create a giftcard:
```
{
  "name": "string",
  "email": "string",
  "amount": 0
}
```
Return Value of Creating a giftcard:
```
{
  "id": 0,
  "name": "string",
  "email": "string",
  "amount": 0
}
```
Return value of Listing all giftcard:
```
[
  {
    "id": 1,
    "name": "test1",
    "email": "string",
    "amount": 0
  },
  {
    "id": 2,
    "name": "test2",
    "email": "string",
    "amount": 0
  },
  {
    "id": 3,
    "name": "test3",
    "email": "string",
    "amount": 0
  }
]
```
### Gallery, Careers, Newsletter, Contact us
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List of gallery images | GET | http://localhost:8000/docs#/default/photo_gallery_get
| Signing up for a newsletter | POST | http://localhost:8000/docs#/default/create_newsletter_newsletter_post
| Submitting a form for a career opportunity | POST | http://localhost:8000/docs#/default/create_career_form_careers_post
| Form for contact information | POST | http://localhost:8000/docs#/default/create_contact_form_contactus_post
## Gallery uses a 3rd party API key to get images
To get an image:
```
entry field for a string
```
Return value of getting an image:
```
{
  "image": "https://images.pexels.com/photos/2048865/pexels-photo-2048865.jpeg"
}
```
filling out a form for a career opportunity:
```
{
  "first_name": "string",
  "last_name": "string",
  "email": "user@example.com",
  "phone_number": 0,
  "resume": "string"
}
```
Return value for submitting career form:
```
{
  "id": 0,
  "first_name": "string",
  "last_name": "string",
  "email": "user@example.com",
  "phone_number": 0,
  "resume": "string"
}
```
Signing up for a newsletter:
```
{
  "email": "user@example.com"
}
```
Return value for newsletter:
```
{
  "id": 0,
  "email": "user@example.com"
}
```
Filling out contact information:
```
{
  "first_name": "string",
  "last_name": "string",
  "email": "user@example.com",
  "message": "string"
}
```
Return value of filling out contact information:
```
{
  "id": 0,
  "first_name": "string",
  "last_name": "string",
  "email": "user@example.com",
  "message": "string"
}
```
### Accounts(Token login and account by username does not require JSON input):
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all accounts | GET | http://localhost:8000/docs#/default/get_accounts_accounts_get
| Create a new account | POST | http://localhost:8000/docs#/default/create_accounts_accounts_post
| Show account by username | GET | http://localhost:8000/docs#/default/get_account_accounts__username__get
| list of unique tokens | GET | http://localhost:8000/docs#/default/get_token_token_get
| token associated with account to login | POST | http://localhost:8000/docs#/default/login_token_post
| token associated with account to logout | DELETE | http://localhost:8000/docs#/default/logout_token_delete
List all accounts:
```
{
  "accounts": [
    {
      "username": "test",
      "password": "$2b$12$k68tvr6tll2mHTgFTl4bUeRIdKk70Y6hJzqejO2DhI.mN4akWV8/.",
      "email": "1@1.com",
      "first_name": "bob",
      "last_name": "saget"
    }
  ]
}
```
Create a new account:
```
{
  "username": "string",
  "password": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string"
}
```
Return value of creating an account:
```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string"
  }
}
```
Return value of account by username:
```
{
  "id": 1,
  "username": "test",
  "hashed_password": "$2b$12$k68tvr6tll2mHTgFTl4bUeRIdKk70Y6hJzqejO2DhI.mN4akWV8/.",
  "email": "1@1.com",
  "first_name": "bob",
  "last_name": "saget"
}
```
Token by logged in user:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOWExYTU4Mi0zYTRiLTQ3YjgtYTFmNi04OGYzYTE3MTZiNTQiLCJleHAiOjE3MTEwNTEyMDksInN1YiI6InRlc3QyIiwiYWNjb3VudCI6eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MiIsImVtYWlsIjoiMUAxLmNvbSIsImZpcnN0X25hbWUiOiJmcmFuayIsImxhc3RfbmFtZSI6ImhhbGwifX0.9LS-MJItUJawLOSEKjL5WKgTYId1ObLy335UAZskmhI",
  "token_type": "Bearer",
  "account": {
    "id": 2,
    "username": "test2",
    "email": "1@1.com",
    "first_name": "frank",
    "last_name": "hall"
  }
}
```
Logging in to get token:
```
username: test password: west
```
returning value of logging in:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MmNkNjIxNi04MjQ5LTRiYjUtOTA0ZS1kNTk3M2JlN2FlYjQiLCJleHAiOjE3MTEwNDk5MDQsInN1YiI6InRlc3QiLCJhY2NvdW50Ijp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6IjFAMS5jb20iLCJmaXJzdF9uYW1lIjoiYm9iIiwibGFzdF9uYW1lIjoic2FnZXQifX0.bMm54qWn9Pc9ZDKuTIQWbEgc0U-CVx_T304V579q3b8",
  "token_type": "Bearer"
}
```
Logging out of account return value:
```
true
```
## Reviews (PUT/DELETE review by review id does not use JSON input):
| Action | Method | URL
| ----------- | ----------- | ----------- |
| Create a review | POST | http://localhost:8000/docs#/default/create_reviews_reviews_create_post
| List of all reviews | GET | http://localhost:8000/docs#/default/get_all_reviews_get
| List of reviews by user id | GET | http://localhost:8000/docs#/default/get_all_by_user_reviews__user_id__get
| Get a single review by review id | GET | http://localhost:8000/docs#/default/get_review_review__review_id__get
| Update review by review id | PUT | http://localhost:8000/docs#/default/update_review_review__review_id__put
| Delete a review by review id | DELETE | http://localhost:8000/docs#/default/delete_review_reviews__review_id__delete
```
Create a review:
```
{
  "review": "string",
  "recommendation": true,
  "date_submitted": "2024-03-21",
  "rating": 0
}
```
Return value of creating a review:
```
{
  "id": 0,
  "review": "string",
  "recommendation": true,
  "date_submitted": "2024-03-21",
  "rating": 0
}
```
Return value of all reviews:
```
[
  {
    "id": 2,
    "review": "string",
    "recommendation": true,
    "date_submitted": "2024-03-21",
    "rating": 1
  },
  {
    "id": 3,
    "review": "string",
    "recommendation": true,
    "date_submitted": "2024-03-21",
    "rating": 1
  },
  {
    "id": 4,
    "review": "string",
    "recommendation": true,
    "date_submitted": "2024-03-21",
    "rating": 1
  }
]
```
Return value of reviews by user_id:
```
{
    "id": 2,
    "review": "string",
    "recommendation": true,
    "date_submitted": "2024-03-21",
    "rating": 1
  },
```
Return value of reviews by review_id:
```
{
  "id": 2,
  "review": "string",
  "recommendation": true,
  "date_submitted": "2024-03-21",
  "rating": 1
}
```
Update review by review_id:
```
{
  "review": "string",
  "recommendation": true,
  "date_submitted": "2024-03-21",
  "rating": 0
}
```
Return value of updating review by review_id:
```
{
  "id": 2,
  "review": "string",
  "recommendation": true,
  "date_submitted": "2024-03-21",
  "rating": 4
}
```
Return value of deleting a review by review_id:
```
true
```
## Cart/Order(DELETE order and checkout order does no require json input)
    | Action | Method | URL
    | ----------- | ----------- | ----------- |
    | Create a new order | POST | http://localhost:8000/docs#/default/create_order_orders_post
    | List of all orders | GET | http://localhost:8000/docs#/default/get_all_orders_get
    | Delete order by id | DELETE | http://localhost:8000/docs#/default/delete_order_orders__order_id__delete
    | Get order by user id | GET | http://localhost:8000/docs#/default/get_order_byuser_orders__user_id__get
    | Checkout order | POST | http://localhost:8000/docs#/default/checkout_order_order_checkout_post
```
5:11
Creating an order:
```
{
  "item_name": "fish",
  "item_quantity": 4,
  "item_price": 4
}
```
Return value of order:
```
{
  "id": 1,
  "item_name": "fish",
  "item_quantity": 4,
  "item_price": 4
}
```
Return value of all orders/orders by user id:
```
[
  {
    "id": 1,
    "item_name": "fish",
    "item_quantity": 4,
    "item_price": 4
  }
]
```
Delete order by id return value:
```
true
```
check out order requires input of integer tip amount
```
Return value of checkout:
```
input of tip amount
```
- Homepage:
   . Slide show presentation of our sushi dishes
   . Learn about our history, mission, ingedients, and menu
   .  View different photos of some of our dishes which is connected to a link for our instagram page
   . A map with our address information
- Navbar
   . View a list of our menu items
   . Read about our vision and goals for our unique establishment
   . Place orders of our dishes
   . View a gallery of our tasty dishes
   . Create a giftcard for someone
   . Signup/Login option for customers
- Footer:
   . Viewers can send us their contact information
   . Restaurant hours list
   . Create/update a review of our restaurant
   . Fill out a form for careers opportunities
   . Subscribe to our newsletter for the latest news and updates
## User Stories/Scenarios
## Stretch Goals
   . Make an order history page
   . Make migration table more detailed for our cart feature
   . More unique designs/layouts
## Onboarding
- To get started with onboarding our project, we will explain the branching strategy, handling of third-party API keys, setting up your local development environment managing env’s, and integrating with our CI/CD pipeline.
1) fork the repository and clone locally to your machine by typing this into the terminal:
Git clone https://gitlab.com/sushify-app/gama-sushi.git
 2) Install the dependencies for this project via the terminal:
Cd (to project directory)
Install the following dependencies: "dependencies": {
    "@galvanize-inc/jwtdown-for-react": "^0.2.4",
    "bootstrap": "^5.3.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.1",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3"
Install the following dev dependencies: "devDependencies": {
    "@types/node": "^20.10.7",
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react-swc": "^3.3.2",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "vite": "^4.4.5"
  },
3) For the development environment, docker needs to be installed. Run the following commands once that is done inside the project directory.
docker volume create postgres-data
docker-compose up –build
4) We use feature branching strategy, for each feature or bug fix we will use a different branch.
Git checkout -b (branch name)
5) An .env file needs to be created and this will store all the necessary 3rd party API keys and signing keys.
Add .env to  .gitignore to prevent sensitive data from being committed.
6) for our CI/CD pipine, we use gitlab merge requests to automate testing and deployment processes.
GitLabGitLab
Sushify app / Gama-sushi · GitLab
GitLab.com
## Tech Stack
   . React
   . FastAPI
   . PostgreSQL
   . Docker
## Documentation
![alt text](<DesignImage/Excalidraw-Wireframe (1).png>)
## Issue Tracking
## Unit Tests
This section goes over the unit testing we performed to ensure our backend endpoints will work as attended.
Abdullah ensured the newsletter was working as intended when submitting an email, Meagan verified we were able to retrieve a list of giftcards,
Aakash was able to fetch a list of all reviews and Gary was able to recreate the POST method of a career.
## Abdullah Raja
    import unittest
    from unittest.mock import MagicMock
    from routers.newsletter import create_newsletter
    from queries.newsletter import (
    NewsletterIn, NewsletterOut,
    NewsletterRepository)
        class TestCreateNewsletter(unittest.TestCase):
            def test_create_newsletter(self):
                # Mock the repository
                mock_repo = MagicMock(spec=NewsletterRepository)
                mock_repo.create.return_value = NewsletterOut(id=1,
                                                            email="test@example.com")
                # Call the function under test
                newsletter_data = NewsletterIn(email="test@example.com")
                response = create_newsletter(
                    newsletter=newsletter_data,
                    repo=mock_repo)
                # Assert the response
                self.assertEqual(response, NewsletterOut(id=1,
                                                        email="test@example.com"))
        if __name__ == '__main__':
            unittest.main()
## Meagan Weatherspoon
    import unittest
    from unittest.mock import MagicMock
    from routers.giftcards import get_giftcard
    from queries.giftcards import GiftCardOut, GiftCardRepository
        class TestGetGiftCard(unittest.TestCase):
            def test_get_giftcard(self):
                mock_repo = MagicMock(spec=GiftCardRepository)
                mock_repo.get.return_value = GiftCardOut(
                    id=1,
                    name="Test Gift Card",
                    email="test@example.com",
                    amount=50.0
                )
                response = get_giftcard(giftcard_id=1, repo=mock_repo)
                expected_response = GiftCardOut(
                    id=1,
                    name="Test Gift Card",
                    email="test@example.com",
                    amount=50.0
                )
                self.assertEqual(response, expected_response)
        if __name__ == '__main__':
            unittest.main()
## Aakash Thapa
    import unittest
    from unittest.mock import MagicMock
    from routers.reviews import get_all
        class TestReviews(unittest.TestCase):
            def test_get_all_reviews(self):
                mock_repo = MagicMock()
                mock_repo.get_all.return_value = [{'id': 1,
                                                'review': 'Great',
                                                'recommendation': True,
                                                'date_submitted': '2024-03-19',
                                                'rating': 5}]
                response = get_all(repo=mock_repo)
                self.assertEqual(response, [{'id': 1,
                                            'review': 'Great',
                                            'recommendation': True,
                                            'date_submitted': '2024-03-19',
                                            'rating': 5}])
        if __name__ == '__main__':
            unittest.main()
## Gary San Angelo
    import unittest
    from unittest.mock import MagicMock
    from routers.careers import create_career_form
    from queries.careers import CareersFormIn, CareersFormOut, CareerRepository
        class TestCreateCareerForm(unittest.TestCase):
            def test_create_career_form(self):
                # Mock the repository
                mock_repo = MagicMock(spec=CareerRepository)
                mock_repo.create.return_value = CareersFormOut(
                    id=1,
                    first_name="John",
                    last_name="Doe",
                    email="john@example.com",
                    phone_number=1234567890,
                    resume="John's resume"
                )
                # Call the function under test
                career_form_data = CareersFormIn(
                    first_name="John",
                    last_name="Doe",
                    email="john@example.com",
                    phone_number=1234567890,
                    resume="John's resume"
                )
                response = create_career_form(careerform=career_form_data,
                                            repo=mock_repo)
                # Assert the response
                expected_response = CareersFormOut(
                    id=1,
                    first_name="John",
                    last_name="Doe",
                    email="john@example.com",
                    phone_number=1234567890,
                    resume="John's resume"
                )
                self.assertEqual(response, expected_response)
        if __name__ == '__main__':
            unittest.main()
