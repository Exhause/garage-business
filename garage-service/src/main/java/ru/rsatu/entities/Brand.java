package ru.rsatu.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "brand")
public class Brand extends PanacheEntity {

    @Column(name = "name", nullable = false, unique = true, length = 50)
    public String name;
}