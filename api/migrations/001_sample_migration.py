steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (id SERIAL PRIMARY KEY NOT NULL, username VARCHAR(50) NOT NULL, password VARCHAR(1000) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL);
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ],
]
