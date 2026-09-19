from repositories.holding_repository import HoldingRepository

class HoldingService:

    def __init__(self):
        self.repository = HoldingRepository()

    def get_holdings(self, client_id: int) -> list[dict]:

        holdings = self.repository.find_by_client_id(
            client_id
        )

        results = []

        for holding in holdings:

            results.append({
                "clientId": holding.client_id,
                "instrumentId": holding.instrument_id,
                "ticker": holding.ticker,
                "name": holding.name,
                "assetClass": holding.asset_class,
                "currency": holding.currency,
                "quantity": float(holding.quantity)
            })

        return results
    