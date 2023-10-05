import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProductDetails from "./components/ProductDetails";
import axios from "axios";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [productData, setProductData] = useState([]); 

  useEffect(() => {
    if (productData.length ===  0)
      axios
        .get("https://65129b54b8c6ce52b395dff4.mockapi.io/api/v1/product")
        .then((response) => {
          setProductData(response.data); 
          let sumOfViews = 0;
          response.data.forEach((product) => {
            sumOfViews += product.views;
          });
          setTotalViews(sumOfViews);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [productData]);

const handleSearch = (matchingProducts) => {
  setSearchPerformed(true);
  setProduct(matchingProducts);

  onUpdateViews(matchingProducts);
};

const onUpdateViews = (matchingProducts) => {
  matchingProducts.forEach((matchingProduct, index) => {
    setTimeout(() => {
      axios
        .put(
          `https://65129b54b8c6ce52b395dff4.mockapi.io/api/v1/product/${matchingProduct.id}`,
          { views: matchingProduct.views + 1 }
        )
        .then((response) => {
          setProductData((prevData) =>
            prevData.map((product) =>
              product.id === matchingProduct.id ? response.data : product
            )
          );

          setTotalViews((prevTotalViews) => prevTotalViews + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    }, index * 1000);
      
  });
};

  

  return (
    <div className="container bg-success">
      <header className="text-center bg-info">
        <h1>PRODUCT SEARCH</h1>
        <p>
          Name: xyz
          <br />
          Email: xyz@gmail.com
        </p>
      </header>
      <div className="row">
        <div className="col">
          <SearchBar onSearch={handleSearch} productData={productData} />
          {searchPerformed && product.length === 0 ? (
            <div className="alert alert-danger">
              <p>No products found</p>
            </div>
          ) : (
            product.map((item) => (
              <ProductDetails
                key={item.id}
                product={item}
                searchPerformed={searchPerformed}
              />
            ))
          )}
        </div>

        <div className="bg-primary text-white">
          <h4>Total Views</h4>
          <p className="display-4">{totalViews}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
