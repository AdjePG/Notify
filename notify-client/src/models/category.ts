export default class Category {
  id: number;
  name: string;
  info: string;
  color_id: number;
  user_id: number;

  constructor(
    id: number = 0, 
    name: string = "",
    info: string = "", 
    color_id: number = 0, 
    user_id: number = 0
  ) 
  {
    this.id = id;
    this.name = name;
    this.info = info;
    this.color_id = color_id;
    this.user_id = user_id;
  }
}