-- PaySprint Wealth Platform — Enterprise Schema
-- Pre-loaded, read-heavy schema used for exploration and query practice
-- across Modules 02-05 (and referenced again in Module 10).
-- Domain: a wealth management platform. Advisors manage clients; clients
-- hold one or more accounts; accounts hold instruments via transactions
-- and current holdings.

DROP INDEX IF EXISTS idx_clients_advisor_id;
DROP INDEX IF EXISTS idx_client_trades_client_id;
DROP INDEX IF EXISTS idx_client_trades_instrument_id;
DROP INDEX IF EXISTS idx_mph_instrument_id;
DROP INDEX IF EXISTS idx_cs_model_portfolio_id;
DROP INDEX IF EXISTS idx_mph_model_portfolio_id;
DROP INDEX IF EXISTS idx_model_portfolio_holdings_instrument_id;
DROP INDEX IF EXISTS idx_model_portfolio_holdings_model_portfolio_id;
DROP INDEX IF EXISTS idx_ch_instrument_id;
DROP INDEX IF EXISTS idx_transactions_account_id;
DROP INDEX IF EXISTS idx_transactions_instrument_id;
DROP INDEX IF EXISTS idx_ch_client_asof;

DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS model_portfolios CASCADE;
DROP TABLE IF EXISTS model_portfolio_holdings CASCADE;
DROP TABLE IF EXISTS client_subscriptions CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS client_holdings CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS client_trades CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS advisors CASCADE;
DROP TABLE IF EXISTS instruments CASCADE;

CREATE TABLE advisors (
    advisor_id   SERIAL PRIMARY KEY,
    name         TEXT NOT NULL,
    region       TEXT NOT NULL,
    hired_date   DATE NOT NULL
);

CREATE TABLE employees (
    employee_id      SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    date_of_birth   DATE NOT NULL,
    dept            TEXT NOT NULL ,
    roles           TEXT NOT NULL,
    clientContact   BOOLEAN NOT NULL DEFAULT FALSE,  
    email           TEXT NOT NULL,
    joined_date     DATE NOT NULL
);

CREATE TABLE clients (
    client_id      SERIAL PRIMARY KEY,
    name           TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE,
    date_of_birth  DATE NOT NULL,
    risk_profile   TEXT NOT NULL CHECK (risk_profile IN ('Cautious', 'Balanced', 'Adventurous')),
    advisor_id     INTEGER NOT NULL REFERENCES advisors(advisor_id),
    joined_date    DATE NOT NULL
);
CREATE INDEX idx_clients_advisor_id ON clients(advisor_id);

CREATE TABLE model_portfolios (
    model_portfolio_id  SERIAL PRIMARY KEY,
    name                TEXT NOT NULL UNIQUE
);

CREATE TABLE instruments (
    instrument_id  SERIAL PRIMARY KEY,
    ticker         TEXT NOT NULL UNIQUE,
    name           TEXT NOT NULL,
    asset_class    TEXT NOT NULL CHECK (asset_class IN ('Equity', 'Bond', 'Fund', 'Cash')),
    currency       TEXT NOT NULL
);

CREATE TABLE accounts (
    account_id    SERIAL PRIMARY KEY,
    client_id     INTEGER NOT NULL REFERENCES clients(client_id),
    account_type  TEXT NOT NULL CHECK (account_type IN ('ISA', 'GIA', 'SIPP')),
    opened_date   DATE NOT NULL,
    currency      TEXT NOT NULL
);

CREATE TABLE client_holdings (
    client_id      INTEGER NOT NULL REFERENCES clients(client_id),
    instrument_id  INTEGER NOT NULL REFERENCES instruments(instrument_id),
    quantity       NUMERIC(14,4) NOT NULL CHECK (quantity >= 0),
    as_of_date     DATE NOT NULL,
    PRIMARY KEY (client_id, instrument_id, as_of_date)
);

CREATE TABLE client_trades (
    trade_id       SERIAL PRIMARY KEY,
    client_id      INTEGER NOT NULL REFERENCES clients(client_id),
    instrument_id  INTEGER NOT NULL REFERENCES instruments(instrument_id),
    trade_type     TEXT NOT NULL CHECK (trade_type IN ('BUY', 'SELL')),
    quantity       NUMERIC(14,4) NOT NULL CHECK (quantity > 0),
    price          NUMERIC(14,4) NOT NULL CHECK (price > 0),
    trade_date     DATE NOT NULL
);
CREATE INDEX idx_client_trades_client_id ON client_trades(client_id);
CREATE INDEX idx_client_trades_instrument_id ON client_trades(instrument_id);

