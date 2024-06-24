import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCard.component";
import { Link } from "react-router-dom";

import homePageCss from "./homePageCss.css";
import { log } from "joi-browser";
import { filter, sortBy } from "lodash";
import toast from "react-hot-toast";
import { cheangeSearchBarToActive } from "../../store/handleSerachBar";

const HomePage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  //   const [productCreator, setProductCreator] = useState("");
  const [id, setId] = useState("");
  const [allProductsArr, setAllProductsArr] = useState([]);

  const [idsArr, setIdsArr] = useState([]);
  const [sercRs, setSerachRs] = useState(false);
  const [isIdCrted] = useState();

  const isSearchActive = useSelector(
    (state) => state.searchBar.searchBarActive
  );
  console.log("isSearchActive, isSearchActive, isSearchActive", isSearchActive);
  useEffect(() => {
    getAllProducts();
  }, []);
  // useEffect(() => {
  //   console.log("isSearchActive form use effect", isSearchActive);
  // }, [isSearchActive]);

  const getAllProducts = () => {
    axios
      .get(`/products/getAllProducts`)
      .then((data) => {
        console.log("data", data);
        setAllProductsArr(data.data);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  };

  const addProductToCart = (props) => {
    if (idsArr.length === 0) {
      let dataFromStorage = [];
      let dataFromStorageSplit;
      dataFromStorage.push(localStorage.getItem("arrOfId"));
      if (dataFromStorage[0] != null) {
        dataFromStorageSplit = dataFromStorage[0].split(",");
        // console.log("dataFromStorageSplit", dataFromStorageSplit);

        for (let l = 0; l < dataFromStorageSplit.length; l++) {
          // console.log("dataFromStorageSplit", dataFromStorageSplit);
          let parsedData = parseInt(dataFromStorageSplit[l]);

          idsArr.push(parsedData);
        }
      }
    }

    if (idsArr.length === 0) {
      idsArr.push(props.productId);
      toast("your first product is in the cart");
      // console.log("ids arrrrrrrrrrrrrrrrrrrrrrrr", idsArr);
    } else {
      let arrTestId = [];
      for (let i = 0; i < idsArr.length; i++) {
        // console.log("id arr [i]", idsArr[i]);
        console.log("idsArr", idsArr);
        if (idsArr[i] === props.productId) {
          console.log("same id", [idsArr[i]]);
          arrTestId.push("same id");
          toast("product already in your cart!");
          break;
        }
        if (idsArr[i] !== props.productId) {
          arrTestId.push(props.productId);
        }
      }

      if (arrTestId.pop() !== "same id") {
        idsArr.push(props.productId);
        toast("woop woop added to cart!!");
      }
      // console.log("arrTestId", arrTestId);
      // console.log("idsArr", idsArr);
    }
    localStorage.setItem("arrOfId", idsArr);
  };

  return (
    <div className="container ">
      {sercRs && (
        <div>
          <h1 className="text-danger">serach res</h1>
        </div>
      )}
      {isSearchActive === true && (
        <div>
          {allProductsArr.map((arr, idx) => (
            <div className="inline" key={arr.id + "1"}>
              {/*------------------------------------------------------------------- maybe to change to elements to in line block elemnts thet satch three in a pile in row  ??? yes? no ? -------------------------------------------------------------------*/}

              {
                <div>
                  {/* <h1>hh</h1> */}

                  <ProductCardComponent
                    productId={arr.id}
                    productName={arr.productName}
                    productPrice={arr.productPrice}
                    category={arr.category}
                    productCreator={arr.productCreator}
                    handleAddToCart={addProductToCart}
                    key={`${arr.id}key`}
                  />
                </div>
              }

              {/* {idx !== 0 && idx % 3 !== 0 && (
              <div>
                <ProductCardComponent
                  productId={arr.id}
                  productName={arr.productName}
                  productPrice={arr.productPrice}
                  category={arr.category}
                  productCreator={arr.productCreator}
                  key={arr.id}
                />
              </div>
            )} */}
            </div>
          ))}
        </div>
      )}
      {!localStorage.getItem("userEmail") && (
        <Link to="/LoginPage">Login page </Link>
      )}
    </div>
  );
};

export default HomePage;
