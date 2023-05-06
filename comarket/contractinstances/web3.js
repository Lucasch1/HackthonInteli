import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
    //window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        //"https://goerli.infura.io/v3/78a17f7f05514a909639bdbf9030fe7e"
        "https://polygon-mumbai.infura.io/v3/9c3bbdb114ec4352818c4af3ed7954d7"
    );
    web3 = new Web3(provider);
}

export default web3;

