package com.coril.mutualfund.domain;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "movements")
public class Movement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String investorId;

    @Column(nullable = false)
    private String fundName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OperationType operationType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovementStatus status;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDate date;

    public Movement() {}

    public Movement(Long id, String investorId, String fundName,
                    OperationType operationType, MovementStatus status,
                    BigDecimal amount, LocalDate date) {
        this.id = id;
        this.investorId = investorId;
        this.fundName = fundName;
        this.operationType = operationType;
        this.status = status;
        this.amount = amount;
        this.date = date;
    }

    public Long getId() { return id; }
    public String getInvestorId() { return investorId; }
    public String getFundName() { return fundName; }
    public OperationType getOperationType() { return operationType; }
    public MovementStatus getStatus() { return status; }
    public BigDecimal getAmount() { return amount; }
    public LocalDate getDate() { return date; }

    public void setId(Long id) { this.id = id; }
    public void setInvestorId(String investorId) { this.investorId = investorId; }
    public void setFundName(String fundName) { this.fundName = fundName; }
    public void setOperationType(OperationType operationType) { this.operationType = operationType; }
    public void setStatus(MovementStatus status) { this.status = status; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public void setDate(LocalDate date) { this.date = date; }
}
