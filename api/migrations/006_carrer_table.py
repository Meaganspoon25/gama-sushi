steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE careers (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            phone_number VARCHAR(50) NOT NULL,
            resume VARCHAR(500) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE careers;
        """
    ],
]
