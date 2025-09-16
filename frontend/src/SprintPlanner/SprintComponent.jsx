import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
import { useEffect, useState } from "react";
import {
  createSprintApi,
  retreiveSprintApi,
  updateSprintApi,
} from "../Api/SprintApiService";
import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment";

import "./SprintForm.css";

export default function SprintComponent() {
  const authContext = useAuth();
  const username = authContext.username;

  const [goal, setGoal] = useState("");
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, isStatus] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const sprintId = parseInt(id, 10);

  useEffect(() => retreiveSprint(sprintId), [sprintId]);

  function retreiveSprint(sprintId) {
    if (sprintId !== -1) {
      retreiveSprintApi(username, sprintId)
        .then((response) => {
          setSprintName(response.data.sprintName);
          setGoal(response.data.goal);
          setStartDate(response.data.startDate.split("T")[0]);
          setEndDate(response.data.endDate.split("T")[0]);
          isStatus(response.data.status);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    const sprint = {
      username: username,
      sprintName: values.sprintName,
      goal: values.goal,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status || false,
    };
    if (id == -1) {
      createSprintApi(username, sprint)
        .then(() => navigate("/sprints"))
        .catch((error) => console.log(error));
    } else {
      updateSprintApi(username, id, sprint)
        .then(() => navigate("/sprints"))
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {};
    const presentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (!values.goal || values.goal.length < 5) {
      errors.goal = "Enter at least 5 characters";
    }
    if (!values.sprintName || values.sprintName.length < 3) {
      errors.sprintName = "Enter at least 3 characters";
    }
    // New Sprint (-1) → enforce startDate >= today
    if (id == -1) {
      if (
        !values.startDate ||
        values.startDate < presentDate ||
        !moment(values.startDate).isValid()
      ) {
        errors.startDate = "Enter a valid start date (today or later)";
      }
    }
    // Update Sprint → prevent backdating
    else {
      if (values.startDate !== startDate) {
        if (
          !values.startDate ||
          values.startDate < presentDate ||
          !moment(values.startDate).isValid()
        ) {
          errors.startDate = "You cannot backdate the start date";
        }
      }
    }
    if (!moment(values.endDate).isSameOrAfter(moment(values.startDate))) {
      errors.endDate = "End date must be after start date";
    }
    return errors;
  }

  return (
    <div className="sprint-form-page">
      <div className="sprint-form-container">
        <div className="form-header">
          <h1>
            {id === "-1" ? "Create a New Sprint" : `Edit Sprint: ${sprintName}`}
          </h1>
          <p>Fill out the details below to plan your sprint.</p>
        </div>

        <Formik
          initialValues={{ goal, sprintName, startDate, endDate, status }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              {/* Sprint Name */}
              <div className="form-group">
                <label>Sprint Name</label>
                <Field
                  type="text"
                  name="sprintName"
                  className={`form-control ${
                    props.errors.sprintName ? "is-invalid" : ""
                  }`}
                  placeholder="e.g., Q4 Marketing Campaign"
                />
                <ErrorMessage
                  name="sprintName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              {/* Goal */}
              <div className="form-group">
                <label>Goal</label>
                <Field
                  as="textarea"
                  name="goal"
                  rows="3"
                  className={`form-control ${
                    props.errors.goal ? "is-invalid" : ""
                  }`}
                  placeholder="What is the main objective of this sprint?"
                />
                <ErrorMessage
                  name="goal"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              {/* Start Date */}
              <div className="form-group">
                <label>Start Date</label>
                <Field
                  type="date"
                  name="startDate"
                  className={`form-control ${
                    props.errors.startDate ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              {/* End Date */}
              <div className="form-group">
                <label>End Date</label>
                <Field
                  type="date"
                  name="endDate"
                  className={`form-control ${
                    props.errors.endDate ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              {/* Status Toggle */}
              <div className="form-group toggle-group">
                <label className="toggle-label">Status</label>
                <label className="toggle-switch">
                  <Field type="checkbox" name="status" />
                  <span className="slider"></span>
                </label>
                <span className="toggle-text">
                  {props.values.status ? "Done" : "In Progress"}
                </span>
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => navigate("/sprints")}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  Save Sprint
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
