export default class User {
  id;
  username;
  name;
  surname;
  mail;
  pass;

  constructor(
    id = 0, 
    username = "", 
    name = "", 
    surname = "", 
    mail = "", 
    pass = ""
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