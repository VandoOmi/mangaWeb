import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCsv = '../public/datenbank/user.csv';
  private userList: Array<User> = new Array<User>;

  private async readUserList(content: string) {
    content.split("\n").forEach(e => {
      const line = e.trim().split(";");
      if(line.length === 3) {
      this.userList.push(new User(line[0],line[1],line[2]))
      }
    });
  }

  constructor() { }

  public async init(): Promise<void>
  {
    let csvServ = new CsvService();
    csvServ.init(this.userCsv);
    await this.readUserList(csvServ.getContent());
    console.log('UserService wurde initialisiert')
  }

  public async getUserById(id:string): Promise<User> {
    let idInt = parseInt(id);
    return this.userList[idInt];
  }
}

export class User {
  private id:string;
  private name:string;
  private role:string;

  constructor
  (
    id:string,
    name:string,
    role:string
  )
  {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  
  public getId() : string {
    return this.id;
  }

  
  public setId(v : string) {
    this.id = v;
  }

  public getName() : string {
    return this.name;
  }

  
  public setName(v : string) {
    this.name = v;
  }
  
  public getRole() : string {
    return this.role;
  }

  
  public setRole(v : string) {
    this.role = v;
  }
  
}
