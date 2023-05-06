// SPDX-License-Identifier: MIT
pragma solidity^0.8.1;



contract btgDol {
    struct opcDol {
            uint strike;
    }
}

//eh um contrato onde voce emite um direito de compra ou venda que pode ser adiquirido por alguem
// ao ser vendido para alguem o comprador tem o direito de comprar as suas acoes ou produto no preço acordado
// Exemplo: vendo uma opção que da ao comprador o direito de comprar meus dolares a 5 reais com o vencimento para o mes que vem
// se na data de vencimento o dolar estiver valendo 5.5 o comprador da opc pode executar seu direito de compra e comprar meus dolares por 5 reais
// isso fara com que ele lucre 0.5 dolares por opcao adiquirida, se o preço do dolar for menor que 5 reais no caso de uma opcao de compra essa opcao vira po
// pois nao faria sentido comprar o dolar a 5 reais sendo que ele vale 4.50 por exemplo