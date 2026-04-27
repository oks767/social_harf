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
export interface UserProfile {
	id: string
	name: string
	email: string
	role: string
	createdAt: string
	// Поля для пациента
	disorderType?: string
	disorderDescription?: string
	diagnosisDate?: string
	// Поля для врача
	specialization?: string
	diploma?: string
	experience?: string
	licenseNumber?: string
	education?: string
}
