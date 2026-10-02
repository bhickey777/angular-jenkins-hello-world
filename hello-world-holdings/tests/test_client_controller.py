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
def test_get_client(mock_get_client, client_id):

    mock_get_client.return_value = [
        {
            "client_id": 1,
            "name":"alicerow",
            "email": "alicerow@gmail.com",
            "date_of_birth":"09-06-2000",
            "risk_profile": "moderate",
            "adviisor_id": 1,
            "joinedDate": "09-03-2026"
        }
    ]

    response = client.get(
        "/api/clients/1",
    )

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 1
    assert data[0]["clientId"] == 1
    assert data[0]["name"] == "alicerow"
    assert data[0]["advisor_id"] == 1

    mock_get_client.assert_called_once_with(1)
    
def test_get_client_by_name(mock_get_client_by_name, client_name):

    mock_get_client_by_name.return_value = [
        {
            "client_id": 1,
            "name":"alicerow",
            "email": "alicerow@gmail.com",
            "date_of_birth":"09-06-2000",
            "risk_profile": "moderate",
            "adviisor_id": 1,
            "joinedDate": "09-03-2026"
        }
    ]

    response = client.get(
        "/api/clients/name/alicerow",
    )

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 1
    assert data[0]["clientId"] == 1
    assert data[0]["name"] == "alicerow"
    assert data[0]["advisor_id"] == 1

    mock_get_client_by_name.assert_called_once_with(1)
