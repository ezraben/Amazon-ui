import { useState } from "react";
import Joi from "joi-browser";
import axios from "axios";
import toast from "react-hot-toast";

import loginCss from "./loginPageCss.css";

import LoginValidation from "../../validation/Login.validation";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../store/auth";
import { userEmail } from "../../store/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validatedValue = Joi.validate({ email, password }, LoginValidation, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      console.log("error", error);
    }
    if (validatedValue) {
      axios
        .post("/auth/login", { email, password })

        .then(({ data }) => {
          if (data.status === "Success") {
            console.log("data", data);
            localStorage.setItem("token", data.msg);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("admin", data.isAdmin);
            dispatch(logIn());
            dispatch(userEmail(email));
            toast("you are logged in");
            if (data.isAdmin === 1) {
              navigate("/DashBoardPage");
            }
            if (data.isAdmin === 0) {
              navigate("/");
            }
          }
          if (data.status === "Failed") {
            toast(data.msg);
            throw data.msg;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h1 className="text-center mt-5">Please Login</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="email@gmail.com"
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>

      <div className="text-center">
        <button className=" button-Register  text-center m-5">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
