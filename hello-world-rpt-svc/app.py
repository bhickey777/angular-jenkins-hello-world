from flask import Flask
from flask_cors import CORS

from controllers.holding_controller import ( holding_controller )
from controllers.client_controller import ( client_controller )

app = Flask(__name__)

CORS(
    app,
    origins=["http://localhost:4200"]
)

app.register_blueprint(holding_controller);
app.register_blueprint(client_controller);

@app.route("/health")
def health():

    return {
        "status": "UP",
        "service": "holdings-service"
    }, 200


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=6200,
        debug=False
    )