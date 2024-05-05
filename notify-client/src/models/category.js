export default class Category {
  id;
  name;
  info;
  color_id;
  user;

  constructor(
    id = 0, 
    name = "",
    info = "", 
    color_id = 0, 
    user = 0
  ) 
  {
    this.id = id;
    this.name = name;
    this.info = info;
    this.color_id = color_id;
    this.user = user;
  }
}