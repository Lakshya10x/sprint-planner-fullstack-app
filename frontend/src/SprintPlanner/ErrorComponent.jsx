import { Link } from "react-router-dom";

export default function ErrorComponent() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>We are working hard on this page !!</h2>
      <p>Apologies for the inconvenience. Kindly wait until it's complete.</p>
      <Link to="/" className="home-link">← Back to Sprint Planner</Link>
    </div>
  )
}
