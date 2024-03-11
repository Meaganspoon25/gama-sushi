steps = [
    [
        # item table required
        # "Up" SQL statement
        """
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY NOT NULL,
            item_name VARCHAR(100) NOT NULL,
            item_quantity INT NOT NULL,
            item_price FLOAT NOT NULL,
            user_id INTEGER NOT NULL REFERENCES accounts("id")
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE orders;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE checkout (
            id SERIAL PRIMARY KEY NOT NULL,
            total FLOAT NOT NULL,
            user_id INTEGER NOT NULL REFERENCES accounts("id")
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE checkout;
        """
    ]

]
