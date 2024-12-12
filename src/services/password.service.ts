import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import { User, UserService } from './user.service';
import { CsvService } from './csv.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordCsv = '../public/datenbank/password.csv'; // Speicherort der Datenbank
  private algorithm = 'aes-256-cbc'; // Verschlüsselungsalgorithmus
  private key: Buffer = crypto.randomBytes(32); // 256-bit Schlüssel
  private iv: Buffer = crypto.randomBytes(16); // Initialisierungsvektor
  private passwordList: Array<String> = [];

  constructor() { }

  public async init() {
    let csvServ: CsvService = new CsvService();
    csvServ.init(this.passwordCsv);
    this.passwordList = csvServ.getContent().split("\n");
  }

  private decryptPassword(encryptedPassword: string): string {
    const [ivBase64, encryptedText] = encryptedPassword.split(':');
    if (!ivBase64 || !encryptedText) {
        throw new Error('Invalid encrypted password format');
    }

    const ivBuffer = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, ivBuffer);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  
  private encryptPassword(password: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(password, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return `${this.iv.toString('base64')}:${encrypted}`;
  }

  private findUserPassword(user:User): string {
    let position: number = this.hashUser(user);
    return this.passwordList[position].trim().split(';')[0];
  }

  private setUserPassword(user:User,password: string) {
    let position: number = this.hashUser(user);
    this.passwordList[position] = password;
  }

  updatePassword() {
    
  }

  private hashUser(user:User) {
    let idInt = parseInt(user.getId());
    let name: number = 0; 
    user.getName().split('').forEach(e => {
      name += e.charCodeAt(0)
    });
    let role: number = 0
    user.getRole().split('').forEach(e => {
      role += e.charCodeAt(0)
    });
    return idInt+name+role;
  }
}
