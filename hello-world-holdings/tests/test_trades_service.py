from decimal import Decimal
from unittest.mock import Mock

from models.trade import Trade
from services.trade_service import TradeService


def test_get_trades():

    repository = Mock()

    repository.find_by_client_id.return_value = [
        Trade(
            client_id=1,
            instrument_id=7,
            ticker="GLBEQ1",
            name="Global Equity Index Fund",
            trade_type="SELL",
            currency="GBP",
            quantity=Decimal("1200.0000")
        )
    ]

    service = TradeService()

    service.repository = repository

    result = service.get_trades(1)

    assert len(result) == 1

    assert result[0]["clientId"] == 1
    assert result[0]["ticker"] == "GLBEQ1"
    assert result[0]["quantity"] == 1200.0

    repository.find_by_client_id.assert_called_once_with(1)