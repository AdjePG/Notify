export default class Notes {
  id: number;
  subject: string;
  message: string;
  post_date: Date;
  category_id: number

  constructor(id: number, subject: string, message: string, post_date: Date, category_id: number = 0) {
    this.id = id;
    this.subject = subject;
    this.message = message;
    this.post_date = post_date;
    this.category_id = category_id;
  }
}