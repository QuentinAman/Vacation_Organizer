import { UserTrip } from "@models"
import { GraphQLError } from "graphql"
import type { FindOptions } from "sequelize"
import { Error } from "@enums"

export class UserTripsDataSource {
  async getById(
    id: string,
    disableCheck: boolean = false,
    options?: FindOptions
  ): Promise<UserTrip | null> {
    const userTrip = await UserTrip.findByPk(id, { ...options })

    if (!userTrip && !disableCheck) {
      throw new GraphQLError(Error.USER_TRIP_NOT_FOUND)
    }

    return userTrip
  }

  async getByUserId(
    userId: string,
    options?: FindOptions
  ): Promise<UserTrip[]> {
    return UserTrip.findAll({
      where: {
        userId,
      },
      ...options,
    })
  }

  async getByTripId(
    tripId: string,
    options?: FindOptions
  ): Promise<UserTrip[]> {
    return UserTrip.findAll({
      where: {
        tripId,
      },
      ...options,
    })
  }

  async getByUserIdAndTripId(
    userId: string,
    tripId: string,
    disableCheck: boolean = false,
    options?: FindOptions
  ): Promise<UserTrip | null> {
    const userTrip = await UserTrip.findOne({
      where: {
        userId,
        tripId,
      },
      ...options,
    })

    if (!disableCheck && userTrip) {
      throw new GraphQLError(Error.USER_TRIP_ALREADY_EXISTS)
    }

    return userTrip
  }
}
