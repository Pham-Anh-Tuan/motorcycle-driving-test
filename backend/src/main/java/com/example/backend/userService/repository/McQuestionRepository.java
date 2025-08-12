package com.example.backend.userService.repository;

import com.example.backend.userService.model.McQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface McQuestionRepository extends JpaRepository<McQuestion, String> {
    @Query("""
        SELECT m FROM McQuestion m
        WHERE 
            CAST(m.questionNumber AS string) LIKE %:keyword%
            OR LOWER(m.prompt) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(m.type) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<McQuestion> searchAllFields(@Param("keyword") String keyword, Pageable pageable);

    Page<McQuestion> findAllByOrderByQuestionNumberAsc(Pageable pageable);

    @Query("SELECT MAX(q.questionNumber) FROM McQuestion q")
    Integer findMaxQuestionNumber();
}
