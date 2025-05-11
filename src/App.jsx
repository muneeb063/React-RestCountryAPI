import React, { useState } from "react";
import SearchField from "./SearchField";
import CountryTableData from "./CountryTableData";

function App() {
  const [tableData, setTableData] = useState([]);

  const addRowToTable = (selectedCountry) => {
    setTableData((prevData) => [...prevData, selectedCountry]);
  };

  const removeRowFromTable = (index) => {
    setTableData((prevData) =>
      prevData.filter((country) => country.value !== index.value)
    );
  };
  return (
    <>
      <SearchField addRowToTable={addRowToTable} />
      <CountryTableData
        tableData={tableData}
        removeRowFromTable={removeRowFromTable}
      />
    </>
  );
}

export default App;
