To do a local run first set the environment variables accordingly. See set-evn.sh
. ./set-env.sh

To test the health of the application:
curl --fail http://localhost:7200/health

To test using a specific client holdings:
curl --fail http://localhost:7200/api/clients/1/holdings

To retrieve a specific client's info:
curl --fail http://localhost:7200/api/clients/1

To run the unit tests
python3 -m pytest -v

To post for an asset class totals report: 
curl -X POST http://localhost:7200/api/reports/assetClassTotals

To post for a weekly trend report: 
curl -X POST http://localhost:7200/api/reports/weeklyTrends

To retrieve asset clas report and save to a file:
curl --fail \
  http://localhost:7200/api/reports/assetClassTotals \
  --output asset_class_totals.png

To retrieve weekly trend report and save to a file:
curl --fail \
  http://localhost:7200/api/reports/weeklyTrends \
  --output weekly_trend.png

To run the application: 
python3 app.py

For Python Code Coverage: 
coverage run -m pytest
coverage report -m

