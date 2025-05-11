import React from "react";
import SearchField from "./SearchField";

function TableData({ data, removeRowFromTable }) {
  const [isSelected, setIsSelected] = React.useState(false);

  const handleSelect = () => {
    if (!isSelected) setIsSelected(!isSelected);
  };

  const handleRemove = () => {
    removeRowFromTable(data);
  };

  return (
    <tr className="rounded-lg border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <td
        id="country-name"
        className={`px-6 py-4 ${isSelected ? "line-through" : ""}`}
      >
        {data.label}
      </td>
      <td className="px-6 py-4 ">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleRemove}
            className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Remove
          </button>
          <button
            type="button"
            onClick={handleSelect}
            className={`mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 
              ${
                isSelected
                  ? "dark:bg-green-900 cursor-not-allowed"
                  : "dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              }
              `}
          >
            Done
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableData;