CREATE TABLE transactions (
    transaction_id  SERIAL PRIMARY KEY,
    trade_id        INTEGER REFERENCES client_trades(trade_id),
    account_id      INTEGER NOT NULL REFERENCES accounts(account_id),
    instrument_id   INTEGER REFERENCES instruments(instrument_id),
    txn_type        TEXT NOT NULL CHECK (txn_type IN ('BUY', 'SELL', 'DIVIDEND', 'DEPOSIT', 'WITHDRAWAL')),
    quantity        NUMERIC(14,4),
    price           NUMERIC(14,4),
    txn_date        DATE NOT NULL
);

-- Sample trade history, consistent with Module 13's client_holdings rows.
-- Alice Johnson (client_id 1) holds 1200 units of GLBEQ1 (instrument_id 7) and
-- 600 of CORPB1 (instrument_id 6) as of 2026-06-30. Her trade history below
-- nets to exactly those quantities.

CREATE TABLE model_portfolio_holdings (
    model_portfolio_id  INTEGER NOT NULL REFERENCES model_portfolios(model_portfolio_id),
    instrument_id       INTEGER NOT NULL REFERENCES instruments(instrument_id),
    target_weight_pct   NUMERIC(5,2) NOT NULL CHECK (target_weight_pct BETWEEN 0 AND 100),
    as_of_date          DATE NOT NULL,
    PRIMARY KEY (model_portfolio_id, instrument_id)
);
CREATE INDEX idx_mph_instrument_id ON model_portfolio_holdings(instrument_id);

CREATE TABLE client_subscriptions (
    client_id           INTEGER NOT NULL REFERENCES clients(client_id),
    model_portfolio_id  INTEGER NOT NULL REFERENCES model_portfolios(model_portfolio_id),
    subscribed_date      DATE NOT NULL,
    PRIMARY KEY (client_id, model_portfolio_id, subscribed_date)
);

CREATE INDEX idx_cs_model_portfolio_id ON client_subscriptions(model_portfolio_id);
CREATE INDEX idx_ch_instrument_id ON client_holdings(instrument_id);
CREATE INDEX idx_ch_client_asof ON client_holdings(client_id, as_of_date DESC);

-- Seed data ------------------------------------------------------------
INSERT INTO model_portfolios (name) VALUES
    ('Conservative'),
    ('Balanced'),
    ('Growth'),
    ('Aggressive');


INSERT INTO advisors (name, region, hired_date) VALUES
    ('Priya Shah',       'London',     '2016-03-01'),
    ('Daniel Osei',      'Manchester', '2018-07-15'),
    ('Wei Zhang',        'Edinburgh',  '2015-01-20'),
    ('Fatima Al-Rashid', 'London',     '2020-09-10');

INSERT INTO instruments (ticker, name, asset_class, currency) VALUES
    ('VOD.L',  'Vodafone Group PLC',        'Equity', 'GBP'),
    ('BARC.L', 'Barclays PLC',              'Equity', 'GBP'),
    ('ULVR.L', 'Unilever PLC',              'Equity', 'GBP'),
    ('AAPL',   'Apple Inc',                 'Equity', 'USD'),
    ('GILT10', 'UK 10-Year Gilt',           'Bond',   'GBP'),
    ('CORPB1', 'Sterling Corporate Bond Fund', 'Fund', 'GBP'),
    ('GLBEQ1', 'Global Equity Index Fund',  'Fund',   'GBP'),
    ('CASHGBP','Cash (GBP)',                'Cash',   'GBP');

INSERT INTO clients (name, email, date_of_birth, risk_profile, advisor_id, joined_date) VALUES
    ('Alice Johnson',   'alice.johnson@example.com', '1978-04-12', 'Balanced',    1, '2019-02-01'),
    ('Brian Osei',      'brian.osei@example.com', '1985-11-03', 'Adventurous', 2, '2020-06-15'),
    ('Carla Mendes',    'carla.mendes@example.com', '1962-08-22', 'Cautious',    1, '2017-11-01'),
    ('David Kim',       'david.kim@example.com', '1990-01-30', 'Adventurous', 3, '2021-03-10'),
    ('Elena Petrova',   'elena.petrova@example.com', '1971-06-18', 'Balanced',    2, '2018-09-05'),
    ('Farid Hossain',   'farid.hossain@example.com', '1988-12-09', 'Balanced',    4, '2022-01-20'),
    ('Grace Lin',       'grace.lin@example.com', '1995-05-25', 'Adventurous', 3, '2023-04-01'),
    ('Harold Baxter',   'harold.baxter@example.com', '1955-02-14', 'Cautious',    1, '2015-07-01'),
    ('Isabel Marin',    'isabel.marin@example.com', '1980-09-09', 'Balanced',    4, '2019-10-12'),
    ('Jack Whitfield',  'jack.whitfield@example.com', '1968-03-03', 'Cautious',    2, '2016-05-20'),
    ('Nadia Farouk',     'nadia.farouk@example.com', '1993-07-19', 'Balanced',    3, '2026-06-01');

    -- Nadia is a newly onboarded prospective client: assigned an advisor, but
    -- hasn't opened an account yet. Deliberately included so LEFT JOIN /
    -- RIGHT JOIN produce NULLs for account columns, not just INNER JOIN
    -- results that happen to look the same as an inner join.

