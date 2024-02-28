import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase().trim());
  };

  const flagStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  };

  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px",
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: "20px", width: "500px" }}
      />
      <div style={gridContainerStyle}>
        {filteredCountries.map((country) => (
          <div key={country.cca3} style={cardStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={flagStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}