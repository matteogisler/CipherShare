// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ACLRegistry {
    mapping(bytes32 => mapping(address => bool)) public canAccess;

    event AccessGranted(bytes32 indexed fileId, address indexed grantee);

    function grantAccess(bytes32 fileId, address grantee) external {
        canAccess[fileId][grantee] = true;
        emit AccessGranted(fileId, grantee);
    }

    function checkAccess(bytes32 fileId, address user) external view returns (bool) {
        return canAccess[fileId][user];
    }
}
