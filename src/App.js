import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game1 from "./views/Game1";
import Game2 from "./views/Game2";
import Game3 from "./views/Game3";
import Game4 from "./views/Game4";
import Game5 from "./views/Game5";
import Game6 from "./views/Game6";
import GamesMenu from "./views/GamesMenu";
import LoginRegister from "./views/LoginRegister";
import MainPage from "./views/MainPage";
import Stadistics from "./views/Stadistics";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <LoginRegister />
          </Route>
          <Route exact path="/main-page">
            <MainPage />
          </Route>
          <Route path="/games">
            <GamesMenu />
          </Route>
          <Route path="/game1">
            <Game1 />
          </Route>
          <Route path="/game2">
            <Game2 />
          </Route>
          <Route path="/game3">
            <Game3 />
          </Route>
          <Route path="/game4">
            <Game4 />
          </Route>
          <Route path="/game5">
            <Game5 />
          </Route>
          <Route path="/game6">
            <Game6 />
          </Route>
          <Route path="/stadistics">
            <Stadistics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
