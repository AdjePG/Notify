export default class User {
  id: number;
  username: string
  name: string;
  surname: string;
  mail: string;
  pass: string;

  constructor(
    id: number = 0, 
    username: string = "", 
    name: string = "", 
    surname: string = "", 
    mail: string = "", 
    pass: string = ""
  ) 
  {
    this.id = id;
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.mail = mail;
    this.pass = pass;
  }
}