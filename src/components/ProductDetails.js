import React, { useState } from "react";

function ProductDetails({ product, searchPerformed }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!searchPerformed) {
    return null;
  }

  if (!product) {
    return (
      <div className="alert alert-danger">
        <p>No product found</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Product Details</h2>
      <table className="table table-bordered bg-info">
          <tbody>
            <tr>
              <th>ID:</th>
              <td>{product.id}</td>
            </tr>
            <tr>
              <th>Name:</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{product.desc}</td>
            </tr>
            <tr>
              <th>Price:</th>
              <td>{product.price}</td>
            </tr>
            <tr>
              <th>Views:</th>
              <td>{product.views}</td>
            </tr>
          </tbody>
        </table>
      <button
        className="btn-secondary"
        onClick={() => {
          toggleModal();
        }}
      >
        View Product
      </button>

      <div
        className={`modal${showModal ? " show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Product Details</h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <table className="table table-bordered bg-info">
                  <tbody>
                    <tr>
                      <th>ID:</th>
                      <td>{product.id}</td>
                    </tr>
                    <tr>
                      <th>Name:</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th>Price:</th>
                      <td>{product.price}</td>
                    </tr>
                  </tbody>
                </table>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "100%", height: "auto" }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;