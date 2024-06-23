import type { Context } from "@context"
import type { User } from "@models"
import type { CreateUserArgs, LoginArgs, UpdateUserArgs } from "@types"
import { userController } from "@controllers"

export default {
  Query: {
    users: async (
      _: null,
      args: { ids: number[] },
      context: Context
    ): Promise<User[] | null> => context.dataSources.users.getByIds(args.ids),
    user: async (
      _: null,
      args: { id: number },
      context: Context
    ): Promise<User | null> => context.dataSources.users.getById(args.id),
    allUsers: async (_: null, __: null, context: Context): Promise<User[]> =>
      context.dataSources.users.getAll(),
    me: async (_: null, __: null, context: Context): Promise<User | null> =>
      context.dataSources.users.getById(context.currentUser.id),
  },
  Mutation: {
    login: async (_: null, { args }: { args: LoginArgs }, context: Context) =>
      userController.login(args, context),
    logout: async (_: null, __: null, context: Context) =>
      userController.logout(context),
    deleteUser: async (
      _: null,
      { userId }: { userId: string },
      context: Context
    ) => userController.deleteUser(userId, context),
    createUser: async (
      _: null,
      { args }: { args: CreateUserArgs },
      context: Context
    ) => userController.createUser(args, context),
    updateUser: async (
      _: null,
      { args, userId }: { args: UpdateUserArgs; userId: string },
      context: Context
    ) => userController.updateUser(userId, args, context),
  },
}
