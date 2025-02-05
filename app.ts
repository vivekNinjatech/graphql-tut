import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import db from "./db";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 4000;
const run = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });
  console.log(`Server is sprinting on :${port} url is : ${url}`);
};

run();
