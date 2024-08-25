import NavbarComponent from "./NavbarComponent";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate,getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate

const LoginComponent = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const navigate = useNavigate(); // สร้าง instance ของ useNavigate

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((response) => {
        // login สำเร็จ
        authenticate(response, () => navigate("/create")); // ใช้ navigate แทน props.history.push
      })
      .catch((err) => {
        Swal.fire({
          title: "แจ้งเตือน",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  useEffect(()=> {
    getUser() && navigate("/")
  },[navigate])

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เข้าสู่ระบบ | Admin</h1>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input
          type="submit"
          value="เข้าสู่ระบบ"
          className="btn btn-primary"
        />
      </form>
    </div>
  );
};

export default LoginComponent;
