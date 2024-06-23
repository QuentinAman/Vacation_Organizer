import type { Context } from "@context"
import type { User } from "@models"
import type { CreateOrUpdateTripArgs } from "@types"
import { tripController } from "@controllers"

export default {
  User: {
    trips: async (_: User, __: null, context: Context) =>
      tripController.getUserTrips(context),
    trip: async (_: User, { id }: { id: string }, context: Context) =>
      tripController.getUserTrip(id, context),
  },
  Query: {
    trip: async (_: null, { id }: { id: string }, context: Context) =>
      context.dataSources.trips.getById(id),
    trips: async (_: null, { ids }: { ids: string[] }, context: Context) =>
      context.dataSources.trips.getByIds(ids),
    allTrips: async (_: null, __: null, context: Context) =>
      context.dataSources.trips.getAll(),
  },
  Mutation: {
    createTrip: async (
      _: null,
      { args }: { args: CreateOrUpdateTripArgs },
      context: Context
    ) => tripController.createTrip(args, context),
    updateTrip: async (
      _: null,
      { args, tripId }: { args: CreateOrUpdateTripArgs; tripId: string },
      context: Context
    ) => tripController.updateTrip(args, tripId, context),
    deleteTrip: async (
      _: null,
      { tripId }: { tripId: string },
      context: Context
    ) => {
      tripController.deleteTrip(tripId, context)
    },
    addUserToTrip: async (
      _: null,
      { userId, tripId }: { userId: string; tripId: string },
      context: Context
    ) => tripController.addUserToTrip(userId, tripId, context),
    removeUserFromTrip: async (
      _: null,
      { userId, tripId }: { userId: string; tripId: string },
      context: Context
    ) => tripController.removeUserFromTrip(userId, tripId, context),
  },
}
