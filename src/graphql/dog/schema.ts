export const typeDef = `
type Dog {
    id: ID!
	name: String!
	input: String!
}
extend type Query {
	dogs: [Dog!]!
}
extend type Mutaticon{
	createDog(name: String!): Dog!
	deleteDog(name: String!): Dog!
	updateDog(name: String!, input: String!): Dog!
}
`;
