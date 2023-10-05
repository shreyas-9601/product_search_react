import React, { useState } from "react";

function SearchBar({ onSearch, productData }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const matchingProducts = productData.filter(
      (product) => product.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    onSearch(matchingProducts);
  };

  const suggestions = productData.filter(
    (product) => product.name.toLowerCase().includes(inputValue.toLowerCase())
    )
    .map((product) => (
      <div 
        key={product.id}
        onClick={() => setInputValue(product.name)}
        className="suggestion-item"
      >
        {product.name}
      </div>
    ));

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Product Name"
        value={inputValue}
        onChange={handleInputChange}
      />

      <div className="autocomplete-suggestions">
            {suggestions}
      </div>

      <button 
        type="button" 
        className="btn-dark" 
        onClick={handleSearch}
      >
      Search
      </button>
    </div>
  );
}

export default SearchBar;
