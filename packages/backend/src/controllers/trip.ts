import type { Context } from "@context"
import type { CreateOrUpdateTripArgs } from "@types"
import { Trip } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import { userTripController } from "@controllers"
import { checkIfUserUpdateItsTripOrIsAdmin } from "@helpers"

export class TripController {
  async createTrip(
    args: CreateOrUpdateTripArgs,
    context: Context
  ): Promise<Trip> {
    const isTripAlreadyInDb = await context.dataSources.userTrips.getByUserId(
      context.currentUser.id,
      {
        include: [
          {
            model: Trip,
            where: {
              name: args.name,
            },
          },
        ],
      }
    )

    if (isTripAlreadyInDb.length > 0) {
      throw new GraphQLError(Error.TRIP_ALREADY_EXISTS)
    }

    const createdTrip = await Trip.create({ ...args })
    await userTripController.createUserTrip(
      context.currentUser.id,
      createdTrip.id,
      context
    )

    return createdTrip
  }

  async updateTrip(
    args: CreateOrUpdateTripArgs,
    tripId: string,
    context: Context
  ): Promise<Trip> {
    const trip = await checkIfUserUpdateItsTripOrIsAdmin(tripId, context)

    return trip.update({
      ...args,
    })
  }

  async deleteTrip(tripId: string, context: Context): Promise<boolean> {
    const trip = await checkIfUserUpdateItsTripOrIsAdmin(tripId, context)

    await userTripController.deleteUserTripsByTripId(tripId, context)
    await trip.destroy()

    return true
  }

  async getUserTrips(context: Context): Promise<Trip[]> {
    const userTrips = await context.dataSources.userTrips.getByUserId(
      context.currentUser.id,
      {
        include: [Trip],
      }
    )

    return userTrips.map((userTrip) => userTrip.trip)
  }

  async getUserTrip(id: string, context: Context): Promise<Trip> {
    return checkIfUserUpdateItsTripOrIsAdmin(id, context, true)
  }

  async addUserToTrip(
    userId: string,
    tripId: string,
    context: Context
  ): Promise<boolean> {
    await userTripController.createUserTrip(userId, tripId, context)

    return true
  }

  async removeUserFromTrip(
    userId: string,
    tripId: string,
    context: Context
  ): Promise<boolean> {
    await userTripController.deleteUserTripByUserIdAndTripId(
      userId,
      tripId,
      context
    )

    return true
  }
}
