import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import db from "./db";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_: any, args: any) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_: any, args: any) {
      return db.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_: any, args: any) {
      return db.reviews.find((review) => review.id === args.id);
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
