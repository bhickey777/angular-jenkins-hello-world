FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run unit tests
RUN python -m pytest -v

EXPOSE 6200

CMD ["python", "app.py"]
