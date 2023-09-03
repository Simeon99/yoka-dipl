package com.yoka.yokafurniture.payload.Address;

import jakarta.persistence.Column;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressDto {
    private long id;

    private String street;
    private String city;
    private String country;

}
