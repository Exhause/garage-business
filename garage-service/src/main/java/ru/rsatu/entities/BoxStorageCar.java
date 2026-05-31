package ru.rsatu.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "box_storage_car")
public class BoxStorageCar extends PanacheEntityBase {

    @EmbeddedId
    public BoxStorageCarId id = new BoxStorageCarId();

    @MapsId("boxId")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "box_id")
    public Box box;

    @MapsId("carId")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    public Car car;

    @Column(name = "receipt_number", nullable = false, length = 20)
    public String receiptNumber;

    @Column(name = "start_date", nullable = false)
    public LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    public LocalDate endDate;

    @Column(name = "price_per_day", nullable = false, precision = 10, scale = 2)
    public BigDecimal pricePerDay;
}