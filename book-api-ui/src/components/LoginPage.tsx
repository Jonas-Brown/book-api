import { useContext, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { decodeJwt } from "../services/book.service";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setIsAdmin, setAuthToken } =
    useContext(AuthContext);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    fetch("/book-api/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json?.jwt) {
          setAuthToken(json.jwt);
          const decodedJwt = decodeJwt(json.jwt);
          if (decodedJwt === null) return;

          setIsLoggedIn(true);
          setUser({
            email: decodedJwt.sub,
            firstName: decodedJwt.firstName,
            lastName: decodedJwt.lastName,
          });
          const isAdmin = decodedJwt.roles.includes("ROLE_ADMIN")
            ? true
            : false;
          setIsAdmin(isAdmin);

          navigate("/");
        }
      })
      .catch((err) => {
        //could add on screen error message
        console.error(err);
      });
    // Handle login logic here
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="max-h-screen bg-white flex items-start justify-center p-24 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Login to BookInfoApp
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
