import { Fragment, useEffect, useState } from "react";
import EditProductComponent from "../EditProductComponent/EditProduct.component";

import productCaedCss from "./productCardCss.css";

const ProductCardComponent = (props) => {
  // console.log("props from edite com", props);
  const [productId, setProductId] = useState("");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [productCreartor, setProductCreator] = useState("");

  //   useEffect(() => {
  //     setProductId(props.productId);
  //   }, []);
  useEffect(() => {
    setProductCreator(props.productCreator);
    console.log("product creator from use affect");
  }, [productCreartor]);
  const editBtnClick = () => {
    console.log("edit compppppp props", props);
    setProductCreator(props.productCreator);
    props.handleEdit(
      props.productId,
      props.productName,
      props.productPrice,
      props.category,
      props.productCreator
    );
  };
  const deleteBtnClick = () => {
    props.handleDelete(props.productId, props.productName);
  };
  const addProductToCartClick = () => {
    // props.productId
    props.handleAddToCart(props);
  };
  const removeProductFromCart = () => {
    const stringIdFromStorage = localStorage.getItem("arrOfId");
    let arrOfStringId = [];
    arrOfStringId.push(stringIdFromStorage);
    const splitArrStringId = arrOfStringId[0].split(",");
    let newArrWithoutIdToRemove = [];
    for (let x = 0; x < splitArrStringId.length; x++) {
      if (splitArrStringId[x] != props.productId) {
        // console.log("splitArrStringId", splitArrStringId);
        newArrWithoutIdToRemove.push(splitArrStringId[x]);
        localStorage.setItem("arrOfId", newArrWithoutIdToRemove);
      }
      if (splitArrStringId[x] == props.productId) {
        props.removeFromCart(props.productId, x);
      }
    }
    // props.removeFromCart(props.productId);
  };
  return (
    <div className="container">
      <div className=" cards border border-dark p-5 m-1 ">
        <h1>
          product name: <br /> {props.productName}
        </h1>
        <h2>
          productPrice: <br /> {props.productPrice}
        </h2>
        <h2>
          product category: <br /> {props.category}
        </h2>
        <h2>
          productCreator: <br /> {props.productCreator}
        </h2>
        <h2>
          product id : <br /> {props.productId}
        </h2>
        {/* {window.location.pathname === "/dash" && ( */}
        {window.location.pathname === "/DashBoardPage" &&
          productCreartor === userEmail && (
            // props.productCreator === userEmail && (
            <Fragment>
              {" "}
              <button onClick={editBtnClick} className="btn btn-warning">
                Edit Product
              </button>
              <button onClick={deleteBtnClick} className="btn btn-danger">
                Delete Product{" "}
              </button>
            </Fragment>
          )}
        {window.location.pathname === "/" && (
          <Fragment>
            {" "}
            <button onClick={addProductToCartClick} className="btn btn-warning">
              add to cart
            </button>
          </Fragment>
        )}

        {window.location.pathname === "/CartPage" && (
          <Fragment>
            {" "}
            <button onClick={removeProductFromCart} className="btn btn-warning">
              {/* <button onClick={addProductToCartClick} className="btn btn-warning"> */}
              Remove
            </button>
          </Fragment>
        )}
        <hr />

        {/* <button onClick={editBtnClick} className="btn btn-warning">
        Edit Product
      </button>
      <button onClick={deleteBtnClick} className="btn btn-danger">
        
        Delete Product{" "}
      </button>
      <hr /> */}
      </div>
    </div>
  );
};
export default ProductCardComponent;
