import { useState } from "react";
import Input from "./Input.jsx";

// login form that uses props to pass on username.
function Login(props) {
  // what's typed in the Username box
  const [username, setUsername] = useState("");
  // an error message, or "" when there's no error
  const [error, setError] = useState("");

  // set the username.
  function handleChange(event) {
    // this didn't log what I thought it would. weird format.
    // console.log("handleChange called with: " + event.target.value)
    setUsername(event.target.value);
  }

  // return if username wasn't entered. otherwise, log the login with the username, and set the username.
  function handleClick() {
    if (username === "") {
      console.log("No username typed");
      setError("Please type a username.");
      return;
    }
    console.log("Logging in as", username);
    setError("");
    props.onLogin(username);
  }

  // return the form -- two inputs (username and password), both using props from input. Also show errors if there were any (&& trick)
  return (
    <form className="form">
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />
      <Input type="password" placeholder="Password" />
      <button type="button" onClick={handleClick}>Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Login;