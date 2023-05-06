const address = '0xa00F42C514283176319D156D57caC10d1fBF83Bc'

const { abi } = require('../build/contracts/EvenToken.json')

const evenTokenContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default evenTokenContract;