import type { Context } from "@context"
import type { CreateOrUpdateItemArgs } from "@types"
import { Item } from "@models"
import {
  checkIfUserIsUpdatingItsItemeOrIsAdmin,
  checkIfUserIsUpdatingItsLuggageOrIsAdmin,
} from "@helpers"

export class ItemController {
  async updateItem(
    args: CreateOrUpdateItemArgs,
    itemId: string,
    context: Context
  ): Promise<Item> {
    const item = await checkIfUserIsUpdatingItsItemeOrIsAdmin(itemId, context)

    return item.update({
      ...args,
    })
  }

  async getLuggageItems(luggageId: string, context: Context): Promise<Item[]> {
    return context.dataSources.items.getByLuggageId(luggageId)
  }

  async getLuggageItem(id: string, context: Context): Promise<Item> {
    return checkIfUserIsUpdatingItsItemeOrIsAdmin(id, context, true)
  }

  async addItemToLuggage(
    args: CreateOrUpdateItemArgs,
    luggageId: string,
    context: Context
  ): Promise<Item> {
    const luggage = await checkIfUserIsUpdatingItsLuggageOrIsAdmin(
      luggageId,
      context
    )

    return Item.create({ ...args, luggageId: luggage.id })
  }

  async removeItemFromLuggage(
    itemId: string,
    context: Context
  ): Promise<boolean> {
    const item = await checkIfUserIsUpdatingItsItemeOrIsAdmin(itemId, context)

    await item.destroy()

    return true
  }
}
