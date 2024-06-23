import express from "express"
import cors from "cors"
import { ApolloServer } from "@apollo/server"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { expressMiddleware } from "@apollo/server/express4"
import { createContext } from "@context"
import { createServer } from "http"
import { getResolvers, getTypeDefs } from "@gql"
import { db } from "@services"
import cookieParser from "cookie-parser"
import { authDirective, getUser } from "@utils"

async function main() {
  const app = express()
  const httpServer = createServer(app)
  const port = 4000

  app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
  })

  const [typeDefs, resolvers] = await Promise.all([
    getTypeDefs(),
    getResolvers(),
  ])

  const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective(
    "auth",
    getUser
  )

  let schema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, ...typeDefs],
    resolvers,
  })

  schema = authDirectiveTransformer(schema)

  const server = new ApolloServer({
    schema,
  })

  db.sync({ alter: true }).then(() => console.log("Database connnected"))

  await server.start()

  app.use(
    "/graphql",
    cors({
      credentials: true,
      origin: "https://sandbox.embed.apollographql.com",
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => createContext(req, res),
    })
  )

  await new Promise((resolve) => {
    httpServer.listen({ port: process.env["PORT"] }, resolve as () => void)
  })

  console.log(`🚀  Server ready at: http://localhost:4000/graphql`)
}

main()
