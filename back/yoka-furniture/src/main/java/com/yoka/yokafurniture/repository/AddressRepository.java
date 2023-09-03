package com.yoka.yokafurniture.repository;

import com.yoka.yokafurniture.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
