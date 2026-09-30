package com.fidelity.leap.sprint6;

public class HoldingRow {
    private Integer clientId;
    private Integer instrumentId;
    private double quantity;
    private String asOfDate;

    public Integer getClientId() {
        return clientId;
    }

    public String getAsOfDate() {
        return asOfDate;
    }

    public void setAsOfDate(String asOfDate) {
        this.asOfDate = asOfDate;
    }

    public Integer getInstrumentId() {
        return instrumentId;
    }

    public void setInstrumentId(Integer instrumentId) {
        this.instrumentId = instrumentId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}
