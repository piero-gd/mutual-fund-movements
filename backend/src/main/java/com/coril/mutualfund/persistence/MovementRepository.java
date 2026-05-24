package com.coril.mutualfund.persistence;

import com.coril.mutualfund.domain.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovementRepository extends JpaRepository<Movement, Long> {

    List<Movement> findByInvestorIdOrderByDateDesc(String investorId);
}
