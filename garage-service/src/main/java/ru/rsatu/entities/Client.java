package ru.rsatu.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "client")
public class Client extends PanacheEntity {

    @Column(name = "first_name", nullable = false, length = 50)
    public String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    public String lastName;

    @Column(name = "middle_name", length = 50)
    public String middleName;

    @Column(length = 50)
    public String address;
}