package ru.rsatu.dto;

public class BoxDto {
    public Long id;
    public boolean free;

    public BoxDto(Long id, boolean free) {
        this.id = id;
        this.free = free;
    }
}