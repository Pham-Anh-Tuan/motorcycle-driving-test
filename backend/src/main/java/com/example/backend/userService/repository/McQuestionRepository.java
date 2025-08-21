package com.example.backend.userService.repository;

import com.example.backend.userService.model.McQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    Page<McQuestion> findAllByIsCriticalOrderByQuestionNumberAsc(boolean isCritical, Pageable pageable);

    @Query("SELECT MAX(q.questionNumber) FROM McQuestion q")
    Integer findMaxQuestionNumber();

    @Query(value = """
        SELECT * FROM mc_question 
        WHERE type = :type 
          AND (:critical IS NULL OR is_critical = :critical)
        ORDER BY RAND()
        """,
            nativeQuery = true)
    List<McQuestion> findRandomByTypeAndCritical(
            @Param("type") String type,
            @Param("critical") Boolean critical,
            Pageable pageable
    );

    @Query(value = """
        SELECT * FROM mc_question 
        WHERE (:critical IS NULL OR is_critical = :critical)
        ORDER BY RAND()
        """,
            nativeQuery = true)
    List<McQuestion> findRandomByCritical(
            @Param("critical") Boolean critical,
            Pageable pageable
    );

    List<McQuestion> findAllByTypeOrderByQuestionNumberAsc(String type);
}
