export interface IInput {
    name: string,
    email: string, 
    password: string
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  disorderType?: string;  // Может быть не у всех
  createdAt?: string;
  role?: 'user' | 'admin';
}
export interface RegisterData extends IInput {

}
