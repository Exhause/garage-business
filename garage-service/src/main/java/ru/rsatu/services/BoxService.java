package ru.rsatu.services;

import jakarta.ws.rs.NotFoundException;
import ru.rsatu.dto.BoxDto;
import ru.rsatu.entities.*;

import jakarta.transaction.Transactional;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class BoxService {

    @Transactional
    public void addBox() {
        Box box = new Box();
        box.persist();
    }

    @Transactional
    public void deleteBox(Long boxId) {
        Box box = Box.findById(boxId);
        if (box == null) throw new NotFoundException("Бокс не найден");
        // проверяем, что бокс пуст
        BoxStorageCar rent = BoxStorageCar.find("box", box).firstResult();
        if (rent != null) throw new IllegalStateException("Бокс занят, нельзя закрыть");
        box.delete();
    }

    public List<BoxDto> getAllBoxes() {
        return Box.getEntityManager().createQuery(
                "SELECT NEW ru.rsatu.dto.BoxDto(b.id, " +
                        "NOT EXISTS (SELECT 1 FROM BoxStorageCar bsc WHERE bsc.box.id = b.id)) " +
                        "FROM Box b", BoxDto.class
        ).getResultList();
    }
}