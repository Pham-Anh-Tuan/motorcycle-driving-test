package com.example.backend.userService.repository;
import com.example.backend.userService.model.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository  extends JpaRepository<News, String> {
    List<News> findAllByOrderByCreatedAtDesc();

    Page<News> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT n FROM News n " +
            "WHERE LOWER(n.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR CAST(n.createdAt AS string) LIKE CONCAT('%', :keyword, '%')")
    Page<News> search(@Param("keyword") String keyword, Pageable pageable);
}
