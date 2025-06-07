import axios from "axios";
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
import { useState } from "react";
import "./Login.css"
import HeaderComponent from "./HeaderComponent";


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const login = () => {
    if ((username == "") && (password == "")) {
      return;
    } else {
      axios
        .post("http://localhost:8000/login", {
          username: username,
          password_hash: password,
        })
        .then(function (response) {
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/profile");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  return (
    <>
    <HeaderComponent admin={false}loggedIn={false} />
    <div className="wrapper">
       
      <div className="box">
      <h1 className="title">Login Page</h1>
        {fetchToken() ? (
          <p>you are logged in</p>
          
        ) : (
         
      <>
      <p>username</p>
      <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  
                />
      <p>password</p>
      <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
      <button type="button" onClick={login}>
                  Login
                </button>
      </>
        )}
    </div>
    </div>
    </>
  
  );
}
