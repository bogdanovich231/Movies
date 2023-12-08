export interface IFormInput {
  name: string;
  age: number;
  gmail: string;
  gender: "male" | "female";
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  image: string;
  country: string;
}
export interface ICardValues {
  data: {
    name: string;
    age: number;
    gmail: string;
    gender: "male" | "female";
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
    image: string;
    country: string;
  };
}
export interface IFormErrors {
  name?: string;
  age?: string;
  gmail?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  image?: string;
  country?: string;
}
