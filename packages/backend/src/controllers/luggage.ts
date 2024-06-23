import type { Context } from "@context"
import type { CreateOrUpdateLuggageArgs } from "@types"
import { Luggage } from "@models"
import { luggageController } from "@controllers"
import {
  checkIfUserUpdateItsLuggageOrIsAdmin,
  checkIfUserUpdateItsTripOrIsAdmin,
} from "@helpers"

export class LuggageController {
  async updateLuggage(
    args: CreateOrUpdateLuggageArgs,
    luggageId: string,
    context: Context
  ): Promise<Luggage> {
    const luggage = await checkIfUserUpdateItsLuggageOrIsAdmin(
      luggageId,
      context
    )

    return luggage.update({
      ...args,
    })
  }

  async deleteLuggage(luggageId: string, context: Context): Promise<boolean> {
    const luggage = await checkIfUserUpdateItsLuggageOrIsAdmin(
      luggageId,
      context
    )

    await luggage.destroy()

    return true
  }

  async getTripLuggages(tripId: string, context: Context): Promise<Luggage[]> {
    return context.dataSources.luggages.getByTripId(tripId)
  }

  async getTripLuggage(id: string, context: Context): Promise<Luggage> {
    return checkIfUserUpdateItsLuggageOrIsAdmin(id, context, true)
  }

  async addLuggageToTrip(
    args: CreateOrUpdateLuggageArgs,
    tripId: string,
    context: Context
  ): Promise<Luggage> {
    const trip = await checkIfUserUpdateItsTripOrIsAdmin(tripId, context, true)

    return Luggage.create({ ...args, tripId: trip.id })
  }

  async removeLuggageFromTrip(
    luggageId: string,
    context: Context
  ): Promise<boolean> {
    await luggageController.updateLuggage(
      {
        tripId: undefined,
      },
      luggageId,
      context
    )

    return true
  }
}
