import "./App.css";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AddProductPage from "./pages/AddProductPage/AddProduct.page";
import LoginPage from "./pages/LoginPage/Login.page";
import SingUpPage from "./pages/SingUpPage/SingUp.page";
import DashBoardPage from "./pages/DashBordPage/DashBord.page";
import Homepage from "./pages/HomePage/Homepage.page";
import { Counter } from "./testing/thetTester";
import NotFoundPage from "./pages/ErrorPage/NotFoundPage";
import LogOutPage from "./pages/LogOutPage/LogOut.page";
import NavBar from "./components/NavBarComponent/NavBar.component";
import { useSelector, useDispatch } from "react-redux";
import CartPage from "./pages/CartPage/Cart.page";
//
import SearchBarComponent from "./components/SearchBarComponent/SearchBar.component";

function App() {
  // const dispatch = useDispatch();

  // const userEmail = localStorage.getItem("userEmail");

  return (
    <div>
      <Toaster />
      <NavBar />

      <SearchBarComponent />
      {/* <Route path="/navBar" element={<NavBar />} /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SingUpPage" element={<SingUpPage />} />
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/DashBoardPage" element={<DashBoardPage />} />
        {/* <Route path="/SearchResPage" element={<SearchResPage />} /> */}
        <Route path="/Counter" element={<Counter />} />
        <Route path="/LogOutPage" element={<LogOutPage />} />
        <Route path="/CartPage" element={<CartPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {/* <LoginPage /> */}
      {/* <Counter/> */}

      {/* <SingUpPage /> */}
      {/* <AddProductPage /> */}
      {/* <DashBoardPage /> */}
    </div>
  );
}

export default App;
