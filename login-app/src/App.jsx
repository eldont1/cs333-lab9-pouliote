import { useState } from "react";
import "./App.css";
import Login from "./Login.jsx";

const hour = new Date().getHours();
console.log("The hour is", hour);

function App() {
  // isLoggedIn starts out false. setIsLoggedIn changes it and redraws the page.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  console.log("App drew the page, isLoggedIn is", isLoggedIn);

  // log the login, set the username, and change login status (true)
  function handleLogin(name) {
    console.log("Login clicked");
    setUsername(name);
    setIsLoggedIn(true);
  }

  // log the logout, and change login status (false)
  function handleLogout() {
    console.log("Log out clicked");
    setIsLoggedIn(false);
  }

  // now we have a log out button if we're logged in. If not, show the login page. 
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Hello, {username}!</h1>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {hour >= 17 && <p>It's after 5. Take a break!</p>}
    </div>
  );
}

export default App;
