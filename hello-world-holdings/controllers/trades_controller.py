from flask import Blueprint, jsonify
from services.trade_service import TradeService

trades_controller = Blueprint(
    "trades_controller",
    __name__
)

trade_service = TradeService()


@trades_controller.route(
    "/api/clients/<int:client_id>/trades",
    methods=["GET"]
)
def get_trades(client_id):

    trades = trade_service.get_trades(
        client_id
    )

    return jsonify(trades), 200