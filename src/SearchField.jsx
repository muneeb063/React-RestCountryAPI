import React from "react";
import { useState, useRef } from "react";
import Select from "react-select";
import TableData from "./TableData";

function SearchField({ addRowToTable }) {
  const API_KEY = "caf19d4f9a4c92aa82c35e03f0f73746";

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // Store selected country

  const timeoutRef = useRef(null);

  const debouncedRequest = (fieldData) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    (timeoutRef.current = setTimeout(() => {
      if (fieldData.trim().length === 0) {
        console.log("Empty input, not sending request");
        return;
      } else {
        // Call your API or other logic here
        console.log("Sending callback with:", fieldData);
        FetchCountries(fieldData);
      }
    }, 1000)),
      [];
  };

  const FetchCountries = async (txt) => {
    // const url = `https://api.countrylayer.com/v2/name/${fieldData}?access_key=${API_KEY}`;
    const url = `https://restcountries.com/v3.1/all`;

    try {
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const result = FilterResponse(data, txt);
          result.forEach((element) => {
            console.log(element.name.common);
            setFilteredCountries(result);
          });
        });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const FilterResponse = (data, inputData) => {
    const filteredData = data.filter((country) => {
      const countryName = country?.name?.common;
      return (
        countryName &&
        countryName.toLowerCase().startsWith(inputData.toLowerCase())
      );
    });
    return filteredData;
  };

  const handleInputChange = (value) => {
    debouncedRequest(value);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedCountry(selectedOption); // Capture selected country
    console.log("Selected Country: ", selectedOption);
  };

  const onSubmit = (e) => {
    if (e) console.log("e is " + e.label);
    addRowToTable(selectedCountry);
    clearSelection(); // Clear selection after submission
  };

  const clearSelection = () => {
    setSelectedCountry(null); // Reset selected country
  };

  const formatCountriesForSelect = (countries) => {
    return countries.map((country) => ({
      value: country.cca3, // unique identifier for the country
      label: country.name.common, // display text for the option
    }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div>
        <Select
          options={formatCountriesForSelect(filteredCountries)}
          placeholder="Select a country"
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          value={selectedCountry}
          isClearable={true}
          autoFocus
        />
      </div>
      <div className="relative mt-4 p-6 ">
        <button
          type="submit"
          onClick={() => onSubmit(selectedCountry)}
          className={`absolute right-2.5 bottom-2.5 px-4 py-2 text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-4
              ${
                !selectedCountry
                  ? "bg-zinc-800 cursor-not-allowed" // If no country is selected, disable button
                  : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
            `}
          disabled={!selectedCountry} // Disable button if no country is selected
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default SearchField;
