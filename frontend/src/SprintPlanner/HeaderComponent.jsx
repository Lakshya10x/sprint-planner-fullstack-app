import { NavLink } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";

// An optional SVG logo for a more professional look
const SprintPlannerLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="#0052CC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="#0052CC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="#0052CC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          {/* Brand/Logo on the left */}
          <NavLink className="navbar-brand" to="/welcome/ram">
            <SprintPlannerLogo />
            <span className="brand-text">Sprint Planner</span>
          </NavLink>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="main-nav">
            {/* Main Navigation Links */}
            {isAuthenticated && (
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/welcome/ram">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sprints">
                    Sprints
                  </NavLink>
                </li>
              </ul>
            )}

            {/* User Action Links (Logout) on the right */}
            {isAuthenticated && (
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <NavLink className="nav-link logout-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
