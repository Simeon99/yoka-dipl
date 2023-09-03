package com.yoka.yokafurniture.service;

import com.yoka.yokafurniture.payload.Address.AddressDto;

import java.util.List;

public interface AddressService {

    public AddressDto createUserAddress(String jwt, AddressDto addressDto);
    public List<AddressDto> getAllAddressByUser(String jwt);
    public void deleteAddress(long addressId, String jwt);

}
