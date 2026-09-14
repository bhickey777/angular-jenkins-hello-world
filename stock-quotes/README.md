//To run locally in DEV 

TWELVE_DATA_API_KEY="a twelve-data-api-key" python3 stock-quotes.py

EX: TWELVE_DATA_API_KEY="2d4be6dbc80b4c8298f7d0297b8c04cd" python3 stock-quotes.py

//To test in a browser
http://localhost:8000/api/market/quotes

//EX: With APPL
http://localhost:8000/api/market/quotes?symbols=AAPL