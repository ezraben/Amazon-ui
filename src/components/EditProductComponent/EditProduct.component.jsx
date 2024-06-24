import axios from "axios";
import Joi from "joi-browser";
import toast from "react-hot-toast";
import { useState } from "react";

import productValidation from "../../validation/AddProduct.validation";
import editCopCss from "./editCompCss.css";
const EditProductComponent = (props) => {
  const [productId, setProductId] = useState(props.pId);
  const [productName, setProductName] = useState(props.pName);
  const [productPrice, setProductPrice] = useState(props.pPrice);
  const [category, setCategory] = useState(props.pCategory);
  const [productCreator, setProductCreator] = useState(
    localStorage.getItem("userEmail")
  );
  // const [productCreator, setProductCreator] = useState(props.pCreator);

  // console.log("loca storage", localStorage.getItem("userEmail"));
  // const [productCreator, setProductCreator] = useState("");

  //   const handleProductId = (ev) => {
  //     setProductId(props.pId);
  //   };

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
  const closeEditCompClick = () => {
    props.hideEditComp();
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
      productValidation,
      { abortEarly: false }
    );
    const { error } = validatedValue;
    if (error) {
      console.log("errrr", error);
      for (let i = 0; i < error.details.length; i++) {
        toast(error.details[i].message);
      }
    }
    console.log("vakidauata", validatedValue);
    if (validatedValue) {
      console.log("after validation");
      axios
        .patch(
          `/products/editProduct?productName=${productName}&productPrice=${productPrice}&category=${category}&productCreator=${productCreator}&id=${productId}`
        )
        .then(({ data }) => {
          console.log("data from axios", data);
          if (data.status === "Success") {
            toast("Product edited successfully");
            props.getAllProducts();
            props.hideEditComp();
          }
        })
        .catch((err) => {
          console.log("err from axios", err);
        });
    }
  };
  return (
    <div className="popUp">
      <h1>EditProductComponent</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <h1 className="text-center mt-5">Edit product </h1>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product name
          </label>
          <input
            type="productName"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
            onChange={handleProductCreator}
            value={localStorage.getItem("userEmail")}
          />
        </div> */}

        <div className="text-center">
          <button className="btn btn-primary text-center m-5">
            Add product
          </button>
        </div>
      </form>
      <div>
        <button className="btn btn-success">confirm</button>
        <button className=" btn btn-danger " onClick={closeEditCompClick}>
          cancel
        </button>
      </div>
      {/* <h1>EditProductComponent</h1>;
      <form>
        <h1>product name: {props.pName}</h1>
        <h1>product price: {props.pPrice}</h1>
        <h1>product name: {props.pCategory}</h1>
      </form>
      <div>
        <button className="btn btn-success">confirm</button>
        <button className=" btn btn-danger " onClick={closeEditCompClick}>
          cancel
        </button>
      </div> */}
    </div>
  );
};

export default EditProductComponent;
