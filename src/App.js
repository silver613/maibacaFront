import logo from './logo.svg';
import './App.css';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Main}/>
      {/* <Route path="/category" component={Category}/> */}
      <Footer />
    </Router>  
  );
}

export default App;
