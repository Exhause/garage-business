package ru.rsatu.dto;

import ru.rsatu.entities.Box;

public class BoxDto {
    public Long id;

    public static BoxDto fromEntity(Box box) {
        BoxDto dto = new BoxDto();
        dto.id = box.id;
        return dto;
    }
}