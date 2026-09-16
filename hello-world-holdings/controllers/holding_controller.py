from flask import Blueprint, jsonify
from services.holding_service import HoldingService

holding_controller = Blueprint(
    "holding_controller",
    __name__
)

holding_service = HoldingService()


@holding_controller.route(
    "/api/clients/<int:client_id>/holdings",
    methods=["GET"]
)
def get_holdings(client_id):

    holdings = holding_service.get_holdings(
        client_id
    )

    return jsonify(holdings), 200