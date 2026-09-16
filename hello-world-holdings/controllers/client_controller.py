from flask import Blueprint, jsonify

from services.client_service import ClientService


client_controller = Blueprint(
    "client_controller",
    __name__
)

client_service = ClientService()


@client_controller.route(
    "/api/clients/<int:client_id>",
    methods=["GET"]
)
def get_client(client_id):

    client = client_service.get_client(
        client_id
    )

    if client is None:
        return jsonify({
            "message": "Client not found"
        }), 404

    return jsonify(client), 200