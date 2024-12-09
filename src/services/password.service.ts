import { Injectable } from '@angular/core';
import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  algorithm = 'aes-256-cbc'; // Verschlüsselungsalgorithmus
  key: Buffer; // 256-bit Schlüssel
  iv: Buffer; // Initialisierungsvektor

  constructor() {
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
}
