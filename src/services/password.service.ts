import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import { User, UserService } from './user.service';
import { CsvService } from './csv.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  static userCsv = '../public/datenbank/password.csv'; // Speicherort der Datenbank
  algorithm = 'aes-256-cbc'; // Verschlüsselungsalgorithmus
  key: Buffer; // 256-bit Schlüssel
  iv: Buffer; // Initialisierungsvektor
  content: string;

  constructor(csvServ: CsvService) {
    csvServ.init(UserService.userCsv);
    this.content = csvServ.getContent();
    this.algorithm = 'aes-256-cbc';
    this.key = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
  }

  decryptPassword(encryptedPassword: string): string {
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

  
  encryptPassword(password: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(password, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return `${this.iv.toString('base64')}:${encrypted}`;
  }

  findUserpassword(user:User): string {
    let position: number = this.hashUser(user);
    return this.content.split("\n")[position].trim().split(';')[0];
  }

  hashUser(user:User) {
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