INSERT INTO accounts (client_id, account_type, opened_date, currency) VALUES
    (1, 'ISA',  '2019-02-01', 'GBP'),
    (1, 'GIA',  '2021-05-01', 'GBP'),
    (2, 'ISA',  '2020-06-15', 'GBP'),
    (3, 'SIPP', '2017-11-01', 'GBP'),
    (4, 'ISA',  '2021-03-10', 'GBP'),
    (4, 'GIA',  '2022-08-01', 'GBP'),
    (5, 'SIPP', '2018-09-05', 'GBP'),
    (6, 'ISA',  '2022-01-20', 'GBP'),
    (7, 'ISA',  '2023-04-01', 'GBP'),
    (8, 'SIPP', '2015-07-01', 'GBP'),
    (9, 'GIA',  '2019-10-12', 'GBP'),
    (10,'ISA',  '2016-05-20', 'GBP');

INSERT INTO client_holdings (client_id, instrument_id, quantity, as_of_date) VALUES
    (1, 3, 500,  '2026-06-30'), (1, 7, 1200, '2026-06-30'),
    (2, 4, 30,   '2026-06-30'),
    (3, 4, 15,   '2026-06-30'), (3, 8, 2000, '2026-06-30'),
    (4, 5, 5000, '2026-06-30'), (4, 6, 800,  '2026-06-30'),
    (5, 4, 60,   '2026-06-30'), (5, 1, 2000, '2026-06-30'),
    (6, 7, 3000, '2026-06-30'),
    (7, 5, 3000, '2026-06-30'), (7, 8, 1500, '2026-06-30'),
    (8, 4, 40,   '2026-06-30'), (8, 7, 900,  '2026-06-30'),
    (9, 5, 1000, '2026-06-30'),
    (10, 6, 1200, '2026-06-30'),
    (11, 2, 800,  '2026-06-30'), (11, 3, 600, '2026-06-30');

INSERT INTO model_portfolio_holdings (model_portfolio_id, instrument_id, target_weight_pct, as_of_date) VALUES
    (1, 3, 50,  '2026-06-30'), 
    (1, 7, 12, '2026-06-30'),
    (2, 4, 30,   '2026-06-30'),
    (3, 4, 15,   '2026-06-30'), 
    (3, 8, 20, '2026-06-30'),
    (4, 5, 50, '2026-06-30'), 
    (4, 6, 80,  '2026-06-30');

INSERT INTO client_subscriptions (client_id, model_portfolio_id, subscribed_date) VALUES
    (1, 1, '2026-01-01'),
    (2, 2, '2026-02-01'),
    (3, 3, '2026-03-01'),
    (4, 4, '2026-04-01');

INSERT INTO client_trades (client_id, instrument_id, trade_type, quantity, price, trade_date) VALUES
    (1, 7, 'BUY', 1000, 3.80, '2023-01-20'),
    (1, 7, 'BUY', 300,  4.05, '2024-03-15'),
    (1, 7, 'SELL', 100, 4.30, '2025-11-01'),   
    (1, 6, 'BUY', 600,  4.90, '2023-02-01'),

    (3, 6, 'BUY', 2500, 4.80, '2022-12-01'),
    (3, 6, 'BUY', 500,  5.10, '2024-06-01'),   
    (3, 5, 'BUY', 1200, 0.97, '2022-12-01'),   

    (4, 7, 'BUY', 4000, 3.70, '2023-06-15'),
    (4, 7, 'BUY', 1000, 4.20, '2024-09-01'),   
    (4, 5, 'BUY', 500,  0.98, '2023-06-15'),
    (4, 5, 'SELL', 200, 1.05, '2025-04-01');

