from repositories.holding_repository import HoldingRepository


class HoldingService:

    def __init__(self):
        self.repository = HoldingRepository()

    def get_holdings(self, client_id):

        rows = self.repository.find_by_client_id(
            client_id
        )

        holdings = []

        for row in rows:

            holdings.append({
                "client_id": row[0],
                "instrumentId": row[1],
                "symbol": row[2],
                "name": row[3],
                "assetClass": row[4],
                "currency": row[5],
                "quantity": float(row[6])
            })

        return holdings
    