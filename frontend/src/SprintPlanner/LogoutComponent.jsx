import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
import { useEffect } from "react";

export default function LogoutComponent() {
  const authContext = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    authContext.logout();
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="logout-page">
      <h1>You are logged out !!</h1>
      <p>Thank you for using Sprint Planner. Do plan your sprint again </p>
      <Link to="/login" className="login-link">
        Login Again
      </Link>
    </div>
  );
}
