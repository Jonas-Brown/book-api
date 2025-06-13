import { Route, BrowserRouter as Router, Routes } from "react-router";

//nice for this
import { lazy } from "react";
const Home = lazy(() => import("./components/Home"));
const Navbar = lazy(() => import("./components/Navbar"));
const About = lazy(() => import("./components/About"));
const AddBook = lazy(() => import("./components/AddBook"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const SignupPage = lazy(() => import("./components/SignupPage"));

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
