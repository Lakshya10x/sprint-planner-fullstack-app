package com.sprintplanner.sprint_planner_backend.sprint;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;


//@Service
public class SprintService {

    private static List<Sprint> sprints = new ArrayList<>();

    //    private static int sprintCount =sprints.size();
    static {
        sprints.add(new Sprint(1, "ram", "Hamburger-Menu", "Reflects the Sprint-Planner application's functionalities and sub-functionalities under the hood", LocalDate.now().plusDays(2), LocalDate.now().plusMonths(1), false));
        sprints.add(new Sprint(2, "ram", "Dynamic Design", "Upgrade the website's design dynamically", LocalDate.now().plusDays(10), LocalDate.now().plusMonths(1), false));
        sprints.add(new Sprint(3, "radha", "Dynamic Design", "Upgrade the website's design dynamically", LocalDate.now().plusDays(10), LocalDate.now().plusMonths(1), false));
        sprints.add(new Sprint(4, "ram", "Hamburger-Menu-1", "Reflects the Sprint-Planner application's functionalities and sub-functionalities under the hood", LocalDate.now().plusDays(2), LocalDate.now().plusMonths(1), false));
        sprints.add(new Sprint(5, "ram", "Dynamic Design-2", "Upgrade the website's design dynamically", LocalDate.now().plusDays(10), LocalDate.now().plusMonths(1), false));
    }

    public Sprint addSprint(String username, String sprintName, String goal, LocalDate startDate, LocalDate endDate, boolean status) {
        int newId = sprints.stream()
                .mapToInt(Sprint::getId)
                .max()
                .orElse(0) + 1;
        Sprint sprint = new Sprint(newId, username, sprintName, goal, startDate, endDate, status);
        sprints.add(sprint);
        return sprint;
    }

    public List<Sprint> findByUsername(String username) {
        Predicate<? super Sprint> predicate = s -> s.getUsername().equalsIgnoreCase(username);
        return sprints.stream().filter(predicate).toList();
    }

    public void deleteById(int id) {

        Predicate<? super Sprint> predicate = s -> s.getId() == id;
        sprints.removeIf(predicate);

    }


    public Sprint findById(int id) {

        Predicate<? super Sprint> predicate = s -> s.getId() == id;
        return sprints.stream().filter(predicate).findFirst()
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
    }
    // Approach 1: Delete and Add
    // Approach 2: Find and Update
    public void updateSprint(@Valid Sprint updatedSprint) {
//        sprints.removeIf(sprint -> sprint.getId().equals(updatedSprint.getId()));
//        sprints.add(updatedSprint);


//        for (int i = 0; i < sprints.size(); i++) {
//            if (sprints.get(i).getId() == updatedSprint.getId()) {
//                sprints.set(i, updatedSprint);
//            }
//
//            for (Sprint s : sprints) {
//                if (s.getId() == updatedSprint.getId()) {
//                    s.setUsername(updatedSprint.getUsername());
//                    s.setSprintName(updatedSprint.getSprintName());
//                    s.setGoal(updatedSprint.getGoal());
//                    s.setStartDate(updatedSprint.getStartDate());
//                    s.setEndDate(updatedSprint.getEndDate());
//                    s.setStatus(updatedSprint.isStatus());
//                    break;
//                }
//            }

            // With Streams (More Functional)
            Sprint finalSprint = sprints.stream()
                    .filter(s -> s.getId().equals(updatedSprint.getId()))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("Sprint with ID - " + updatedSprint.getId() + "not found"));


                finalSprint.setUsername(updatedSprint.getUsername());
                finalSprint.setSprintName(updatedSprint.getSprintName());
                finalSprint.setGoal(updatedSprint.getGoal());
                finalSprint.setStartDate(updatedSprint.getStartDate());
                finalSprint.setEndDate(updatedSprint.getEndDate());
                finalSprint.setStatus(updatedSprint.isStatus());
    }

}


