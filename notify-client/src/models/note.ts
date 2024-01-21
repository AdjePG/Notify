export default class Note {
  id: number;
  subject: string;
  message: string;
  post_date: Date;
  category_id: number
  user_id: number;
  update_date: Date;

  constructor(
    id: number = 0, 
    subject: string = "", 
    message: string = "", 
    post_date: Date = new Date(), 
    category_id: number = 0, 
    user_id: number = 0, 
    update_date: Date = new Date()
  ) 
  {
    this.id = id;
    this.subject = subject;
    this.message = message;
    this.post_date = post_date;
    this.category_id = category_id;
    this.user_id = user_id;
    this.update_date = update_date;
  }
}