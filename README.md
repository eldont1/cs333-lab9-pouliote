# cs333-lab9
State: a login form in React

You'll start with a login form that's all in one file and doesn't do anything. You'll show the form or a hello message depending on a variable, split the form into components, swap your if/else for a ternary, and then use `useState` so the Login button really logs you in.

This is a practice login. Nothing is checked and nothing is saved, so don't type a real password into it.

Do each step below and answer the questions right here in this README as you go (type your answer under each question). Everything is on your laptop until Part 7.

You need:
- Node 20.19 or newer on your laptop (`node -v` to check), same as Labs 7 and 8
- your server, with Lab 8 on it
- the week 8 part 2 slides from "Lab 9 (next week) uses this form" to the end (ternary, `&&`, `useState`)

Stuck? Look at the Stuck table at the bottom first, then post in the Slack lab thread: the command you ran, the exact error (copy and paste it), and what you already tried.

Keep the browser's developer tools open the whole lab (F12, or right-click the page, Inspect, then the Console tab). Your `console.log`s show up there, and so do React's errors.

---

# Part 1: Make the app

1. Click "Use this template" to make your own copy of this repo, clone it to your laptop, and open a terminal in the repo folder.

2. Make a new React app inside the repo:

```bash
npm create vite@latest login-app
```

Answer the questions the same way as Lab 8:
- Ok to proceed? y
- Select a framework: React
- Select a variant: JavaScript
- Which linter to use? keep the default
- Install with npm and start now? Yes

