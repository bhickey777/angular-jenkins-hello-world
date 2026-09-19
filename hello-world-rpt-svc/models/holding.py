from dataclasses import dataclass
from decimal import Decimal

from datetime import date


from dataclasses import dataclass
from decimal import Decimal

@dataclass
class Holding:
    client_id: int
    instrument_id: int
    ticker: str
    name: str
    asset_class: str
    currency: str
    quantity: Decimal