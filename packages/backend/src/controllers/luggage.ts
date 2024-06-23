import type { Context } from "@context"
import type { CreateOrUpdateLuggageArgs } from "@types"
import { Luggage } from "@models"
import {
  checkIfUserIsUpdatingItsLuggageOrIsAdmin,
  checkIfUserIsUpdatingItsTripOrIsAdmin,
} from "@helpers"

export class LuggageController {
  async updateLuggage(
    args: CreateOrUpdateLuggageArgs,
    luggageId: string,
    context: Context
  ): Promise<Luggage> {
    const luggage = await checkIfUserIsUpdatingItsLuggageOrIsAdmin(
      luggageId,
      context
    )

    return luggage.update({
      ...args,
    })
  }

  async getTripLuggages(tripId: string, context: Context): Promise<Luggage[]> {
    return context.dataSources.luggages.getByTripId(tripId)
  }

  async getTripLuggage(id: string, context: Context): Promise<Luggage> {
    return checkIfUserIsUpdatingItsLuggageOrIsAdmin(id, context, true)
  }

  async addLuggageToTrip(
    args: CreateOrUpdateLuggageArgs,
    tripId: string,
    context: Context
  ): Promise<Luggage> {
    const trip = await checkIfUserIsUpdatingItsTripOrIsAdmin(
      tripId,
      context,
      true
    )

    return Luggage.create({ ...args, tripId: trip.id })
  }

  async removeLuggageFromTrip(
    luggageId: string,
    context: Context
  ): Promise<boolean> {
    const luggage = await checkIfUserIsUpdatingItsLuggageOrIsAdmin(
      luggageId,
      context
    )

    await luggage.destroy()

    return true
  }
}
