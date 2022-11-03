import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {LoginPage} from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

import 'bootstrap/dist/css/bootstrap.min.css';

import {Dashboard} from "./pages/Dashboard/Dashboard";
import {ToastContainer} from "react-toastify";
import {HomePage} from "./pages/Home/HomePage";
import {Car} from "./pages/Car/Car";
import {Category} from "./pages/Category/Category";
import NavbarHome from "./components/Home/Navbar";
import {AddCategory} from "./pages/Category/AddCategory";
import {AddCar} from "./pages/Car/AddCar";

function App() {
  return (
      <div className={'maxw1600 m0a'}>
          <ToastContainer />
          <Router>
              <NavbarHome />
              <Switch>
                  <Route path={'/'} exact component={HomePage} />
                  <Route path={'/dashboard'} component={Dashboard} />
                  <Route path={'/cars'} component={Car} />
                  <Route path={'/categories'} component={Category} />
                  <Route path={'/add-categories'} component={AddCategory} />
                  <Route path={'/add-cars'} component={AddCar} />
                  <Route path={'/login'} component={ LoginPage }/>
                  <Route path={'/register'} component={ RegisterPage }/>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
