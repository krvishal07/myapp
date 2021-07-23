//import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
   <>
    <Navbar/>
    <Route exact path="/">
        <Home/>
    </Route>
    <Route path="/AboutMe">
        <AboutMe/>
    </Route>
    <Route path="/SignIn">
        <SignIn/>
    </Route>
    <Route path="/SignUp">
        <SignUp/>
    </Route>
    
    
   </>
  );
}

export default App;
