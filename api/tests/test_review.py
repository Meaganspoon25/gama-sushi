import unittest
from unittest.mock import patch, MagicMock
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
