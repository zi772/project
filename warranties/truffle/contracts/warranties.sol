// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;



contract WarrantyContract {
    address public owner;

    struct Warranty {
        string startDate; 
        string expiryDate; 
        string productInfo;
    }

    mapping(address => Warranty) public warranties;

    event WarrantySent(address indexed customer, string startDate, string expiryDate, string productInfo);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function sendWarranty(address _customer, string memory _startDate, string memory _expiryDate, string memory _productInfo) external onlyOwner {
        warranties[_customer] = Warranty({
            startDate: _startDate,
            expiryDate: _expiryDate,
            productInfo: _productInfo
        });
        emit WarrantySent(_customer, _startDate, _expiryDate, _productInfo);
    }

    function getWarranty(address _customer) external view returns (string memory startDate, string memory expiryDate, string memory productInfo) {
        Warranty storage warranty = warranties[_customer];
        return (warranty.startDate, warranty.expiryDate, warranty.productInfo);
    }
}