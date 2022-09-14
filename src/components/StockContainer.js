import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, addStock}) {

  const stockList = stocks.map((stock) => (
    <Stock
      key={stock.id}
      stock={stock}
      stockClick = {addStock}
    />
  ));
  
  return (
    <div>
      <h2>Stocks</h2>
      {stockList}
    </div>
  );
}

export default StockContainer;
