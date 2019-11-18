import { GraphQLServer, PubSub } from "graphql-yoga";
import database from "./dummyDb";
import Query from "./resolvers/Query";
import Mutations from "./resolvers/Mutations";
import Subscriptions from "./resolvers/Subscriptions";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
import User from "./resolvers/User";

const server = new GraphQLServer({
  typeDefs: "./schema.gql",
  resolvers: {
    Query,
    Mutations,
    Post,
    Comment,
    User,
    Subscriptions
  },
  context: {
    //* The place to propagate the context for resolvers
    //! Database
    //! Authorizations and so on
    database,
    pubSub
  }
});

const pubSub = new PubSub();

server.start(() => {
  console.log("Server running at localhost:4000");
});
