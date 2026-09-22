import pytest
from unittest.mock import patch, MagicMock
from flask import Flask

from controllers.report_controller import report_controller


@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(report_controller)
    app.config["TESTING"] = True
    return app


@pytest.fixture
def client(app):
    return app.test_client()

@patch("controllers.report_controller.plot_asset_class_totals")
def test_post_asset_class_totals(mock_plot, client):
    report = MagicMock()
    report.report_id = "12345"
    mock_plot.return_value = report

    response = client.post("/api/reports/assetClassTotals")

    assert response.status_code == 201

    data = response.get_json()

    assert data["reportId"] == "12345"
    assert data["reportType"] == "assetClassTotals"

    mock_plot.assert_called_once()
    
@patch("controllers.report_controller.plot_weekly_trend")
def test_post_weekly_trend(mock_plot, client):
    report = MagicMock()
    report.report_id = "67890"
    mock_plot.return_value = report

    response = client.post("/api/reports/weeklyTrends")

    assert response.status_code == 201

    data = response.get_json()

    assert data["reportId"] == "67890"
    assert data["reportType"] == "weekly_trend"

    mock_plot.assert_called_once()

@patch("controllers.report_controller.os.path.exists")
def test_get_asset_class_totals_not_found(mock_exists, client):
    mock_exists.return_value = False

    response = client.get("/api/reports/assetClassTotals")

    assert response.status_code == 404

    data = response.get_json()

    assert data["message"] == "Report not found" 
