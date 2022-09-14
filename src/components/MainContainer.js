import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const[stocks, setStocks] = useState([]);
  const[portfolio, setPortfolio] = useState([]);
  const[sortBy, setSort] = useState("Alphabetically");
  const[filterBy, setFilter] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then(res => res.json())
    .then(setStocks);
  }, []);

  function addStock(stockToAdd){
    const stockInPort = portfolio.find(
      (stock) => stock.id === stockToAdd.id
    );
    if (!stockInPort){
        setPortfolio([...portfolio, stockToAdd]);
      }
    }

  function removeStock(stockToRemove){
    setPortfolio((portfolio) =>
      portfolio.filter((stock) => stock.id !== stockToRemove.id)
      );
  }

  const sortStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filterStocks = sortStocks.filter(
    (stock) => stock.type === filterBy
  );

  return (
    <div>
      <SearchBar 
      sortBy={sortBy}
      changeSort={setSort}
      filterBy={filterBy}
      changeFilter={setFilter}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks ={filterStocks} addStock={addStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer 
            stocks={portfolio}
            removeStock={removeStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
