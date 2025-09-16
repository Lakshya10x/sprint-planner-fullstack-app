package com.sprintplanner.sprint_planner_backend.sprint;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sprints")
public class SprintController {

    @Autowired
    private SprintRepository sprintRepo;

    @GetMapping(path="/basicAuth")
    public String basicAuthCheck()
    {
        return "Success";
    }

    @GetMapping("/{username}")
    public List<Sprint> retreiveSprints(@PathVariable String username)
    {
        List<Sprint> list = sprintRepo.findByUsername(username);
        return list;
    }

    @GetMapping("/{username}/sprint/{id}")
    public Sprint retreiveSpecificSprint(@PathVariable String username, @PathVariable int id)
    {
        return sprintRepo.findById(id).get();
    }

    @DeleteMapping("/{username}/deleteSprint/{id}")
    public ResponseEntity<Void> removeSpecificSprint(@PathVariable String username, @PathVariable int id)
    {
        sprintRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{username}/sprint")
    public Sprint createSprint(@PathVariable String username, @RequestBody Sprint sprint)
    {
        sprint.setUsername(username);
        return sprintRepo.save(sprint);
    }

    @PutMapping("/{username}/sprint/{id}")
    public ResponseEntity<Sprint> updateSprint(@PathVariable String username, @PathVariable int id, @RequestBody Sprint updatedSprint)
    {
        return sprintRepo.findById(id)
                .map(existingSprint -> {
                    existingSprint.setUsername(username);
                    existingSprint.setSprintName(updatedSprint.getSprintName());
                    existingSprint.setGoal(updatedSprint.getGoal());

                    if(!updatedSprint.getStartDate().equals(existingSprint.getStartDate()))
                    {
                        if(updatedSprint.getStartDate().isBefore(LocalDate.now()))
                        {
                            throw new IllegalArgumentException("Start date cannot be in past for the updating");
                        }
                        existingSprint.setStartDate(updatedSprint.getStartDate());
                    }

                    existingSprint.setEndDate(updatedSprint.getEndDate());
                    existingSprint.setStatus(updatedSprint.isStatus());

                    Sprint finalSprint = sprintRepo.save(existingSprint);
                    return ResponseEntity.ok(finalSprint);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
