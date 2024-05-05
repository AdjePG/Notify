export default class Note {
  id;
  subject;
  message;
  post_date;
  category;
  user;
  update_date;

  constructor(
    id = 0, 
    subject = "", 
    message = "", 
    post_date = new Date(), 
    category = 0, 
    user = 0, 
    update_date = new Date()
  ) 
  {
    this.id = id;
    this.subject = subject;
    this.message = message;
    this.post_date = post_date;
    this.category = category;
    this.user = user;
    this.update_date = update_date;
  }
}