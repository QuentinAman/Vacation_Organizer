export interface CreateUserArgs {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginArgs {
  email: string
  password: string
}

export interface UpdateUserArgs {
  firstName: string
  lastname: string
  image: string
}

export interface UpdatePasswordArgs {
  password: string
}

export interface CreateOrUpdateTripArgs {
  name: string
  startDate: Date
  endDate: Date
  location: string
}

export interface CreateOrUpdateLuggageArgs {
  name?: string
  tripId?: string
}
