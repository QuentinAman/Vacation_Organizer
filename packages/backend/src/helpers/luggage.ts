import type { Context } from "@context"
import { Error } from "@enums"
import { GraphQLError } from "graphql"
import { Luggage, Trip, UserTrip } from "@models"

export const checkIfUserUpdateItsLuggageOrIsAdmin = async (
  luggageId: string,
  context: Context,
  disableCheck: boolean = false
): Promise<Luggage> => {
  const luggage = (await context.dataSources.luggages.getById(
    luggageId,
    disableCheck,
    {
      include: [
        {
          model: Trip,
          include: [
            {
              model: UserTrip,
              where: {
                userId: context.currentUser.id,
              },
            },
          ],
        },
      ],
    }
  )) as Luggage

  if (!luggage && context.currentUser.role.name === "ADMIN") {
    throw new GraphQLError(Error.UNAUTHORIZED)
  }

  return luggage
}
