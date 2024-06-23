import type { Context } from "@context"
import { Error } from "@enums"
import { GraphQLError } from "graphql"
import { Trip, UserTrip } from "@models"

export const checkIfUserUpdateItsTripOrIsAdmin = async (
  tripId: string,
  context: Context,
  disableCheck: boolean = false
): Promise<Trip> => {
  const userTrip = (await context.dataSources.userTrips.getByUserIdAndTripId(
    context.currentUser.id,
    tripId,
    disableCheck,
    {
      include: [
        {
          model: Trip,
        },
      ],
    }
  )) as UserTrip

  if (!userTrip && context.currentUser.role.name !== "ADMIN") {
    throw new GraphQLError(Error.UNAUTHORIZED)
  }

  return userTrip.trip
}
