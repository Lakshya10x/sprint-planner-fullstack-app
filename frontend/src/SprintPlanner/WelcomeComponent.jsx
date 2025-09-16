import { Link, useParams } from "react-router-dom";
// Import icons to make the UI more intuitive
import { BsListTask, BsPlusCircle, BsLightbulb } from "react-icons/bs";

import "./WelcomePage.css";

export default function WelcomeComponent() {
  const { username } = useParams();

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome back, {username}!</h1>
        <p className="lead-text">
          Ready to plan your next big success? Here's what you can do.
        </p>
      </div>

      <div className="action-cards-grid">
        {/* Card 1: Manage Sprints */}
        <Link to="/sprints" className="action-card">
          <div className="card-icon">
            <BsListTask />
          </div>
          <h2 className="card-title">Manage Your Sprints</h2>
          <p className="card-description">
            View, edit, or track the progress of all your existing sprints in
            one place.
          </p>
        </Link>

        {/* Card 2: Create a New Sprint */}
        <Link to="/sprint/-1" className="action-card">
          <div className="card-icon">
            <BsPlusCircle />
          </div>
          <h2 className="card-title">Create a New Sprint</h2>
          <p className="card-description">
            Start planning your next project cycle by creating a new sprint from
            scratch.
          </p>
        </Link>

        {/* Card 3: Pro Tip (Not a link, just info) */}
        <div className="action-card non-clickable">
          <div className="card-icon">
            <BsLightbulb />
          </div>
          <h2 className="card-title">Pro Tip</h2>
          <p className="card-description">
            Break down large tasks into smaller, manageable user stories for
            more accurate planning.
          </p>
        </div>
      </div>
    </div>
  );
}
