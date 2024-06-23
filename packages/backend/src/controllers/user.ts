import type { Context } from "@context"
import type {
  CreateUserArgs,
  LoginArgs,
  UpdatePasswordArgs,
  UpdateUserArgs,
} from "@types"
import { GraphQLError } from "graphql"
import { Error, Roles } from "@enums"
import { Role, User } from "@models"
import { checkPassword, createJwtCookie, encryptPassword } from "@utils"
import { checkIfUserIsUpdatingItselfOrIsAdmin } from "@helpers"
import { userTripController } from "@controllers"

export class UserController {
  async createUser(args: CreateUserArgs, context: Context): Promise<User> {
    const isUserAlreadyInDb = await context.dataSources.users.getByEmail(
      args.email,
      true
    )

    if (isUserAlreadyInDb) throw new GraphQLError(Error.USER_ALREADY_EXISTS)

    const [encryptedPassword, userRole] = await Promise.all([
      encryptPassword(args.password),
      context.dataSources.roles.getByName(Roles.USER),
    ])

    const user = await User.create({
      ...args,
      password: encryptedPassword,
      roleId: (userRole as Role).id,
    })

    createJwtCookie(user, context.res)

    return user
  }

  async login(args: LoginArgs, context: Context): Promise<User> {
    const user = (await context.dataSources.users.getByEmail(
      args.email
    )) as User

    const isPasswordValid = await checkPassword(user, args.password)

    if (!isPasswordValid) {
      throw new GraphQLError(Error.INVALID_PASSWORD)
    }

    createJwtCookie(user, context.res)

    return user
  }

  async logout(context: Context): Promise<boolean> {
    context.res.clearCookie("sessionId")

    return true
  }

  async updateUser(
    userId: string,
    args: UpdateUserArgs,
    context: Context
  ): Promise<User> {
    const user = await checkIfUserIsUpdatingItselfOrIsAdmin(userId, context)

    return user.update(args)
  }

  async updatePassword(
    userId: string,
    args: UpdatePasswordArgs,
    context: Context
  ): Promise<User> {
    const user = await checkIfUserIsUpdatingItselfOrIsAdmin(userId, context)

    const encryptedPassword = encryptPassword(args.password)

    return user.update({
      password: encryptedPassword,
    })
  }

  async deleteUser(userId: string, context: Context): Promise<boolean> {
    const user = await checkIfUserIsUpdatingItselfOrIsAdmin(userId, context)

    await userTripController.deleteUserTripsByUserId(user.id, context)
    await user.destroy()

    if (user.id === context.currentUser.id) {
      context.res.clearCookie("sessionId")
    }

    return true
  }
}
