import { useEffect, useState } from "react";
import Joi, { log } from "joi-browser";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import singUpCss from "./singupCss.css";

import SingUpValidation from "../../validation/SingUp.validation";

const SingUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleFirstName = (ev) => {
    setFirstName(ev.target.value);
  };
  const handleLastName = (ev) => {
    setLastName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handleAddressChange = (ev) => {
    setAddress(ev.target.value);
  };
  const handleIsAdminChange = (ev) => {
    setIsAdmin(ev.target.checked);
  };
  useEffect(() => {
    console.log("isAdmin", isAdmin);
  }, [isAdmin]);
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const validatedValue = Joi.validate(
      {
        firstName,
        lastName,
        email,
        address,
        password,
        confirmPassword,
      },
      SingUpValidation,
      { abortEarly: false }
    );
    const { error } = validatedValue;
    if (error) {
      // console.log("errrrr", validatedValue);
      console.log("errrrrrr", error.details);
      for (let i = 0; i < error.details.length; i++) {
        toast(error.details[i].message);
      }
    }
    if (validatedValue && !error) {
      axios
        .post("/auth/singUp", {
          // .post("http://localhost:3001/api/auth/singUp", {
          firstName,
          lastName,
          email,
          address,
          isAdmin,
          password,
        })
        .then(({ data }) => {
          if (data.status === "Success") {
            console.log("data from axios", data);
            toast(`Welcome ${firstName}`);
            navigate("/DashBoardPage");
          }
          if (data.status === "Failed") {
            toast(data.msg);
            throw data.msg;
          }
        })
        .catch((err) => {
          // toast(err);
          console.log("err from axios", err);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h1 className="text-center mt-5">Sing up page</h1>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          firstName
        </label>
        <input
          type="firstName"
          className="form-control"
          id="firstName"
          aria-describedby="emailHelp"
          //   placeholder="email@gmail.com"
          onChange={handleFirstName}
          value={firstName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          lastName
        </label>
        <input
          type="lastName"
          className="form-control"
          id="lastName"
          aria-describedby="emailHelp"
          //   placeholder="email@gmail.com"
          onChange={handleLastName}
          value={lastName}
        />
      </div>
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
        <label htmlFor="address" className="form-label">
          address
        </label>
        <input
          type="address"
          className="form-control"
          id="address"
          aria-describedby="emailHelp"
          //   placeholder="email@gmail.com"
          onChange={handleAddressChange}
          value={address}
        />
      </div>
      <div className="mb-3">
        <label className="switch">
          {" "}
          <span className="slider round"></span>
          <input
            type="checkbox"
            onChange={handleIsAdminChange}
            value={isAdmin}
          />
          <span className="slider round"></span>
        </label>
        {isAdmin === false && <span>switch on for admin account</span>}
        {isAdmin === true && <span>Admin account is on</span>}
      </div>
      {/* <div className="mb-3">
        <label htmlFor="admin" className="form-label">
          click for admin account
        </label>
        <input
          type="checkbox"
          className="form-control"
          id="admin"
          aria-describedby="emailHelp"
          //   placeholder="email@gmail.com"
          // onChange={handleAddressChange}
          // value={address}
        />
      </div> */}
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
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
        />
      </div>
      {password !== confirmPassword && (
        <div className="alert alert-warning">
          password and confirm password must match
        </div>
      )}

      <div className="text-center">
        <button className="btn button-Register text-center m-5">
          Create account
        </button>
      </div>
    </form>
  );
};

export default SingUpPage;
