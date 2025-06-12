import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import AddBook from "./components/AddBook";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
