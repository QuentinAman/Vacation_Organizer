import type { Context } from "@context"
import type { Luggage } from "@models"
import { itemController } from "@controllers"
import type { CreateOrUpdateItemArgs } from "@types"

export default {
  Luggage: {
    items: async (parent: Luggage, _: null, context: Context) =>
      itemController.getLuggageItems(parent.id, context),
    item: async (_: Luggage, { id }: { id: string }, context: Context) =>
      itemController.getLuggageItem(id, context),
  },
  Mutation: {
    updateItem: async (
      _: null,
      { args, itemId }: { args: CreateOrUpdateItemArgs; itemId: string },
      context: Context
    ) => itemController.updateItem(args, itemId, context),
    addItemToLuggage: async (
      _: null,
      { args, luggageId }: { args: CreateOrUpdateItemArgs; luggageId: string },
      context: Context
    ) => itemController.addItemToLuggage(args, luggageId, context),
    removeItemFromLuggage: async (
      _: null,
      { itemId }: { itemId: string },
      context: Context
    ) => itemController.removeItemFromLuggage(itemId, context),
  },
}
