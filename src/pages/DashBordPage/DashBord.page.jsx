import axios from "axios";
import { useEffect, useState } from "react";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCard.component";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import EditProductComponent from "../../components/EditProductComponent/EditProduct.component";
const DashBoardPage = () => {
  const [userEmail] = useState(localStorage.getItem("userEmail"));
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  //   const [productCreator, setProductCreator] = useState("");
  const [productId, setProductId] = useState("");
  const [allProductsArr, setAllProductsArr] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [showEditComp, setShowEditComp] = useState(false);

  const dispatch = useDispatch();

  const isSearchActive = useSelector(
    (state) => state.searchBar.searchBarActive
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`/products/getProductByCreator?userEmail=${userEmail}`)
      .then((data) => {
        console.log("data", data);
        setAllProductsArr(data.data);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  };
  const handleShowDeleteMsg = () => {
    setDeleteMsg(true);
  };

  const handleHideDeleteMsg = () => {
    setDeleteMsg(false);
  };

  const deleteProduct = (id, prodName) => {
    handleShowDeleteMsg();
    setProductId(id);
    setProductName(prodName);
  };
  const deleteProductFinal = () => {
    axios
      .delete(`/products/deleteProduct?id=${productId}`)
      .then(({ data }) => {
        console.log(data);
        getAllProducts();
        handleHideDeleteMsg();
        if (data.status === "Success") {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("err from deleting axios", err);
      });
  };
  const handleShowEditomp = (id, productName, productPrice, category) => {
    setProductId(id);
    setProductName(productName);
    setProductPrice(productPrice);
    setCategory(category);
    console.log(
      "propduct id",
      id,
      "productName",
      productName,
      "productPrice: ",
      productPrice,
      "category: ",
      category
    );

    setShowEditComp(true);
  };
  const closeEdit = () => {
    console.log("editClik");
    setShowEditComp(false);
  };

  return (
    <div>
      {isSearchActive === true && (
        <div>
          {allProductsArr.map((arr) => (
            <ProductCardComponent
              productId={arr.id}
              productName={arr.productName}
              productPrice={arr.productPrice}
              category={arr.category}
              productCreator={arr.productCreator}
              //   editBenClickClick={arr.editClick}
              handleDelete={deleteProduct}
              handleEdit={handleShowEditomp}
              // deleteMsg={handleShowDeleteMsg}
              key={arr.id}
            />
          ))}
          {deleteMsg === true && (
            <div>
              <h1>delete product: {productName} ? </h1>
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
              pId={productId}
              pName={productName}
              pPrice={productPrice}
              pCategory={category}
              getAllProducts={getAllProducts}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DashBoardPage;
