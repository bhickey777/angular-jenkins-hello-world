from decimal import Decimal
from unittest.mock import Mock

from models.holding import Holding
from services.holding_service import HoldingService


def test_get_holdings():

    repository = Mock()

    repository.find_by_client_id.return_value = [
        Holding(
            client_id=1,
            instrument_id=7,
            ticker="GLBEQ1",
            name="Global Equity Index Fund",
            asset_class="Fund",
            currency="GBP",
            quantity=Decimal("1200.0000")
        )
    ]

    service = HoldingService()

    service.repository = repository

    result = service.get_holdings(1)

    assert len(result) == 1

    assert result[0]["clientId"] == 1
    assert result[0]["ticker"] == "GLBEQ1"
    assert result[0]["quantity"] == 1200.0

    repository.find_by_client_id.assert_called_once_with(1)