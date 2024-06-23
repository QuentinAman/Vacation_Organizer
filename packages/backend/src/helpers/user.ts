import type { Context } from "@context"
import { Error } from "@enums"
import { GraphQLError } from "graphql"
import type { User } from "@models"

export const checkIfUserUpdateItselfOrIsAdmin = async (
  userId: string,
  context: Context
): Promise<User> => {
  const user = await context.dataSources.users.getById(userId)

  if (
    user?.id !== context.currentUser.id ||
    context.currentUser.role.name === "ADMIN"
  ) {
    throw new GraphQLError(Error.UNAUTHORIZED)
  }

  return user
}
