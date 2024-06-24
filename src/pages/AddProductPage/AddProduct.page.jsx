import { useState } from "react";
import Joi from "joi-browser";
// import jwtDecode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";

import addProductValidation from "../../validation/AddProduct.validation";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productCreator, setProductCreator] = useState(
    localStorage.getItem("userEmail")
  );
  const handleProductName = (ev) => {
    setProductName(ev.target.value);
  };
  const handleProductPrice = (ev) => {
    setProductPrice(ev.target.value);
  };
  const handleCategory = (ev) => {
    setCategory(ev.target.value);
  };
  const handleProductCreator = (ev) => {
    setProductCreator(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validatedValue = Joi.validate(
      {
        productName,
        productPrice,
        category,
        productCreator,
      },
      addProductValidation,
      { abortEarly: false }
    );
    const { error } = validatedValue;
    if (error) {
      console.log("errrr", error);
      for (let i = 0; i < error.details.length; i++) {
        toast(error.details[i].message);
      }
    }
    if (validatedValue) {
      axios
        .post(`/products/addProduct`, {
          productName,
          productPrice,
          category,
          productCreator,
        })
        .then(({ data }) => {
          console.log("data from axios", data);
          if (data.status === "Success") {
            toast("New product added successfully");
          }
        })
        .catch((err) => {
          console.log("err from axios", err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h1 className="text-center mt-5">Add product </h1>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">
          Product name
        </label>
        <input
          type="productName"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          // placeholder="email@gmail.com"
          onChange={handleProductName}
          value={productName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">
          Product price
        </label>
        <input
          type="productPrice"
          className="form-control"
          id="productPrice"
          aria-describedby="emailHelp"
          // placeholder="email@gmail.com"
          onChange={handleProductPrice}
          value={productPrice}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="category"
          className="form-control"
          id="category"
          aria-describedby="emailHelp"
          // placeholder="email@gmail.com"
          onChange={handleCategory}
          value={category}
        />
      </div>
      {/* <div className="mb-3">
        <label htmlFor="productCreator" className="form-label">
          Product creator
        </label>
        <input
          type="productCreator"
          className="form-control"
          id="productCreator"
          aria-describedby="emailHelp"
          // placeholder="email@gmail.com"
          onChange={handleProductCreator}
          value={productCreator}
        />
      </div> */}

      <div className="text-center">
        <button className="btn btn-primary text-center m-5">Add product</button>
      </div>
    </form>
    // validatedValue.productName, validatedValue.productPrice,
    // validatedValue.category, validatedValue.productCreator,
  );
};

export default AddProductPage;
