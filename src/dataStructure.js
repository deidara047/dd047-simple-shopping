let dataStructure = {
  Product: {
    name: String,
    price: Number,
    stock: Number
  },
  User: {
    email: String
  },
  History: {
    costumerId: "id<User>",
    createdAt: Date,
    itemsPurchased: "Array<Product>",
    total: Number
  }
}