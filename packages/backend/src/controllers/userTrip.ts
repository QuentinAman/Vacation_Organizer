import type { Context } from "@context"
import { Trip, UserTrip } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import { tripController } from "@controllers"

export class UserTripController {
  async createUserTrip(
    userId: string,
    tripId: string,
    context: Context
  ): Promise<UserTrip> {
    await context.dataSources.userTrips.getByUserIdAndTripId(userId, tripId)

    return UserTrip.create({ userId: Number(userId), tripId: Number(tripId) })
  }

  async deleteUserTripByUserIdAndTripId(
    tripId: string,
    userId: string,
    context: Context
  ): Promise<boolean> {
    const userTrip = (await context.dataSources.userTrips.getByUserIdAndTripId(
      userId,
      tripId,
      true
    )) as UserTrip

    if (!userTrip) {
      throw new GraphQLError(Error.USER_TRIP_NOT_FOUND)
    }

    await userTrip.destroy()

    return true
  }

  async deleteTripById(id: string, context: Context): Promise<boolean> {
    const userTrip = (await context.dataSources.userTrips.getById(
      id
    )) as UserTrip

    const otherUserTripsWithSameTripId =
      await context.dataSources.userTrips.getByTripId(userTrip.id)

    if (otherUserTripsWithSameTripId.length === 0) {
      tripController.deleteTrip(userTrip.id, context)
    }

    await userTrip.destroy()

    return true
  }

  async deleteUserTripsByTripId(tripId: string, context: Context) {
    const hasTripRights =
      await context.dataSources.userTrips.getByUserIdAndTripId(
        context.currentUser.id,
        tripId,
        true
      )

    if (!hasTripRights) {
      throw new GraphQLError(Error.UNAUTHORIZED)
    }

    return UserTrip.destroy({ where: { tripId } })
  }

  async deleteUserTripsByUserId(
    userId: string,
    context: Context
  ): Promise<boolean> {
    const userTrips = await context.dataSources.userTrips.getByUserId(userId, {
      include: [
        {
          model: Trip,
          include: [
            {
              model: UserTrip,
            },
          ],
        },
      ],
    })

    await Promise.all([
      ...userTrips
        .filter((userTrip) => userTrip.trip.userTrips.length <= 1)
        .map((userTrip) =>
          tripController.deleteTrip(userTrip.trip.id, context)
        ),
    ])
    await Promise.all([...userTrips.map((userTrip) => userTrip.destroy())])

    return true
  }
}
