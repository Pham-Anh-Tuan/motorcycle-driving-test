package com.example.backend.userService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "mcQuestion")
public class McQuestion {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private String id;

    @Column(name = "questionNumber")
    private int questionNumber;

    @Column(nullable = false, length = 3000)
    private String prompt;

    private String imageName;

    @OneToMany(mappedBy = "mcQuestion", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("orderNumber ASC")
    private List<Choice> choices;

    @Column(nullable = false)
    private int answer;

    @Column(nullable = false, length = 3000)
    private String explanation;

    @Column(name = "type")
    private String type;
}
