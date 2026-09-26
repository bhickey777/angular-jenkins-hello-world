from database import get_connection
from models.trade import Trade


class TradeRepository:

    def find_by_client_id(self, client_id):

        sql = """
            SELECT
                ct.client_id,
                ct.instrument_id,
                i.ticker,
                i.name,
                ct.trade_type,
                i.currency,
                ct.quantity
            FROM client_trades ct
            JOIN instruments i
                ON ct.instrument_id = i.instrument_id
            WHERE ct.client_id = %s
            ORDER BY ct.trade_date DESC;
        """

        with get_connection() as connection:
            with connection.cursor() as cursor:

                cursor.execute(
                    sql,
                    (client_id,)
                )

                rows = cursor.fetchall()

        return [
            Trade(
                client_id=row[0],
                instrument_id=row[1],
                ticker=row[2],
                name=row[3],
                trade_type=row[4],
                currency=row[5],
                quantity=row[6]
            )
            for row in rows
        ]