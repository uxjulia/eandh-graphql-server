const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

const heroes = require('./data')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Hero" type can be used in other type declarations.
  type Hero {
    name: String
    limited: Boolean
    element: String
    stars: Int
    rarity: Rarity
    grades: Grades
  }
  
  type Grades {
    titan: TitanGrade
    defense: DefenseGrade
    offense: OffenseGrade
  }
  
  type TitanGrade {
    stamina: LetterGrade
    passive: LetterGrade
    direct: LetterGrade
    Tiles: LetterGrade
    Versatility: LetterGrade
  }
  
  type OffenseGrade {
    speed: LetterGrade
    effect: LetterGrade
    stamina: LetterGrade
    Versatility: LetterGrade
    war: LetterGrade
  }
  
  type DefenseGrade {
    speed: LetterGrade
    effect: LetterGrade
    stamina: LetterGrade
    strength: LetterGrade
    tank: LetterGrade
    support: LetterGrade
  }
  
  enum LetterGrade {
    A+
    A
    B
    C
    D
  }
  enum GradeValue {
    100
    90
    80
    70
    60
  }
    
  enum Rarity {
    Common
    Uncommon
    Rare
    Epic
    Legendary
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getHero(name: String): Hero
    getAllHeroes: [Hero]
  }
  schema {
    query: Query
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    getHero: (_, args) => {
      return heroes.get(args.name)
    },
    getAllHeroes: () => heroes,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});