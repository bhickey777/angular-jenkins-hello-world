from repositories.client_repository import (
    ClientRepository
)


class ClientService:

    def __init__(self):
        self.repository = ClientRepository()

    def get_client(self, client_id: int):

        client = self.repository.find_by_id(
            client_id
        )

        if client is None:
            return None

        return {
            "clientId": client.client_id,
            "name": client.name,
            "email": client.email,
            "dateOfBirth":
                client.date_of_birth.isoformat(),
            "riskProfile": client.risk_profile,
            "advisorId": client.advisor_id,
            "joinedDate":
                client.joined_date.isoformat()
        }