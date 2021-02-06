import logo from "./logo.svg";
import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import Category_1 from "./components/category_1";
import Footer from "./components/footer";
import Hot from "./components/hot";
import Contact from "./components/contact";
import Term from "./components/term";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Detail from "./components/detail";
import ArchieveDetail from "./components/archievedetail";
function App() {
    return (
        <Router>
            <Header />
            <Route exact path="/" component={Main} />
            <Route path="/category_1" component={Category_1} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/archieve/:year/:month" component={ArchieveDetail} />
            <Route path="/hot" component={Hot} />
            <Route path="/term" component={Term} />
            <Route path="/contact" component={Contact} />
            <Footer />
        </Router>
    );
}

export default App;
