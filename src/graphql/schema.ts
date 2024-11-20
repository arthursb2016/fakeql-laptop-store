import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    products: [Product]
  }

  type Product {
    id: ID
    name: String
    price: Float
  }
`
