// SPDX-License-Identifier: MIT
pragma solidity^0.8.1;


//interface interfaceBTGDol {
//    function balanceOf(address _address) external view returns(uint);
//    function transferFrom(address from, address to, uint price) external;
//}


import "./BTGDol.sol";

contract btgOpc {

    //address private btgdolAddr = 0x41b4eb8323e97C814f4A0aee07e2C8f226291e81;

    BTGDol public btgDol;

    struct opcDol {
            uint strike; // eth em dolar
            uint dataVencimento;
            uint valorCobertura;// numero de eths
            uint emissionPrice;// acho que nao precisa
            uint actualPrice; //acho q nao precisa
            string description;
            bool valid;
            address emissor;
            address buyer;
    }
    
    opcDol public opc;

    constructor (uint _strike, uint _date, uint _prizePrice, string memory _description, uint _value) payable {
        require(btgDol.balanceOf(msg.sender) >= _value, "You should have on wallet the same ammout of BTGDol on wallet as you want to cover on your option");
        btgDol.transferFrom(msg.sender, address(this), _value);

        opc = opcDol ({
            strike: _strike,
            dataVencimento: _date,
            valorCobertura: _value,
            emissionPrice: _prizePrice,
            actualPrice: _prizePrice,
            description: _description,
            valid: true,
            emissor: msg.sender,
            buyer: msg.sender
        });
    }

    function buyOpc(uint _price) public payable {
        require(btgDol.balanceOf(msg.sender) >= _price, "You dont't have enought tokens to buy this option");
        require(_price >= opc.actualPrice, "The price you are ofering is lower than the Prize Price...");
        btgDol.transferFrom(msg.sender, opc.emissor, _price);
        opc.buyer = msg.sender;
    }

    function executeOpc() public payable {
        require(msg.sender == opc.buyer, "Only the owner of the option can execute it");
        require(btgDol.balanceOf(msg.sender) >= opc.strike, "You don't have enought tokens to make the transaction"); // se a btgUsd criar uma funcao de convesao automatica essa condicao pode ser ignorada
        btgDol.transferFrom(msg.sender, opc.emissor, opc.strike);
        payable(msg.sender).transfer(address(this).balance);
    }

}

//eh um contrato onde voce emite um direito de compra ou venda que pode ser adiquirido por alguem
// ao ser vendido para alguem o comprador tem o direito de comprar as suas acoes ou produto no preço acordado
// Exemplo: vendo uma opção que da ao comprador o direito de comprar meus dolares a 5 reais com o vencimento para o mes que vem
// se na data de vencimento o dolar estiver valendo 5.5 o comprador da opc pode executar seu direito de compra e comprar meus dolares por 5 reais
// isso fara com que ele lucre 0.5 dolares por opcao adiquirida, se o preço do dolar for menor que 5 reais no caso de uma opcao de compra essa opcao vira po
// pois nao faria sentido comprar o dolar a 5 reais sendo que ele vale 4.50 por exemplo


// Criar uma opcao de dolar utilizando o btgDol
// Fazer com que uma opcao equivalha a um preço de forma que o btgDol fique travado no contrato e seja emitido um token de wrapped BTGDol
// O btgDol vai ser enviado ao dono da opcao a um determinado preço e ele podera vender ou não no preço de mercado
// A principio a opcao de dolar deve ser um struct que vai ser adcionado a uma lista de opçoes, vc pode emitir uma opção ou comprar uma que esteja a venda