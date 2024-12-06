import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static userCsv = '../public/datenbank/user.csv';
  content: string;

  constructor(csvServ: CsvService)
  { 
    csvServ.init(UserService.userCsv);
    this.content = csvServ.getContent();
  }

  async readUserList(): Promise<Array<User>> {
    const lines = this.content.split("\n");
    let userList: Array<User> = new Array<User>;

    lines.forEach(e => {
      const line = e.trim().split(";");
      if(line.length === 4) {
      userList.push(new User(line[0],line[1],line[2],line[3]))
      }
    });

    return userList;
  }
}

export class User {
  private id:string;
  private name:string;
  private password:string;
  private role:string;

  constructor
  (
    id:string,
    name:string,
    password:string,
    role:string
  )
  {
    this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;

    
  }
}
