import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../Api/SprintApiService";

export default function LandingComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault(); // Prevent refresh on form submit

    // Basic client-side validation
    if (!username || username.trim().length < 3) {
      setErrorMsg("Username must be at least 3 characters long");
      return;
    }
    if (!password || password.length < 5) {
      setErrorMsg("Password must be at least 5 characters long");
      return;
    }

    try {
      const response = await apiClient.post("/users/register", {
        username,
        password,
      });

      if (response.status === 201) {
        setSuccessMsg(true);
        setErrorMsg("");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrorMsg(message);
      setSuccessMsg(false);
    }
  }

  return (
    <div className="register-page d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 rounded">
        {" "}
        {/* Reusing login-card class for similar design */}
        <h2 className="text-center mb-4">Register</h2>
        {successMsg && (
          <div className="alert alert-success">
            Registration Successful ✅. Redirecting to login...
          </div>
        )}
        {errorMsg && <div className="alert alert-danger">{errorMsg} ❌</div>}
        <form onSubmit={handleRegister}>
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
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
