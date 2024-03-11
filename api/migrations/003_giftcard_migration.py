steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE giftcards (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            amount NUMERIC(10, 2) NOT NULL,
            user_id INTEGER NOT NULL REFERENCES accounts("id")
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE giftcards;
        """
    ],
]
