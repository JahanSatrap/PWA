import DateObject from 'react-date-object'

export interface ISignUpForm {
  Mobile: string;
  FirstNameFa?: string,
  LastNameFa?: string,
  Email?: string,
  BirthDate?: DateObject
}