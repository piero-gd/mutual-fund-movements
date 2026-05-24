package com.coril.mutualfund.controller;

import com.coril.mutualfund.dto.MovementResponse;
import com.coril.mutualfund.service.MovementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/investors")
public class MovementController {

    private final MovementService movementService;

    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @GetMapping("/{investorId}/movements")
    public ResponseEntity<List<MovementResponse>> getMovements(
            @PathVariable String investorId) {
        return ResponseEntity.ok(movementService.getMovementsByInvestorId(investorId));
    }
}