INSERT INTO client_trades (client_id, instrument_id, trade_type, quantity, price, trade_date) VALUES
    (1, 7, 'BUY', 1000, 3.80, '2023-01-20'),
    (1, 7, 'BUY', 300,  4.05, '2024-03-15'),
    (1, 7, 'SELL', 100, 4.30, '2025-11-01'),   
    (1, 6, 'BUY', 600,  4.90, '2023-02-01'),   

    (3, 6, 'BUY', 2500, 4.80, '2022-12-01'),
    (3, 6, 'BUY', 500,  5.10, '2024-06-01'),   
    (3, 5, 'BUY', 1200, 0.97, '2022-12-01'),   

    (4, 7, 'BUY', 4000, 3.70, '2023-06-15'),
    (4, 7, 'BUY', 1000, 4.20, '2024-09-01'),   
    (4, 5, 'BUY', 500,  0.98, '2023-06-15'),
    (4, 5, 'SELL', 200, 1.05, '2025-04-01');   

INSERT INTO transactions (account_id, trade_id, instrument_id, txn_type, quantity, price, txn_date) VALUES
    (1, 1, 3, 'BUY',      500,  38.20, '2025-01-15'),
    (1, 2, 7, 'BUY',      1200, 4.10,  '2025-02-01'),
    (1, 3, 7, 'DIVIDEND', NULL, 45.00, '2025-08-01'),
    (2, 4, 4, 'BUY',      30,   165.50,'2025-03-10'),
    (3, 1, 4, 'BUY',      15,   150.00,'2020-01-05'),
    (3, 2, 8, 'DEPOSIT',  NULL, 2000.00,'2020-01-05'),
    (4, 3, 5, 'BUY',      5000, 0.98,  '2021-04-01'),
    (4, 4, 6, 'BUY',      800,  5.25,  '2021-06-15'),
    (5, 1, 3, 'BUY',      60,   140.00,'2019-01-10'),
    (5, 2, 1, 'BUY',      2000, 1.15,  '2019-02-20'),
    (5, 3, 1, 'DIVIDEND', NULL, 60.00, '2025-05-01'),
    (6, 4, 7, 'BUY',      3000, 3.80,  '2022-02-01'),
    (7, 1, 5, 'BUY',      3000, 0.97,  '2023-05-01'),
    (7, 2, 8, 'DEPOSIT',  NULL, 1500.00,'2023-05-01'),
    (8, 4, 4, 'BUY',      40,   130.00,'2015-08-01'),
    (8, 1, 7, 'BUY',      900,  3.50,  '2016-01-15'),
    (8, 2, 7, 'DIVIDEND', NULL, 30.00, '2025-08-01'),
    (9, 3, 5, 'BUY',      1000, 0.99,  '2020-01-10'),
    (10, 4, 6, 'BUY',      1200, 5.00,  '2022-02-15'),
    (11, 1, 2, 'BUY',      800,  1.80,  '2020-01-15'),
    (11, 2, 3, 'BUY',      600,  36.00, '2020-03-01'),
    (12, 3, 5, 'BUY',      6000, 0.96,  '2016-06-01'),
    (12, 4, 8, 'DEPOSIT',  NULL, 500.00, '2016-06-01'),
    (1, 1, 3, 'SELL',     100,  40.50, '2026-01-10'),
    (4, 2, 6, 'SELL',     200,  5.60,  '2025-11-01'),
    (7, 3, 5, 'SELL',     500,  1.02,  '2025-09-01'),
    (11, 4, 3, 'SELL',     100,  37.20, '2025-10-05'),
    (2, 1, 4, 'DIVIDEND', NULL, 12.00, '2025-06-01'),
    (5, 2, 4, 'SELL',     10,   170.00,'2026-02-01'),
    (12, 3, 5, 'DIVIDEND', NULL, 90.00, '2025-08-01');

INSERT INTO employees (name, date_of_birth, dept, roles, clientContact, email, joined_date) VALUES
    ('John Doe', '1980-05-15', 'Finance', 'Manager', TRUE, 'johndoe@gmail.com', '2020-01-01'),
    ('Jane Smith', '1990-07-20', 'IT', 'Developer', FALSE, 'janesmith@gmail.com', '2021-03-15'),
    ('Alice Johnson', '1985-09-10', 'HR', 'Recruiter', FALSE, 'alicejohnson@gmail.com', '2019-06-01'),
    ('Bob Brown', '1975-12-25', 'Marketing', 'Analyst', TRUE, 'bobbrown@gmail.com', '2018-11-20');
