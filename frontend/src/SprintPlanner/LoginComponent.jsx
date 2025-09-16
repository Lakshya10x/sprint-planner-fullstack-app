import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added Link import
import "./SprintApp.css"; // Make sure CSS is imported
import { useAuth } from "./Security/AuthContext";

export default function LoginComponent() {
  const [username, setUsername] = useState("Lakshya");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  async function handleSubmit(event) {
    event.preventDefault(); //Prevent refresh on form submit
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setErrorMsg(true);
    }
  }
  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Sprint Planner Login</h2>

        {/* {successMsg && <div className="alert alert-success">Authenticated Successfully ✅</div>} */}
        {errorMsg && (
          <div className="alert alert-danger">Authentication Failed ❌</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/" className="login-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
