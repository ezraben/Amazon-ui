import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../store/auth";
import { admin } from "../../store/auth";
import { notAdmin } from "../../store/auth";
import navCss from "./navBarCss.css";
import SearchBarComponent from "../SearchBarComponent/SearchBar.component";

////////////////////////////
const NavBarComponent = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.loggedIn);
  const isHeAdmin = useSelector((state) => state.auth.isAdmin);
  // const notAdmin = useSelector((state) => state.auth.isAdmin);
  const userEmail = localStorage.getItem("userEmail");
  if (!isLogin && userEmail) {
    dispatch(logIn());
  }
  useEffect(() => {
    // console.log("and nowwwww", isHeAdmin);
  }, [isHeAdmin]);

  useEffect(() => {
    if (
      localStorage.getItem("admin") === "1" ||
      localStorage.getItem("admin") === 1
    ) {
      dispatch(admin());
      // console.log("admin status is??", isHeAdmin);
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      dispatch(notAdmin());
      console.log("admin status is??", isHeAdmin);
    }
  });

  return (
    <div className="mb-5">
      <nav
        className={
          isLogin
            ? "navbar navbar-expand-lg navbar-dark "
            : "navbar navbar-expand-lg navbar-light bg-danger"
        }
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-around">
              {!isLogin && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="LoginPage">
                      login
                      {/* Login <BoxArrowInRight /> */}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="SingUpPage">
                      SingUp
                      {/* SingUpPage <PersonAdd /> */}
                    </NavLink>
                  </li>

                  {/* <li>
                    <form className="d-flex" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button className="btn button-nav" type="submit">
                        Search 
                      </button>
                    </form>
                  </li> */}
                </Fragment>
              )}

              {isLogin && isHeAdmin && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/">
                      {userEmail}
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/">
                          AllProductsComponent
                        </NavLink>
                      </li>

                      {/* <li>
                        <NavLink
                          className="dropdown-item text-danger"
                          to="/DeleteAccountPage"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          DeleteAccountPage
                        </NavLink>
                      </li> */}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="DashBoardPage">
                      Dashbord
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="AddProductPage">
                      addProduct
                    </NavLink>
                  </li>

                  {/* <li>
                    <form className="d-flex" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button className="btn button-nav" type="submit">
                        Search
                      </button>
                    </form>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="CartPage">
                      Cart
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-danger" to="LogOutPage">
                      LogOut
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {isLogin && isHeAdmin === false && (
                // {isLogin && isHeAdmin === false && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/">
                      {userEmail}
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/">
                          AllProductsComponent
                        </NavLink>
                      </li>

                      {/* <li>
                        <NavLink
                          className="dropdown-item text-danger"
                          to="/DeleteAccountPage"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          DeleteAccountPage
                        </NavLink>
                      </li> */}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                    <form className="d-flex" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button className="btn button-nav" type="submit">
                        Search
                      </button>
                    </form>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="text-white nav-link" to="CartPage">
                      CartPage
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link text-danger" to="LogOutPage">
                      LogOut
                    </NavLink>
                  </li>
                  {/* <li>
                    <SearchBarComponent />
                  </li> */}
                </Fragment>
              )}
              {/* {isLogin && admin === "true" && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/">
                      {userEmail}
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="AllProductsComponent"
                        >
                          AllProductsComponent
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="LikedProductPage"
                        >
                          LikedProductPage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="SupeAdminDashBordPage"
                        >
                          SupeAdminDashBordPage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="AdminDataPage">
                          AdminDataPage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item text-danger"
                          to="/DeleteAccountPage"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          DeleteAccountPage
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="dash">
                      Dashbord
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="addProduct">
                      addProduct
                    </NavLink>
                  </li>

                  <li onClick={logOut} className="nav-item">
                    <NavLink className="nav-link text-danger" to="#">
                      LogOut <PersonDash />
                    </NavLink>
                  </li>
                </Fragment>
              )} */}
            </ul>
          </div>
        </div>
        <li></li>
      </nav>
    </div>
  );
};

export default NavBarComponent;

////////////
