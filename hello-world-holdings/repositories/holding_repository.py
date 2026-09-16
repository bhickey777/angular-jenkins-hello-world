from database import get_connection

class HoldingRepository:

    def find_by_client_id(self, client_id):

        sql = """
            SELECT
                t.client_id,
                i.instrument_id,
                i.ticker,
                i.name,
                i.asset_class,
                i.currency,
                SUM(
                    CASE
                        WHEN t.trade_type = 'BUY'
                            THEN t.quantity
                        WHEN t.trade_type = 'SELL'
                            THEN -t.quantity
                        ELSE 0
                    END
                ) AS quantity
            FROM client_trades t
            JOIN instruments i
                ON t.instrument_id = i.instrument_id
            WHERE t.client_id = %s
            GROUP BY
                t.client_id,
                i.instrument_id,
                i.ticker,
                i.name,
                i.asset_class,
                i.currency
            HAVING SUM(
                CASE
                    WHEN t.trade_type = 'BUY'
                        THEN t.quantity
                    WHEN t.trade_type = 'SELL'
                        THEN -t.quantity
                    ELSE 0
                END
            ) > 0
            ORDER BY i.ticker
        """

        with get_connection() as connection:

            with connection.cursor() as cursor:

                cursor.execute(
                    sql,
                    (client_id,)
                )

                return cursor.fetchall()