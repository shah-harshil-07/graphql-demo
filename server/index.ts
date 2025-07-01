import cors from 'cors';
import { graphqlHTTP } from "express-graphql";
import express, { Request, Response } from "express";

import schema from "./graphql/schema";
import rootValue from "./graphql/resolvers";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to GraphQL Demo API');
});

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});