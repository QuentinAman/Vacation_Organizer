import { Trip } from "@models"
import { GraphQLError } from "graphql"
import { Error } from "@enums"
import type { FindOptions } from "sequelize"

export class TripsDataSource {
  async getById(id: string, options?: FindOptions): Promise<Trip | null> {
    const trip = await Trip.findByPk(id, { ...options })

    if (!trip) {
      throw new GraphQLError(Error.TRIP_NOT_FOUND)
    }

    return trip
  }

  async getByIds(ids: string[]): Promise<Trip[]> {
    return Trip.findAll({ where: { id: ids } })
  }

  async getAll(): Promise<Trip[]> {
    return Trip.findAll()
  }
}
