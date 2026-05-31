package ru.rsatu.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "car")
public class Car extends PanacheEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "client_id")
    public Client client;

    @ManyToOne(optional = false)
    @JoinColumn(name = "brand_id")
    public Brand brand;
}