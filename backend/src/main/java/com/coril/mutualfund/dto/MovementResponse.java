package com.coril.mutualfund.dto;

import com.coril.mutualfund.domain.MovementStatus;
import com.coril.mutualfund.domain.OperationType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MovementResponse(
        Long id,
        String fundName,
        OperationType operationType,
        MovementStatus status,
        BigDecimal amount,
        LocalDate date
) {}
