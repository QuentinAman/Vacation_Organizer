export enum Error {
  INVALID_TOKEN = "INVALID_TOKEN",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_CONNECTED = "NOT_CONNECTED",
  NOT_ENOUGH_RIGHTS = "NOT_ENOUGH_RIGHTS",

  //USERS
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  USER_NOT_FOUND = "USER_NOT_FOUND",

  //TRIPS
  TRIP_NOT_FOUND = "TRIP_NOT_FOUND",
  TRIP_ALREADY_EXISTS = "TRIP_ALREADY_EXISTS",

  //USER TRIPS
  USER_TRIP_NOT_FOUND = "USER_TRIP_NOT_FOUND",
  USER_TRIP_ALREADY_EXISTS = "USER_TRIP_ALREADY_EXISTS",

  //LUGGAGES
  LUGGAGE_NOT_FOUND = "LUGGAGE_NOT_FOUND",
}