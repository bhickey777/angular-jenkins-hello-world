from dataclasses import dataclass
from datetime import date


@dataclass
class Client:
    client_id: int
    name: str
    email: str
    date_of_birth: date
    risk_profile: str
    advisor_id: int
    joined_date: date