import { Block } from './block';
import { Transaction } from './transaction.mjs';


export class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 0.2;
    }

    createGenesisBlock() {
        return new Block("01-01-2018", "Genesis block", "0");
    }

    minePendingTransactions(minerAddress) {
        let block = new Block(Date.now(), this.pendingTransactions); //in cryptocurrencies, normally miner don't get all pending transactions because there is too many of them
        block.mineBlock(this.difficulty);
        console.log("Block successfuly mined!");

        this.chain.push(block);

        //clear pending transactions and add one new transaction with reward for miner who did it :)
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalance(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const transacion of block.transactions) {
                if (transacion.fromAddress === address) {
                    balance -= transacion.amount;
                }
                if (transacion.toAddress === address) {
                    balance += transacion.amount;
                }
            }
        }
        return balance;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}