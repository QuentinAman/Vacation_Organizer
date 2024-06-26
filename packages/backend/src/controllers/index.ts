import { TripController } from "./trip"
import { UserController } from "./user"
import { UserTripController } from "./userTrip"
import { LuggageController } from "./luggage"
import { ItemController } from "./item"

export const tripController = new TripController()
export const userController = new UserController()
export const userTripController = new UserTripController()
export const luggageController = new LuggageController()
export const itemController = new ItemController()
