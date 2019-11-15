export const typeDef = `
directive @auth(
	requires: Role = ADMIN
) on OBJECT | FIELD_DEFINITION

scalar DateTime
scalar JSON
scalar Upload

enum Role {
	USER,
	ADMIN,
	PROVIDER
}
type Dog {
    id: ID!
	name: String!
	input: String!
}
type Query {
	hello: String
	dogs: [Dog!]!
}
type Mutation{
	createDog(name: String!): Dog!
	deleteDog(name: String!): Dog!
	updateDog(name: String!, input: String!): Dog!
}
interface Node {
	id: ID!
	createdAt: DateTime!
	updatedAt: DateTime!
}

type File {
	filename: String!
	mimetype: String!
	encoding: String!
}

type ListMetaData {
	count: Int!
}

input SearchFilter {
	q: String
	ids: [JSON!]
}

input IDList {
	id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
	"""
	When paginating forwards, the cursor to continue.
	"""
	endCursor: String

	"""
	When paginating forwards, are there more items?
	"""
	hasNextPage: Boolean!

	"""
	When paginating backwards, are there more items?
	"""
	hasPreviousPage: Boolean!

	"""
	When paginating backwards, the cursor to continue.
	"""
	startCursor: String
}

input dateOrder {
	field: DateOrderField
	direction: OrderDirection
}

enum DateOrderField {
	CREATED_AT
	UPDATED_AT
}

enum OrderDirection {
	ASC
	DESC
}
`;
