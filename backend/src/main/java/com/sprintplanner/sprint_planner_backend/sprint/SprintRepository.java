package com.sprintplanner.sprint_planner_backend.sprint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint,Integer> {
    List<Sprint> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("DELETE FROM Sprint s WHERE s.username = :username")
    int deleteByUsername(@Param("username") String username);

//    default int safeDeleteByUsername(String username)
//    {
//            if(username == null)
//            {
//                throw new IllegalArgumentException("Username cannot be null");
//            }
//            return deleteByUsername(username);
//    }
}
