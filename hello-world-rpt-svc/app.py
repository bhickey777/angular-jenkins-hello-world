from flask import Flask
from flask_cors import CORS

from controllers.client_controller import ( client_controller )
from controllers.report_controller import ( report_controller )

app = Flask(__name__)

CORS(
    app,
    origins=["http://localhost:4200", "http://localhost:5200"]
)

app.register_blueprint(client_controller);
app.register_blueprint(report_controller);

@app.route("/health")
def health():

    return {
        "status": "UP",
        "service": "hello-world-rpt-svc"
    }, 200


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=7200,
        debug=False
    )