import { useEffect, useState } from "react";
import { deleteSprintApi, retreiveAllSprints } from "../Api/SprintApiService";
import { AuthContext, useAuth } from "./Security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SprintsListComponent() {
  // const today = new Date();
  // const targetDate = new Date(
  //   today.getFullYear() + 1,
  //   today.getMonth(),
  //   today.getDate()
  // );

  // const sprints = [
  //   { id: 1, description: "Dev Team Scrum Meeting", status: false, targetDate },
  //   { id: 2, description: "Prod Support KT Session", status: true, targetDate },
  //   { id: 3, description: "Customer website Hotfix Discussion", status: false, targetDate },
  // ];

  const [sprints, setSprints] = useState([]);
  const navigate = useNavigate();

  const authContext = useAuth();
  const username = authContext.username;

  useEffect(() => {
    if (username) {
      refreshSprints();
    }
  }, [username]);

  function refreshSprints() {
    retreiveAllSprints(username)
      .then((response) => {
        console.log(response);
        setSprints(response.data);
      })
      .catch((error) => console.log(error));
  }

  const [message, setMessage] = useState(null);

  function deleteSprint(id) {
    deleteSprintApi(username, id)
      .then(() => {
        setMessage(`Sprint with id : ${id} has been deleted successful`);
        refreshSprints();
      })
      .catch((error) => console.log(error));
  }

  function updateSprint(id) {
    navigate(`/sprint/${id}`);
  }

  function addNewSprint() {
    navigate(`/sprint/-1`);
  }

  return (
    <div className="sprints-container container">
      <h1 className="page-title">Check Your Sprints</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div className="table-responsive">
        <table className="table custom-sprint-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Sprint Name</th>
              <th>Goal</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {sprints.map((sprint) => (
              <tr key={sprint.id}>
                {/* <td>{sprint.id}</td> */}
                <td>{sprint.sprintName}</td>
                <td>{sprint.goal}</td>
                <td>{sprint.startDate.toString()}</td>
                <td>{sprint.endDate.toString()}</td>
                <td>
                  <span
                    className={`status-pill ${
                      sprint.status ? "done" : "pending"
                    }`}
                  >
                    {sprint.status ? "Done" : "Pending"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteSprint(sprint.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateSprint(sprint.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <div className="btn btn-success m-5" onClick={addNewSprint}>
          Add New Sprint
        </div>
      </div>
    </div>
  );
}
