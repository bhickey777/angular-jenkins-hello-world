from dataclasses import dataclass
from decimal import Decimal

from datetime import date


from dataclasses import dataclass
from decimal import Decimal

@dataclass
class Trade:
    client_id: int
    instrument_id: int
    ticker: str
    name: str
    trade_type: str
    currency: str
    quantity: Decimal