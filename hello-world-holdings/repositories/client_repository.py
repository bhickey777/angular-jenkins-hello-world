from database import get_connection
from models.client import Client


class ClientRepository:

    def find_by_id(
        self,
        client_id: int
    ) -> Client | None:

        sql = """
            SELECT
                client_id,
                name,
                email,
                date_of_birth,
                risk_profile,
                advisor_id,
                joined_date
            FROM clients
            WHERE client_id = %s
        """

        with get_connection() as connection:
            with connection.cursor() as cursor:

                cursor.execute(
                    sql,
                    (client_id,)
                )

                row = cursor.fetchone()

        if row is None:
            return None

        return Client(
            client_id=row[0],
            name=row[1],
            email=row[2],
            date_of_birth=row[3],
            risk_profile=row[4],
            advisor_id=row[5],
            joined_date=row[6]
        )