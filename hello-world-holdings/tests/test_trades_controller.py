from unittest.mock import patch

import pytest

from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200

    data = response.get_json()

    assert data["status"] == "UP"
    assert data["service"] == "holdings-service"


@patch(
    "controllers.trades_controller."
    "trade_service.get_trades"
)
def test_get_trades(mock_get_trades, client):

    mock_get_trades.return_value = [
        {
            "clientId": 1,
            "instrumentId": 7,
            "ticker": "GLBEQ1",
            "name": "Global Equity Index Fund",
            "trade_type": "SELL",
            "currency": "GBP",
            "quantity": 1200.0
        }
    ]

    response = client.get(
        "/api/clients/1/trades"
    )

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 1
    assert data[0]["clientId"] == 1
    assert data[0]["ticker"] == "GLBEQ1"
    assert data[0]["quantity"] == 1200.0

    mock_get_trades.assert_called_once_with(1)
