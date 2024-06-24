import { useState } from "react";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCard.component";
import axios from "axios";
import { useEffect } from "react";
import { cloneDeep } from "lodash";

const CartPage = (props) => {
  // const getProducts = () => {};
  const [cartArr, setCartarr] = useState([]);
  const [finalCartArr, setFinalCartArr] = useState([]);
  // console.log("cartArr form start of component", cartArr);
  // console.log("finalCartArr form start of component", finalCartArr);
  useEffect(() => {
    console.log("yse ,get all products");
    getProductIds();
  }, []);

  const getProductIds = () => {
    if (cartArr.length === 0) {
      let dataFromStorage = [];
      let dataFromStorageSplit;
      dataFromStorage.push(localStorage.getItem("arrOfId"));
      if (dataFromStorage[0] != null) {
        dataFromStorageSplit = dataFromStorage[0].split(",");

        for (let l = 0; l < dataFromStorageSplit.length; l++) {
          let parsedData = parseInt(dataFromStorageSplit[l]);

          cartArr.push(parsedData);
        }

        // let objOfIdsArr = {};
        // objOfIdsArr = objOfIdsArr.cartArr;

        // const getProductsById = () => {
        //  dataFromStorageSplit = dataFromStorage[0].split(",");

        let bulidStringForAxios;
        for (let x = 0; x < cartArr.length; x++) {
          if (x === 0) {
            bulidStringForAxios = `id=${cartArr[0]}`;
          }
          if (x > 0) {
            bulidStringForAxios = bulidStringForAxios + `&id=${cartArr[x]}`;
          }
        }
        console.log("bulidStringForAxios", bulidStringForAxios);
        const getProductsInCart = () => {};

        axios
          .get(`/products/getProductsByMultipleIds?${bulidStringForAxios}`)
          //  .get(`/products/getProductsByMultipleIds?id=${cartArr}`)

          .then((data) => {
            // console.log("herrrrrr", data.data);
            console.log("data from axios", data);

            // setCartarr(data.data);
            setFinalCartArr(data.data);

            // console.log("cartArr from axios", cartArr);
          })

          .catch((err) => {
            console.log(" err from axios", err);
          });

        // };
        // getProductsById();
      }
    }
  };
  useEffect(() => {
    console.log("yse ,get all products");
    getProductIds();
  }, []);

  const handleRemoveProductFromCart = (id, idx) => {
    if (finalCartArr.length === 1) {
      localStorage.removeItem("arrOfId");
    }
    console.log("idx", idx);
    // console.log("id from here", id);
    // console.log("final arr", finalCartArr);
    let arrRemovedId = cloneDeep(finalCartArr);
    console.log("arrRemovedId arrRemovedId", arrRemovedId[idx]);

    let hideFromArr = arrRemovedId.splice(idx, 1);
    // console.log("hideFromArr hideFromArr", hideFromArr);
    // console.log("arrRemovedId arrRemovedId", arrRemovedId);

    // setFinalCartArr(arrRemovedId.splice(idx, 1));
    setFinalCartArr(arrRemovedId);
    // setFinalCartArr(hideFromArr);
  };
  useEffect(() => {
    // getProductIds();
  }, [finalCartArr]);
  // getProductIds();

  return (
    <div>
      <h1>Your cart</h1>
      {finalCartArr.length === 0 && (
        <h2 className="text-primary">Your cart is empty </h2>
      )}
      <div>
        {finalCartArr.map((arr) => (
          // {cartArr.map((arr) => (
          <div className="'inline" key={arr.id + "1"}>
            <div>
              <ProductCardComponent
                productId={arr.id}
                productName={arr.productName}
                productPrice={arr.productPrice}
                category={arr.category}
                productCreator={arr.productCreator}
                removeFromCart={handleRemoveProductFromCart}
                key={`${arr.id}key`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;

///////////////////////////////////////////
//working - not refreshing page after delete
// const CartPage = (props) => {
//   const getProducts = () => {};
//   console.log("props", props);
//   const [cartArr, setCartarr] = useState([]);
//   const [finalCartArr, setFinalCartArr] = useState([]);
//   // const getProductIds = () => {
//   if (cartArr.length === 0) {
//     let dataFromStorage = [];
//     let dataFromStorageSplit;
//     dataFromStorage.push(localStorage.getItem("arrOfId"));
//     if (dataFromStorage[0] != null) {
//       dataFromStorageSplit = dataFromStorage[0].split(",");

//       for (let l = 0; l < dataFromStorageSplit.length; l++) {
//         let parsedData = parseInt(dataFromStorageSplit[l]);

//         cartArr.push(parsedData);
//       }
//       console.log("cart arr", cartArr);
//       // let objOfIdsArr = {};
//       // objOfIdsArr = objOfIdsArr.cartArr;

//       // const getProductsById = () => {
//       //  dataFromStorageSplit = dataFromStorage[0].split(",");

//       let bulidStringForAxios;
//       for (let x = 0; x < cartArr.length; x++) {
//         if (x === 0) {
//           bulidStringForAxios = `id=${cartArr[0]}`;
//         }
//         if (x > 0) {
//           bulidStringForAxios = bulidStringForAxios + `&id=${cartArr[x]}`;
//         }
//       }
//       console.log("bulidStringForAxios", bulidStringForAxios);

//       axios
//         .get(`/products/getProductsByMultipleIds?${bulidStringForAxios}`)
//         //  .get(`/products/getProductsByMultipleIds?id=${cartArr}`)

//         .then((data) => {
//           // console.log("herrrrrr", data.data);
//           console.log("data from axios", data);

//           // setCartarr(data.data);
//           setFinalCartArr(data.data);
//           // console.log("data.data", data.data);
//           console.log("cartArr from axios", cartArr);
//         })

//         .catch((err) => {
//           console.log(" err from axios", err);
//         });

//       // };
//       // getProductsById();
//     }
//   }

//   // useEffect(() => {
//   //   console.log("cart from use", cartArr);
//   // }, [cartArr]);

//   const handleRemoveProductFromCart = () => {
//     console.log("now");

//   };

//   return (
//     <div>
//       <h1>Your cart</h1>
//       <div>
//         {finalCartArr.map((arr) => (
//           // {cartArr.map((arr) => (
//           <div className="'inline" key={arr.id + "1"}>
//             <div>
//               <ProductCardComponent
//                 productId={arr.id}
//                 productName={arr.productName}
//                 productPrice={arr.productPrice}
//                 category={arr.category}
//                 productCreator={arr.productCreator}
//                 removeFromCart={handleRemoveProductFromCart}
//                 key={`${arr.id}key`}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

///////////////////////////////////////////
//until here  - not refreshing page after delete

// export default CartPage;
