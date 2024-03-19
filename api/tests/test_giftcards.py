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
