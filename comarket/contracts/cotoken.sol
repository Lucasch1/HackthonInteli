// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract deployCotoken {
    address[] public deployedCons;

    function createCotoken(uint minimum) public {
        address newCotoken  = new cotoken(minimum, msg.sender);
        deployedCons.push(newCotoken);
    }

    function getDeployedCotoken() public view returns (address[]) {
        return deployedCons;
    }
}

contract cotoken is ERC20, ERC20Burnable, Ownable {
    
    mapping(uint256 => uint256) public valorToken;
    ///Cria variavel para armazenar o enderco atual do contrato cotoken
    address public cotokenAddr;
    
    ///Constroi o token com as funcionalidades padrao do openzeppelin
    constructor(
        string memory _nome,
        string memory _symbol,
        //string memory _tipo,
        //string memory _unidadeDeMedida,
        uint256 _supply,
        uint256 _valor
    
    ) ERC20(_nome, _symbol) {
        _mint(msg.sender, _supply * 10 ** decimals());
        valorToken[totalSupply()] = _valor;
        return address(this);
    }

    ///Funcao para mintar novos tokens
    ///@notice funcao exige gas fees (transact)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    ///Funcao para salvar em uma variavel o endereco do cotoken. Como parametro pede o endereco do contrato
    ///@notice funcao exige gas fees (transact)
    function setContractaddress( address _contractaddress) public onlyOwner {
        cotokenAddr = _contractaddress;
    }

    ///Funcao para aprovar o contrato cotoken a gastar um determinado numero de tokens. Como parametro pede a quantidade
    ///@notice funcao exige gas fees (transact)
    function aprovePartyChain(uint _amount) public {
        approve(cotokenAddr, _amount);
    }
}