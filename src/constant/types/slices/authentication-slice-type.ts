export interface IAuthSliceInit {
  user: {
    username: string
    token: string
    personId: string
  }
  isAuthenticated: boolean | undefined
  isLoading: boolean
  error: any
}

export interface ILoginParams {
  MobileNumber: string
  ActiveCode: string
}

export interface ISignUpParams {
  Mobile: string
  FirstNameFa?: string
  LastNameFa?: string
  Email?: string
  BirthDate?: string
}
