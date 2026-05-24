package com.coril.mutualfund.service;

import com.coril.mutualfund.domain.Movement;
import com.coril.mutualfund.domain.MovementStatus;
import com.coril.mutualfund.domain.OperationType;
import com.coril.mutualfund.dto.MovementResponse;
import com.coril.mutualfund.persistence.MovementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MovementServiceImplTest {

    @Mock
    private MovementRepository movementRepository;

    @InjectMocks
    private MovementServiceImpl movementService;

    @Test
    void getMovementsByInvestorId_returnsMappedDtos_whenMovementsExist() {
        // given
        Movement movement = new Movement(
                1L, "INV-001", "Fondo Conservador Soles",
                OperationType.SUBSCRIPTION, MovementStatus.COMPLETED,
                new BigDecimal("5000.00"), LocalDate.of(2025, 5, 1)
        );
        when(movementRepository.findByInvestorIdOrderByDateDesc("INV-001"))
                .thenReturn(List.of(movement));

        // when
        List<MovementResponse> result = movementService.getMovementsByInvestorId("INV-001");

        // then
        assertThat(result).hasSize(1);
        MovementResponse response = result.get(0);
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.fundName()).isEqualTo("Fondo Conservador Soles");
        assertThat(response.operationType()).isEqualTo(OperationType.SUBSCRIPTION);
        assertThat(response.status()).isEqualTo(MovementStatus.COMPLETED);
        assertThat(response.amount()).isEqualByComparingTo(new BigDecimal("5000.00"));
        assertThat(response.date()).isEqualTo(LocalDate.of(2025, 5, 1));
    }

    @Test
    void getMovementsByInvestorId_returnsEmptyList_whenNoMovementsFound() {
        // given
        when(movementRepository.findByInvestorIdOrderByDateDesc("INV-999"))
                .thenReturn(List.of());

        // when
        List<MovementResponse> result = movementService.getMovementsByInvestorId("INV-999");

        // then
        assertThat(result).isEmpty();
    }
}
