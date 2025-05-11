import React from "react";
import TableData from "./TableData";

function CountryTableData({ tableData, removeRowFromTable }) {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th colSpan={3} className="px-4 py-4">
                Country name
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((country, index) => (
              <TableData
                key={index}
                data={country}
                removeRowFromTable={removeRowFromTable}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryTableData;
