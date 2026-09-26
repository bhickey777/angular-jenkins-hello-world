from repositories.trade_repository import TradeRepository

class TradeService:

    def __init__(self):
        self.repository = TradeRepository()

    def get_trades(self, client_id: int) -> list[dict]:

        trades = self.repository.find_by_client_id(
            client_id
        )

        results = []

        for trade in trades:

            results.append({
                "clientId": trade.client_id,
                "instrumentId": trade.instrument_id,
                "ticker": trade.ticker,
                "name": trade.name,
                "tradeType": trade.trade_type,
                "currency": trade.currency,
                "quantity": float(trade.quantity)
            })

        return results
    