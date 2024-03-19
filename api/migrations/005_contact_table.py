steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE contact (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            message TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE contact;
        """
    ],
]
