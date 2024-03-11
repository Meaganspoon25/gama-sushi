steps = [
    [
        # "Up" SQL statement for creating the reviews table
        """
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY NOT NULL,
            review TEXT,
            recommendation BOOLEAN,
            date_submitted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
            user_id INT NOT NULL REFERENCES accounts("id")
        );
        """,
        # "Down" SQL statement for dropping the reviews table
        """
        DROP TABLE reviews;
        """
    ],
]
