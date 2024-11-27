import { Product } from '../models/product'

export const resolvers = {
  Query: {
    products: async () => {
      const products = await Product.find().lean()
      return products
    }
  }
}
