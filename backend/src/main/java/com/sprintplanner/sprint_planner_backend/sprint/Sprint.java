package com.sprintplanner.sprint_planner_backend.sprint;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name = "sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

//    @NotNull
    @Column(name = "name")
    @NotBlank
    private String username;

    @Size(min = 1,max = 100,message = "Sprint Name must be between 1 and 100 characters")
    @NotBlank
    private String sprintName;

    @Size(max = 255, message = "Goal must not exceed 255 characters")
    private String goal;

    @NotNull(message = "Date must not be null")
//    @FutureOrPresent(message = "Date must be in the present or in future")
    private LocalDate startDate;

    @NotNull(message = "Date must not be null")
    @FutureOrPresent(message = "Date must be in the present or in future")
    private LocalDate endDate;

    private boolean status;

    @Transient
    private int displayId;

    public int getDisplayId() {
        return displayId;
    }

    public void setDisplayId(int displayId) {
        this.displayId = displayId;
    }


    /** Default Initialization: The no-args constructor creates an instance of the Sprint class with all fields set to their default values

     Without a no-args constructor, JPA would throw an error during entity instantiation, as it relies on this constructor to create objects before mapping database values to fields.
     It provides a way to create objects in scenarios where immediate initialization of all fields isn’t required or possible.

        Form Input or Builder Pattern: In applications (e.g., a web app), you might create a Sprint object without initial values and set them later based on user input or other logic.
    **/
     public Sprint() {
    }

    public Sprint(Integer id, String username, String sprintName, String goal, LocalDate startDate, LocalDate endDate, boolean status) {
        this.id = id;
        this.username = username;
        this.sprintName = sprintName;
        this.goal = goal;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Sprint{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", sprintName='" + sprintName + '\'' +
                ", goal='" + goal + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSprintName() {
        return sprintName;
    }

    public void setSprintName(String sprintName) {
        this.sprintName = sprintName;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    // Custom Validation to ensure endDate is not before startDate

    @AssertTrue(message = "End date must not be earlier than the start date")
    public boolean isEndDateAfterStartDate()
    {
        return !endDate.isBefore(startDate);
    }

}
