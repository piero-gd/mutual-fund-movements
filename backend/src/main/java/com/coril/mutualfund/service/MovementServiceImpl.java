package com.coril.mutualfund.service;

import com.coril.mutualfund.dto.MovementResponse;
import com.coril.mutualfund.persistence.MovementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovementServiceImpl implements MovementService {

    private final MovementRepository movementRepository;

    public MovementServiceImpl(MovementRepository movementRepository) {
        this.movementRepository = movementRepository;
    }

    @Override
    public List<MovementResponse> getMovementsByInvestorId(String investorId) {
        // TODO: implementar lógica de negocio
        return List.of();
    }
}
