import unittest
from unittest.mock import MagicMock
from routers.newsletter import create_newsletter
from queries.newsletter import (
    NewsletterIn,
    NewsletterOut,
    NewsletterRepository)


class TestCreateNewsletter(unittest.TestCase):
    def test_create_newsletter(self):
        # Mock the repository
        mock_repo = MagicMock(spec=NewsletterRepository)
        mock_repo.create.return_value = NewsletterOut(
            id=1,
            email="test@example.com")
        # Call the function under test
        newsletter_data = NewsletterIn(email="test@example.com")
        response = create_newsletter(
            newsletter=newsletter_data,
            repo=mock_repo)
        # Assert the response
        self.assertEqual(response, NewsletterOut(
            id=1,
            email="test@example.com"))


if __name__ == '__main__':
    unittest.main()
