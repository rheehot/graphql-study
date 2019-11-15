export const typeDef = `
type Dog {
    id: ID!
	name: String!
	input: String!
}
type Query {
	dogs: [Dog!]!
}
type Mutation{
	createDog(name: String!): Dog!
	deleteDog(name: String!): Dog!
	updateDog(name: String!, input: String!): Dog!
}
`;
