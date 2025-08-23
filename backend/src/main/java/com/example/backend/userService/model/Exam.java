package com.example.backend.userService.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "exam")
public class Exam {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(name = "exam_number")
    private int examNumber;

    @Column(name = "time_left")
    private Long timeLeftInSeconds;
}
