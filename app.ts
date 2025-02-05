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
  Game: {
    reviews(parent: any) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent: any) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game(parent: any) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent: any) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame(_: any, args: any) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_: any, args: any) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_: any, args: any) {
      let updatedGames = null
      db.games.map((game)=>{
        if(game.id === args.id){
          updatedGames = {...game, ...args.game}
          return updatedGames
        }
        return game
      })
      return updatedGames
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
