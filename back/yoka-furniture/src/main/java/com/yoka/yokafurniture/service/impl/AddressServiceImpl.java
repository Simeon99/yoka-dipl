package com.yoka.yokafurniture.service.impl;

import com.yoka.yokafurniture.entity.Address;
import com.yoka.yokafurniture.entity.User;
import com.yoka.yokafurniture.exception.ResourceNotFoundException;
import com.yoka.yokafurniture.payload.Address.AddressDto;
import com.yoka.yokafurniture.repository.AddressRepository;
import com.yoka.yokafurniture.repository.UserRepository;
import com.yoka.yokafurniture.security.JwtTokenProvider;
import com.yoka.yokafurniture.service.AddressService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    private AddressRepository addressRepository;

    private UserRepository userRepository;

    private ModelMapper mapper;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Value("${app.jwt-secret}")
    private String jwrSecret;


    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository, ModelMapper mapper) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Override
    public AddressDto createUserAddress(String jwt, AddressDto addressDto) {

        Address address = mapToEntity(addressDto);

        System.out.println(jwt.replace("Bearer ", ""));

        String username = tokenProvider.getUsernameFromJwt(jwt.replace("Bearer ", ""));

        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() ->
                new UsernameNotFoundException("User not found with username or email:" + username));

        user.addAddress(address);

        AddressDto addressResponse = mapToDto(addressRepository.save(address));

        return addressResponse;
    }

    @Override
    public List<AddressDto> getAllAddressByUser(String jwt) {

        String username = tokenProvider.getUsernameFromJwt(jwt.replace("Bearer ", ""));

        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() ->
                new UsernameNotFoundException("User not found with username or email:" + username));

        Set<Address> addresses = user.getAddresses();

        return addresses.stream().map((address -> mapToDto(address))).collect(Collectors.toList());
    }

    @Override
    public void deleteAddress(long addressId, String jwt) {
        Address address = addressRepository.findById(addressId).orElseThrow(() ->
                new ResourceNotFoundException("Address", "id", addressId));

        String username = tokenProvider.getUsernameFromJwt(jwt.replace("Bearer ", ""));

        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() ->
                new UsernameNotFoundException("User not found with username or email:" + username));

        user.getAddresses().remove(address);

        addressRepository.delete(address);
    }

    private AddressDto mapToDto(Address address){

        AddressDto addressDto = mapper.map(address, AddressDto.class);

        return addressDto;
    }
    private Address mapToEntity(AddressDto addressDto){

        Address address = mapper.map(addressDto, Address.class);

        return address;

    }

}
