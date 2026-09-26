import os
import psycopg

def get_connection():

    return psycopg.connect(
        host=os.environ.get(
            "DB_HOST",
            "localhost"
        ),
        port=os.environ.get(
            "DB_PORT",
            "5432"
        ),
        dbname=os.environ.get(
            "DB_NAME",
            "helloworld_wealth"
        ),
        user=os.environ.get(
            "DB_USER",
            "postgres"
        ),
        password=os.environ.get(
            "DB_PASSWORD"
        )
    )