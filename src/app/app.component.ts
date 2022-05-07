import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { clusterApiUrl, LAMPORTS_PER_SOL, Connection,Keypair,sendAndConfirmTransaction,SystemProgram,Transaction, TransactionInstruction, NONCE_ACCOUNT_LENGTH, PublicKey } from '@solana/web3.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-3';

  connection: Connection;
  keyPair:Keypair;
  conected:boolean = false;
  constructor(){
    this.connection = new Connection(
      clusterApiUrl('testnet'),
      'confirmed',
    );
      this.keyPair = Keypair.generate();
      console.log("Public Key:", this.keyPair.publicKey.toString());
      console.log("Secret Key:",this.keyPair.secretKey);
  }



async firstBlock():Promise<any>  {
  this.conected = true;
}

public async setAirDrop(){
  
  let airdropSignature = await this.connection.requestAirdrop(
    this.keyPair.publicKey,
      1000000000,
  );
  let hash = await this.connection.confirmTransaction(airdropSignature);
  console.log('hash'+ hash);
  this.transfer();
}

public async transfer() {
  let toAccount = Keypair.generate();


  // Create Simple Transaction
  let transaction =  new Transaction();
  
  let minimumAmountForNonceAccount = await this.connection.getMinimumBalanceForRentExemption(
    NONCE_ACCOUNT_LENGTH,
  );
  // Add an instruction to execute
  let pubkey: PublicKey = new PublicKey("4h1XibqK9GeymWxAFeDB97ByGcidCjgvNDjfbz6v44DX");

  let transactionInstruction : TransactionInstruction = SystemProgram.transfer({
    fromPubkey: this.keyPair.publicKey,
    toPubkey: pubkey,
    lamports: 69696969,
  });
  transaction.add(transactionInstruction);

  
  // Send and confirm transaction
  // Note: feePayer is by default the first signer, or payer, if the parameter is not set
  let result = await sendAndConfirmTransaction(this.connection, transaction, [this.keyPair]);
  alert("Transferencia realizada, troyando entrando...");
}
}
