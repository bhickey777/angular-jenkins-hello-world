package com.fidelity.leap.sprint6;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

// Module 7's two mapper styles, both in play: the joins below live in
// AccountMapper.xml (findInstrument, findHolding); the simple single-table
// writes are annotation-based, right here.
public interface AccountMapper {

    InstrumentRow findInstrument(@Param("ticker") String ticker);

    HoldingRow findHolding(@Param("clientId") int clientId, @Param("instrumentId") int instrumentId, @Param("ticker") String ticker);

    @Update("UPDATE client_holdings SET quantity = #{quantity}, as_of_date = CURRENT_DATE " +
            "WHERE client_id = #{clientId} AND instrument_id = #{instrumentId}")
    void updateHoldingQuantity(@Param("clientId") int clientId, @Param("instrumentId") int instrumentId, @Param("quantity") double quantity);

    @Insert("INSERT INTO client_holdings (client_id, instrument_id, quantity, as_of_date) " +
            "VALUES (#{clientId}, #{instrumentId}, #{quantity}, CURRENT_DATE)")
    void insertHolding(@Param("clientId") int clientId, @Param("instrumentId") int instrumentId,
                        @Param("quantity") double quantity);
}
