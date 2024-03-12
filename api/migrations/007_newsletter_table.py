steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE newsletter (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(150) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE newsletter;
        """
    ],
]
