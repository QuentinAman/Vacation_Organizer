import type { Context } from "@context"
import { MapperKind, mapSchema, getDirective } from "@graphql-tools/utils"
import { GraphQLError, defaultFieldResolver, type GraphQLSchema } from "graphql"
import { Error, Roles } from "@enums"

export function authDirective(
  directiveName: string,
  getUserFn: (token: string) => { hasRole: (role: string) => boolean }
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typeDirectiveArgumentMaps: Record<string, any> = {}
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
      requires: Role = ADMIN,
    ) on OBJECT | FIELD_DEFINITION

    enum Role {
      ADMIN
      USER
    }`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0]
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective
          }
          return undefined
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName]
          if (authDirective) {
            const { requires } = authDirective
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig
              fieldConfig.resolve = function (
                source,
                args,
                context: Context,
                info
              ) {
                const user = getUserFn(context.currentUser.roleId.toString())
                if (!user.hasRole(requires)) {
                  throw new GraphQLError(Error.NOT_ENOUGH_RIGHTS)
                }
                return resolve(source, args, context, info)
              }
              return fieldConfig
            }
          }
        },
      }),
  }
}

export function getUser(token: string) {
  const roles = [Roles.USER, Roles.ADMIN]
  return {
    hasRole: (role: Roles) => {
      const roleIndex = roles.indexOf(role)
      return roleIndex >= 0 && Number(token) >= roleIndex
    },
  }
}
