import os
import time
import requests

# Uses TWELVE DATA API for stock quotes 

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(
    app,
    origins=["http://localhost:4200"]
)

CACHE_SECONDS = 60

cache = {
    "timestamp": 0,
    "quotes": []
}

def load_api_key():
    with open("api-key.txt", "r") as file:
        return file.read().strip()

TWELVE_DATA_API_KEY = load_api_key()

@app.route("/api/market/quotes")
def get_quotes():

    current_time = time.time()

    # Return cached values if still fresh
    if (
        cache["quotes"]
        and current_time - cache["timestamp"] < CACHE_SECONDS
    ):
        return jsonify(cache["quotes"])

    symbols = request.args.get(
        "symbols",
        "AAPL,MSFT,NVDA"
    )

    symbol_list = [
        symbol.strip().upper()
        for symbol in symbols.split(",")
    ]

    quotes = []

    for symbol in symbol_list:

        response = requests.get(
            "https://api.twelvedata.com/quote",
            params={
                "symbol": symbol,
                "apikey": TWELVE_DATA_API_KEY
            },
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        # Twelve Data may return API-level errors
        # inside a successful HTTP response.
        if data.get("status") == "error":

            print(
                f"Error retrieving {symbol}: "
                f"{data.get('message')}"
            )

            continue

        price = float(
            data.get("close", 0)
        )

        change_percent = float(
            data.get("percent_change", 0)
        )

        quotes.append({
            "symbol": data.get(
                "symbol",
                symbol
            ),
            "name": data.get(
                "name",
                symbol
            ),
            "price": price,
            "changePercent": change_percent
        })

    cache["quotes"] = quotes
    cache["timestamp"] = current_time

    return jsonify(quotes)


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )