import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { clusterApiUrl, LAMPORTS_PER_SOL, Connection,Keypair,sendAndConfirmTransaction,SystemProgram,Transaction, TransactionInstruction } from '@solana/web3.js';

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
      clusterApiUrl('devnet'),
      'confirmed',
    );
      this.keyPair = Keypair.generate();
      console.log("Public Key:", this.keyPair.publicKey.toString());
      console.log("Secret Key:",this.keyPair.secretKey);
  }



async firstBlock():Promise<any>  {
  alert("Troyano de tpm")
  this.conected = true;
}

public async setAirDrop(){
  
  let airdropSignature = await this.connection.requestAirdrop(
    this.keyPair.publicKey,
      10000000000,
  );
  await this.connection.confirmTransaction(airdropSignature);
  this.transfer();
}

public async transfer() {
  let toAccount = Keypair.generate();


  // Create Simple Transaction
  let transaction =  new Transaction();
  
  // Add an instruction to execute

  let transactionInstruction : TransactionInstruction = SystemProgram.transfer({
    fromPubkey: this.keyPair.publicKey,
    toPubkey: toAccount.publicKey,
    lamports: LAMPORTS_PER_SOL,
  });
  transaction.add(transactionInstruction);
  
  // Send and confirm transaction
  // Note: feePayer is by default the first signer, or payer, if the parameter is not set
  await sendAndConfirmTransaction(this.connection, transaction, [this.keyPair]);
  alert("Transferencia realizada, troyando entrando...");
}
}