Open the link it prints (http://localhost:5173) in your browser.

This terminal is now busy running your app. Leave it running. Open a second terminal on your laptop for everything else.

Next time you want to start it yourself: `cd login-app` then `npm run dev`.

3. This repo has a `starter` folder with the form already written. Copy both files into your app, over the ones Vite made. In your second terminal, in the repo folder:

```bash
cp starter/App.jsx starter/App.css login-app/src/
```

(Windows Command Prompt: `copy starter\App.jsx login-app\src\` and `copy starter\App.css login-app\src\`. Or drag the two files into `login-app/src` in VS Code and say yes to replace.)

Your page should show Hello and a form with Username, Password and a Login button.

Question 1: type anything in the boxes and click Login. What happens to the page and to what you typed? (Look at the address bar too.)

Commit: `Part 1: login app`

---

# Part 2: Show one thing or the other

Right now the page shows Hello and the form at the same time. We want Hello only when you're logged in, and the form only when you're not. `isLoggedIn` at the top of `App.jsx` is going to decide.

4. In `App.jsx`, above `function App() {` (not inside it), add this function. It's the if/else from the slides:

```jsx
function renderCondition() {
  if (isLoggedIn === true) {
    return <h1>Hello</h1>;
  } else {
    return (
      <form className="form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    );
  }
}
```

Then change `App` so it calls your function instead:

```jsx
function App() {
  return <div className="App">{renderCondition()}</div>;
}
```

Save. You should see only the form.

5. TODO: change `const isLoggedIn = false;` to `true` and save. Then put it back to `false`.

Question 2: what did you see with `true`? With `false`? Why does `renderCondition()` need curly braces around it in `App`?

Commit: `Part 2: if/else`

---

# Part 3: Components

The form is stuck inside `renderCondition`. A form is a good thing to make its own component: a `Login` component, made of `Input` components.

6. Make a new file `src/Input.jsx` and paste this. It makes one box, and props say what kind:

```jsx
function Input(props) {
  return <input type={props.type} placeholder={props.placeholder} />;
}

export default Input;
```

7. Make a new file `src/Login.jsx` and paste this. It's the form, using your `Input` twice:

```jsx
import Input from "./Input.jsx";

function Login() {
  return (
    <form className="form">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
```

8. Use it in `App.jsx`. Under the `import "./App.css";` line, add:

```jsx
import Login from "./Login.jsx";
```

and in `renderCondition`, replace the whole `return ( <form ... </form> );` in the `else` with:

```jsx
    return <Login />;
```

The page should look the same.

Question 3: `App` uses `Login`, and `Login` uses `Input`. What props does each `Input` get? Where in the page does each one end up?

Commit: `Part 3: Login and Input components`

---

# Part 4: Ternary and &&

9. Ternary. You can't put an `if` inside the `{ }` in your JSX, because an `if` is a statement, not a value. The ternary does the same job and is a value: `condition ? if true : if false`.

Delete your whole `renderCondition` function, and change `App` to this:

```jsx
function App() {
  return (
    <div className="App">
      {isLoggedIn ? <h1>Hello</h1> : <Login />}
    </div>
  );
}
```

The page should look the same. TODO: flip `isLoggedIn` to `true` and back to `false` again to check.

Question 4: read `{isLoggedIn ? <h1>Hello</h1> : <Login />}` out loud in plain English. What does it say?

10. `&&`. Sometimes you want to show something or nothing at all. Above `function App() {` (not inside it), add:

```jsx
const hour = new Date().getHours();
console.log("The hour is", hour);
```

and under the `{isLoggedIn ? ... }` line, add:

```jsx
      {hour >= 17 && <p>It's after 5. Take a break!</p>}
```

TODO: look at the hour in the Console. Change `17` to a number that makes the message show up now, then one that makes it go away.

Question 5: when does the `<p>` show up, and when does nothing show up? Why is `&&` handier than a ternary here?

Commit: `Part 4: ternary and &&`

---

# Part 5: useState makes the button work

`isLoggedIn` is a plain `const` at the top of the file. React only redraws the page when state changes, so a plain variable can't flip the page when you click. `useState` gives you a variable that React watches, plus a function to change it.

11. Change the Login button so it doesn't reload the page. In `Login.jsx`, change the `<button` line to this, and give `Login` a `props`:

```jsx
function Login(props) {
```

```jsx
      <button type="button" onClick={props.onLogin}>Login</button>
```

A `type="submit"` button inside a `<form>` sends the form and reloads the page (that's what you saw in Question 1). A `type="button"` button just runs its `onClick`.

12. Now the state, in `App.jsx`. Add `import { useState } from "react";` as the very first line, so the top looks like this:

```jsx
import { useState } from "react";
import "./App.css";
import Login from "./Login.jsx";
```

Delete the `const isLoggedIn = false;` line. Keep your two `hour` lines. Then make `App` look like this:

```jsx
function App() {
  // isLoggedIn starts out false. setIsLoggedIn changes it and redraws the page.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("App drew the page, isLoggedIn is", isLoggedIn);

  function handleLogin() {
    console.log("Login clicked");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    console.log("Log out clicked");
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Hello</h1>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {hour >= 17 && <p>It's after 5. Take a break!</p>}
    </div>
  );
}
```

(The ternary got bigger, so each side is in its own `( )` on its own lines. It's the same ternary.)

Click Login, then Log out, a few times. Watch the Console.

Question 6: what does the Console print each time you click? Why does "App drew the page" show up again after every click? (You'll probably see each one twice. Same as Lab 8: that's React double-checking your code while you develop.)

Question 7: the state lives in `App`, but the Login button is in `Login`. How does clicking the button in `Login` change `isLoggedIn` in `App`? (Follow `handleLogin` from `App` to the button.)

Commit: `Part 5: useState`

---

# Part 6: Say hello, and catch an empty username

Right now Login works even with empty boxes. Let's say hello to the person by name, and stop them if they didn't type one. That's a little error handling: check the input before you use it, and tell the person what's wrong instead of doing nothing.

13. `Input` needs to tell `Login` what's typed in it. Change `Input.jsx` to this:

```jsx
function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;
```

`onChange` runs every time a letter is typed. `value` is what the box shows.

14. Change `Login.jsx` to this:

```jsx
import { useState } from "react";
import Input from "./Input.jsx";

function Login(props) {
  // what's typed in the Username box
  const [username, setUsername] = useState("");
  // an error message, or "" when there's no error
  const [error, setError] = useState("");

  function handleChange(event) {
    setUsername(event.target.value);
  }

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
```

`event.target.value` is what's in the box right now. `return` inside the `if` stops the function early, so you don't get logged in.

15. Last, `App` keeps the name so it can say hello. In `App.jsx`, under the `isLoggedIn` line, add:

```jsx
  const [username, setUsername] = useState("");
```

change `handleLogin` to take the name:

```jsx
  function handleLogin(name) {
    console.log("Login clicked");
    setUsername(name);
    setIsLoggedIn(true);
  }
```

and change `<h1>Hello</h1>` to:

```jsx
          <h1>Hello, {username}!</h1>
```

TODO: click Login with the Username box empty, then type a name and click Login again.

Question 8: what happens with the box empty? With a name? Which line stops the empty one from logging in?

Question 9: `Login` has its own `username`, and `App` has its own `username`. How does the name get from one to the other?

Your whole `App.jsx` should look like this now (with your own console.logs if you added more):

```jsx
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

  function handleLogin(name) {
    console.log("Login clicked");
    setUsername(name);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    console.log("Log out clicked");
    setIsLoggedIn(false);
  }

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
```

16. Comments and console.logs. Add a comment above each function in `App.jsx`, `Login.jsx` and `Input.jsx`, saying what it does, in your own words. Add at least one `console.log` of your own somewhere that helped you see what your code was doing. You can leave your console.logs in, or comment them out with `//`. Either way is fine.

17. Optional: a counter. Make `src/Counter.jsx`:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}

export default Counter;
```

Import it in `App.jsx` (`import Counter from "./Counter.jsx";`) and put two of them under the Log out button: `<Counter />` and `<Counter />`. Click each one. Do they count together or separately? Why?

18. Optional styling. Paste this at the bottom of `App.css`, then change the colors and sizes to make it yours:

```css
body {
  background-color: #eef2f7;
  font-family: Arial, sans-serif;
}

.form {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.form button,
.App button {
  background-color: darkslateblue;
  color: white;
  border: none;
  border-radius: 4px;
}

.form button:hover,
.App button:hover {
  background-color: slateblue;
}
```

Commit: `Part 6: hello and empty username`

---

# Part 7: Build it and put it on your server

19. Build. In your first terminal (the one running the app) press Ctrl+C to stop it.

Same two ways as Labs 7 and 8. Way B keeps your other apps where they are, so it's the one I'd pick.

## Way A: straight into /var/www/html

Heads up: this replaces whatever is in `/var/www/html` now.

On your laptop, inside `login-app`:

```bash
npm run build
scp -r dist/* yourfirstname@your-server-address:/var/www/html/
```

Your site: `http://your-server-address`

## Way B: in a folder called login

On your laptop, inside `login-app`, build with the folder name:

```bash
npm run build -- --base=/login/
```

In your second terminal, log in to your server, make the folder, and log out again:

```bash
ssh yourfirstname@your-server-address
mkdir /var/www/html/login
exit
```

Back on your laptop, inside `login-app`, copy what's inside `dist` into it:

```bash
scp -r dist/* yourfirstname@your-server-address:/var/www/html/login/
```

Using WinSCP instead? Make a new folder called `login` inside `/var/www/html` on the right, open it, and drag everything inside your `dist` folder (not the `dist` folder itself) over.

Your site: `http://your-server-address/login/`

20. Open your site in your browser. Log in with a name, then log out.

Commit: `Part 7: build and deploy`

---

# Hand it in

21. Push this repo to your own GitHub repo (your `login-app` code and this README with your answers). `node_modules` and `dist` are left out on purpose, Vite's `.gitignore` takes care of that.

22. Submit in Moodle: your GitHub repo link and your site link (`http://your-server-address` or `http://your-server-address/login/`). Leave it up so I can look at it.

---

## Stuck?

| You see | What's going on | Fix |
| --- | --- | --- |
| `npm run dev` says `Missing script: "dev"` | You're not in `login-app` | `cd login-app` first |
| `cp: starter/App.jsx: No such file or directory` | Your second terminal isn't in the repo folder | `cd` to the repo folder (the one with `starter` in it), then try again |
| The page is blank | There's an error in your code | Console tab in the developer tools, read the red error |
| `Failed to resolve import "./Login.jsx"` | The file name, folder or capital letter is different | It has to be `src/Login.jsx`, capital L, and the import has to match exactly. Same for `Input.jsx` |
| `Login is not defined` | `App.jsx` is missing the import | `import Login from "./Login.jsx";` at the top of `App.jsx` |
| `useState is not defined` | The file is missing the import | `import { useState } from "react";` at the top of that file, with the curly braces |
| `Unexpected token` pointing at `if` | You put an `if` inside `{ }` in your JSX | Use the ternary from step 9 |
| `Adjacent JSX elements must be wrapped in an enclosing tag` | One side of the ternary has two tags | Wrap them in one `<div>` ... `</div>`, like step 12 |
| Clicking Login reloads the page and clears the boxes | The button is still `type="submit"` | `type="button"` with an `onClick`, step 11 |
| Clicking Login does nothing, no error | `onLogin` isn't passed down, or the names don't match | `<Login onLogin={handleLogin} />` in App, `props.onLogin` in Login, same spelling |
| `props.onLogin is not a function` | Same thing | Check `<Login onLogin={handleLogin} />` in `App.jsx` |
| You can't type in the Username box | `value` is there but `onChange` isn't | Step 13: `Input` needs `onChange={props.onChange}`, and step 14 passes `onChange={handleChange}` |
| Hello shows but no name | `handleLogin` doesn't take the name, or Login doesn't pass it | `function handleLogin(name)` and `props.onLogin(username)` |
| Way B: `/login/` shows a blank page | You built without `--base=/login/` | `npm run build -- --base=/login/` and copy `dist/*` into `/var/www/html/login/` again |
| `scp: ... Permission denied` or `mkdir: ... Permission denied` | `/var/www/html` doesn't belong to you yet | On the server: `sudo chown -R $USER:$USER /var/www/html` (week 6) |
