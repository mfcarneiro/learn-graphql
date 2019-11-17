import { GraphQLServer } from "graphql-yoga";
import database from "./dummyDb";
import Query from "./resolvers/Query";
import Mutations from "./resolvers/Mutations";
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
    User
  },
  context: {
    //* The place to propagate the context for resolvers
    //! Database
    //! Authorizations and so on
    database
  }
});

server.start(() => {
  console.log("Server running at localhost:4000");
});
