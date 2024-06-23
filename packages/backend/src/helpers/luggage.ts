import type { Context } from "@context"
import { Error, Roles } from "@enums"
import { GraphQLError } from "graphql"
import { Luggage, Trip, UserTrip } from "@models"

export const checkIfUserIsUpdatingItsLuggageOrIsAdmin = async (
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

  if (!luggage && context.currentUser.role.name !== Roles.ADMIN) {
    throw new GraphQLError(Error.UNAUTHORIZED)
  }

  return luggage
}
