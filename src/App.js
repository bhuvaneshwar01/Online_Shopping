import { Route,Switch } from "react-router-dom";
import Home from "./Pages/home/home";
import Login from "./Login";
import Profile from "./Pages/My_profile/Profile"

function App() {
  return (
    <div>
      <Switch>
      <Route path='/' exact>
        <Login />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      </Switch>
    </div>);
}

export default App;