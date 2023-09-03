package com.yoka.yokafurniture.controller;

import com.yoka.yokafurniture.payload.Address.AddressDto;
import com.yoka.yokafurniture.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private AddressService addressService;


    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PreAuthorize("hasRole('USER')")
    @CrossOrigin
    @PostMapping()
    public ResponseEntity<AddressDto> createUserAddress(@RequestHeader (name="Authorization") String jwt, @RequestBody AddressDto addressDto){
        return new ResponseEntity<>(addressService.createUserAddress(jwt, addressDto), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER')")
    @CrossOrigin
    @GetMapping()
    public ResponseEntity<List<AddressDto>> getAllAddressByUser(@RequestHeader (name="Authorization") String jwt){
        return new ResponseEntity<>(addressService.getAllAddressByUser(jwt), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER')")
    @CrossOrigin
    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress( @PathVariable long addressId, @RequestHeader (name="Authorization") String jwt){
        addressService.deleteAddress(addressId, jwt);
        return new ResponseEntity<>("Address deleted successfully.", HttpStatus.OK);
    }

}
