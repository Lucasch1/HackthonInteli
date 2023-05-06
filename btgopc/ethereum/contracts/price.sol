// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address sepolia: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     * Address mainet: 0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419
     * Address mumbai: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );
    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
}