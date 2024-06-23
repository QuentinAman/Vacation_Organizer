import type { Context } from "@context"
import { Error, Roles } from "@enums"
import { GraphQLError } from "graphql"
import { Item, Luggage, Trip, UserTrip } from "@models"

export const checkIfUserIsUpdatingItsItemeOrIsAdmin = async (
  itemId: string,
  context: Context,
  disableCheck: boolean = false
): Promise<Item> => {
  const item = (await context.dataSources.items.getById(itemId, disableCheck, {
    include: [
      {
        model: Luggage,
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
      },
    ],
  })) as Item

  if (!item && context.currentUser.role.name !== Roles.ADMIN) {
    throw new GraphQLError(Error.UNAUTHORIZED)
  }

  return item
}
