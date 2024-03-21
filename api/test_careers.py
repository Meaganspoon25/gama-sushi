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
        response = create_career_form(
            careerform=career_form_data,
            repo=mock_repo
        )
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
