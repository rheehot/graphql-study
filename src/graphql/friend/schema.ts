export const typeDef = `
type Friend{
    id: ID!
    name: String!
    age: String!
}
extend type Query{
    friends: [Friend!]!
}
extend type Mutation{
    createFriend(name: String, age: String, input: String): Friend!
    deleteFriend(name: String!): Friend!
    updateFriend(name: String!, input: String!): Friend!
}
`;