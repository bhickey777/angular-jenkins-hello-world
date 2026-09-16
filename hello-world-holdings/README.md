To do a local run first set the environment variables accordingly. See set-evn.sh
. ./set-env.sh

To test the health of the application:
curl --fail http://localhost:6200/health

To test using a specific client:
curl --fail http://localhost:6200/api/clients/1/holdings

To run the unit tests
python3 -m pytest -v

To run the application: 
python3 app.py