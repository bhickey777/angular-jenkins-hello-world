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
    assert data["service"] == "hello-world-rpt-svc"


@patch(
    "controllers.holding_controller."
    "holding_service.get_holdings"
)
def test_get_holdings(mock_get_holdings, client):

    mock_get_holdings.return_value = [
        {
            "clientId": 1,
            "instrumentId": 7,
            "ticker": "GLBEQ1",
            "name": "Global Equity Index Fund",
            "assetClass": "Fund",
            "currency": "GBP",
            "quantity": 1200.0
        }
    ]

    response = client.get(
        "/api/clients/1/holdings"
    )

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 1
    assert data[0]["clientId"] == 1
    assert data[0]["ticker"] == "GLBEQ1"
    assert data[0]["quantity"] == 1200.0

    mock_get_holdings.assert_called_once_with(1)
