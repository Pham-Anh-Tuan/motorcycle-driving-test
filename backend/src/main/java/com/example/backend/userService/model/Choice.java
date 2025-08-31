package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "choice")
public class Choice {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(nullable = false)
    private int orderNumber;

    @Column(nullable = false, length = 3000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "choiceId", nullable = false)
    private McQuestion mcQuestion;
}
