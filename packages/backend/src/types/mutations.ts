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
  lastName: string
  image: string
}

export interface UpdatePasswordArgs {
  password: string
}

export interface CreateOrUpdateTripArgs {
  name: string
  startDate?: Date
  endDate?: Date
  location?: string
}

export interface CreateOrUpdateLuggageArgs {
  name?: string
  tripId?: string
}

export interface CreateOrUpdateItemArgs {
  name: string
  quantity?: number
  alreadyPacked?: number
}
