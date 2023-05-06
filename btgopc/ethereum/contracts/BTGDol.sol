// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract BTGDol is ERC20, ERC20Burnable, Ownable {
    
    address public btgOpcAddr;

    ///Constroi o token com as funcionalidades padrao do openzeppelin
    constructor() ERC20("BTG DOL", "BTGUSD") {
        _mint(msg.sender, 7000000 * 10 ** decimals());
    }

    ///Funcao para mintar novos tokens
    ///@notice funcao exige gas fees (transact)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function setContractaddress( address _contractaddress) public onlyOwner {
        btgOpcAddr = _contractaddress;
    }

    ///Funcao para aprovar o contrato PartyChain a gastar um determinado numero de tokens. Como parametro pede a quantidade
    ///@notice funcao exige gas fees (transact)
    function aprovePartyChain(uint _amount) public {
        approve(btgOpcAddr, _amount);
    }
}