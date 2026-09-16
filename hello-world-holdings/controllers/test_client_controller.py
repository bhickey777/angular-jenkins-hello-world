from unittest.mock import patch

import pytest

from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


@patch(
    "controllers.client_controller."
    "client_service.get_client"
)
def test_get_client(mock_get_client, client):

    mock_get_client.return_value = {
        "clientId": 1,
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "dateOfBirth": "1978-04-12",
        "riskProfile": "Balanced",
        "advisorId": 1,
        "joinedDate": "2019-02-01"
    }

    response = client.get(
        "/api/clients/1"
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["clientId"] == 1
    assert data["name"] == "Alice Johnson"
    assert data["email"] == "alice@example.com"
    assert data["riskProfile"] == "Balanced"
    assert data["advisorId"] == 1

    mock_get_client.assert_called_once_with(1)
    
@patch(
    "controllers.client_controller."
    "client_service.get_client"
)
def test_get_client_not_found(mock_get_client, client):

    mock_get_client.return_value = None

    response = client.get(
        "/api/clients/999"
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["message"] == "Client not found"

    mock_get_client.assert_called_once_with(999)
    
def test_get_client_invalid_id(client):

    response = client.get(
        "/api/clients/abc"
    )

    assert response.status_code == 404
