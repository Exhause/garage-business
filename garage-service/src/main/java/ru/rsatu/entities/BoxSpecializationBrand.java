package ru.rsatu.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "box_specialization_brand")
public class BoxSpecializationBrand extends PanacheEntityBase {

    @EmbeddedId
    public BoxSpecializationBrandId id = new BoxSpecializationBrandId();

    @MapsId("boxId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "box_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Box box;

    @MapsId("brandId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Brand brand;
}