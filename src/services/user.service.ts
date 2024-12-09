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
      if(line.length === 3) {
      userList.push(new User(line[0],line[1],line[2]))
      }
    });

    return userList;
  }

  async getUserById(id:string): Promise<User> {
    let idInt = parseInt(id);
    const lines = this.content.split("\n");
    let userLine = lines[idInt];
    /*let name:number; 
    userLine.split(';')[1].split('').forEach(e => {
      name += e.charCodeAt(0)
    });
    let role: number
    userLine.split(';')[2].split('').forEach(e => {
      role += e.charCodeAt(0)
    });*/
    return new User(userLine[0],userLine[1],userLine[2]);


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
}
