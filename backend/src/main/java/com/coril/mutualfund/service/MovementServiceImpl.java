package com.coril.mutualfund.service;

import com.coril.mutualfund.domain.Movement;
import com.coril.mutualfund.dto.MovementResponse;
import com.coril.mutualfund.persistence.MovementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MovementServiceImpl implements MovementService {

    private final MovementRepository movementRepository;

    public MovementServiceImpl(MovementRepository movementRepository) {
        this.movementRepository = movementRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovementResponse> getMovementsByInvestorId(String investorId) {
        return movementRepository.findByInvestorIdOrderByDateDesc(investorId)
                .stream()
                .map(MovementServiceImpl::toResponse)
                .toList();
    }

    private static MovementResponse toResponse(Movement movement) {
        return new MovementResponse(
                movement.getId(),
                movement.getFundName(),
                movement.getOperationType(),
                movement.getStatus(),
                movement.getAmount(),
                movement.getDate()
        );
    }
}
