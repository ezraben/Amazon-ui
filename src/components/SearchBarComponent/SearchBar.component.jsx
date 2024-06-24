import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import ProductCardComponent from "../ProductCardComponent/ProductCard.component";
import DashBoardPage from "../../pages/DashBordPage/DashBord.page";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  searchActive,
  showResOfSearch,
  hideResOfSearch,
} from "../../store/handleSerachBar";

import {
  cheangeSearchBarToActive,
  SearchBarNotActive,
} from "../../store/handleSerachBar";
import toast from "react-hot-toast";
import EditProductComponent from "../../components/EditProductComponent/EditProduct.component";

const SearchBarComponent = (props) => {
  const [searchFeild, setSearchFelid] = useState("");
  const [productsArr, setProductsArr] = useState([]);
  const [idsArr, setIdsArr] = useState([]);
  const [searchMsg, setSearchMsgr] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [prodId, setProdId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isCartPage, setIsCartPage] = useState(false);

  //  console.log("category", category);

  const [prodName, setProdName] = useState("");
  const [prodCreator, setProdCreator] = useState("");
  const [showEditComp, setShowEditComp] = useState(false);

  const hanleSearchFeild = (ev) => {
    setSearchFelid(ev.target.value);
  };

  const isSearchActive = useSelector(
    (state) => state.searchBar.searchBarActive
  );
  const resSearch = useSelector((state) => state.searchBar.resOfSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "isSearchActive is serch bar activ from use affect",
      isSearchActive
    );
  }, [isSearchActive]);

  const cleanSearch = () => {
    setSearchFelid("");
    dispatch(hideResOfSearch());
    dispatch(SearchBarNotActive());
  };
  const getProductsByProductName = (ev) => {
    if (searchFeild.length > 0) {
      dispatch(cheangeSearchBarToActive());
    }
    axios
      .get(`/products/getProductByProductName?productName=${searchFeild}`)
      .then((data) => {
        setSearchMsgr(false);
        console.log("data from search bar", data);
        setProductsArr(data.data);
        if (data.data.length === 0) {
          console.log("content", data.data);
          setSearchMsgr(false);
        }

        if (data.data.length === 0) {
          setSearchMsgr(true);
        }

        /*
      change the component of products to see, and not the regular and the one from the search
      */
        if (data.data.length > 0) {
          // dispatch(cheangeSearchBarToActive());
          // dispatch(showResOfSearch());
        }
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  };
  ////////////
  const addProductToCart = (props) => {
    console.log("props from serch bar comp", props);
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
  ////////////////////////////////////////
  // from here delete product
  const handleShowDeleteMsg = () => {
    setDeleteMsg(true);
  };

  const handleHideDeleteMsg = () => {
    setDeleteMsg(false);
  };
  const deleteProduct = (id, prodName) => {
    handleShowDeleteMsg();
    setProdId(id);
    setProdName(prodName);
    console.log("this gos for logging the props", id, prodName);
    // props.handleShowDeleteMsg();
    // props.setProductId(id);
    // props.setProductName(prodName);
  };
  const deleteProductFinal = (id) => {
    console.log("this gos for logging the props", id);
    axios
      .delete(`/products/deleteProduct?id=${prodId}`)
      .then(({ data }) => {
        console.log(data);
        //  getAllProducts();
        handleHideDeleteMsg();
        if (data.status === "Success") {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("err from deleting axios", err);
      });
  };
  // untile here delete product
  //////////////////////////////////
  /////////////////////////////////////////////
  //from here edite product
  const handleShowEditomp = (
    id,
    productName,
    productPrice,
    category,
    creator
  ) => {
    setProdId(id);
    setProdName(productName);
    setProductPrice(productPrice);
    setCategory(category);
    setProdCreator(creator);

    setShowEditComp(true);
  };
  const closeEdit = () => {
    console.log("editClik");
    setShowEditComp(false);
  };

  //until here edite product
  ///////////////////////////////////////////

  return (
    <Fragment>
      <span className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by Product Name"
          aria-label="Search"
          onChange={hanleSearchFeild}
          value={searchFeild}
        />
        <button
          onClick={getProductsByProductName}
          className="btn button-nav"
          type="submit"
        >
          Search
        </button>
        {isSearchActive === false && (
          <button
            onClick={cleanSearch}
            className="btn btn-primary"
            type="submit"
          >
            Clear
          </button>
        )}
      </span>

      {isSearchActive === false && (
        <div>
          {searchMsg === true && <h1>nothing found</h1>}
          {productsArr.map((arr, idx) => (
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
                    handleDelete={deleteProduct}
                    handleEdit={handleShowEditomp}
                    key={`${arr.id}key`}
                  />
                  {/* {deleteMsg === true && (
                    <div>
                      <h1>delete product: ? </h1>
                      <h1>delete product: {prodName} ? </h1>
                      <div>
                        <button
                          onClick={deleteProductFinal}
                          className="btn btn-danger"
                        >
                          delete
                        </button>
                        <button
                          onClick={handleHideDeleteMsg}
                          className="btn btn-warning"
                        >
                          {" "}
                          cancel
                        </button>
                      </div>
                    </div>
                  )} */}
                  {/* {showEditComp === true && (
                    <EditProductComponent
                      hideEditComp={closeEdit}
                      pId={productId}
                      pName={productName}
                      pPrice={productPrice}
                      pCategory={category}
                      getAllProducts={getAllProducts}
                    />
                  )} */}
                </div>
              }
            </div>
          ))}
          {deleteMsg === true && (
            <div>
              <h1>delete product: ? </h1>
              <h1>delete product: {prodName} ? </h1>
              <div>
                <button onClick={deleteProductFinal} className="btn btn-danger">
                  delete
                </button>
                <button
                  onClick={handleHideDeleteMsg}
                  className="btn btn-warning"
                >
                  {" "}
                  cancel
                </button>
              </div>
            </div>
          )}
          {showEditComp === true && (
            <EditProductComponent
              hideEditComp={closeEdit}
              pId={prodId}
              pName={prodName}
              pPrice={productPrice}
              pCategory={category}
              pCreator={prodCreator}
              // getAllProducts={getAllProducts}

              // this one toke care of the err  that stop the code,  and the updated is taking place  -but- the product are not visible in search and you can see them not in search
              getAllProducts={getProductsByProductName}
            />
          )}
          {isSearchActive === false && (
            <button onClick={cleanSearch} className="btn btn-primary">
              back to res
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default SearchBarComponent;
