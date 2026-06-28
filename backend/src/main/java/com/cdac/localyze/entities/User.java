package com.cdac.localyze.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

//    @Enumerated(EnumType.STRING)
//    private UserRole role;

    private boolean enabled = true;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "owner")
    private List<Business> businesses;

//    @OneToMany(mappedBy = "customer")
//    private List<ServiceRequest> serviceRequests;

    @OneToMany(mappedBy = "customer")
    private List<Review> reviews;

//    @OneToMany(mappedBy = "user")
//    private List<Notification> notifications;

}