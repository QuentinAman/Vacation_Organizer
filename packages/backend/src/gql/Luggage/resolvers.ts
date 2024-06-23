import type { Context } from "@context"
import type { Trip } from "@models"
import type { CreateOrUpdateLuggageArgs } from "@types"
import { luggageController } from "@controllers"

export default {
  Trip: {
    luggages: async (parent: Trip, _: null, context: Context) =>
      luggageController.getTripLuggages(parent.id, context),
    luggage: async (_: Trip, { id }: { id: string }, context: Context) =>
      luggageController.getTripLuggage(id, context),
  },
  Mutation: {
    updateLuggage: async (
      _: null,
      {
        args,
        luggageId,
      }: { args: CreateOrUpdateLuggageArgs; luggageId: string },
      context: Context
    ) => luggageController.updateLuggage(args, luggageId, context),
    addLuggageToTrip: async (
      _: null,
      { args, tripId }: { args: CreateOrUpdateLuggageArgs; tripId: string },
      context: Context
    ) => luggageController.addLuggageToTrip(args, tripId, context),
    removeLuggageFromTrip: async (
      _: null,
      { luggageId }: { luggageId: string },
      context: Context
    ) => luggageController.removeLuggageFromTrip(luggageId, context),
  },
}
