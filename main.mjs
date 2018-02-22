import { Block } from './block';
import { Blockchain } from './blockchain';
import { Transaction } from './transaction';

let myCoin = new Blockchain();

myCoin.createTransaction(new Transaction('franekPrivateKey', 'annaPrivateKey', 100));
myCoin.createTransaction(new Transaction('franekPrivateKey', 'tomPrivateKey', 5));
myCoin.createTransaction(new Transaction('annaPrivateKey', 'tomPrivateKey', 10));

console.log('Mining started...');

myCoin.minePendingTransactions('pt');

console.log(`Balance of miner pt: ${myCoin.getBalance('pt')}`);

myCoin.minePendingTransactions('pt');

console.log(`Balance of miner pt: ${myCoin.getBalance('pt')}`);

console.log(JSON.stringify(myCoin.chain));