import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/auth";
// import { logOut } from "../../store/auth";

const LogOutPage = () => {
  const LoginTatus = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const click = () => {
  useEffect(() => {
    dispatch(logOut());
  }, []);

  console.log("logged status", LoginTatus);
  useEffect(() => {
    navigate("/LoginPage");
  }, []);
  // navigate("/LoginPage");

  // };

  return (
    <div>
      {/* <h1>LogOutPage</h1>
      <button onClick={click}>logOut</button> */}
    </div>
  );
};
export default LogOutPage;
