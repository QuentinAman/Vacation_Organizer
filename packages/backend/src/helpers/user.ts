import type { Context } from "@context"
import { Error, Roles } from "@enums"
import { GraphQLError } from "graphql"
import type { User } from "@models"

export const checkIfUserIsUpdatingItselfOrIsAdmin = async (
  userId: string,
  context: Context
): Promise<User> => {
  const user = await context.dataSources.users.getById(userId)

  if (
    user?.id !== context.currentUser.id &&
    context.currentUser.role.name !== Roles.ADMIN
  ) {
    throw new GraphQLError(Error.UNAUTHORIZED)
  }

  return user
}
