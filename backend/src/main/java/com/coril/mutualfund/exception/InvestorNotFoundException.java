package com.coril.mutualfund.exception;

public class InvestorNotFoundException extends RuntimeException {

    public InvestorNotFoundException(String investorId) {
        super("Investor not found with id: " + investorId);
    }
}
