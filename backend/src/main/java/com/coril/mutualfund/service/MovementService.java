package com.coril.mutualfund.service;

import com.coril.mutualfund.dto.MovementResponse;

import java.util.List;

public interface MovementService {

    List<MovementResponse> getMovementsByInvestorId(String investorId);
}
