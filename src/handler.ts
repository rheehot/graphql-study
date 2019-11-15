import { ApolloServer } from "apollo-server-lambda";
import { merge } from 'lodash';
import mongoose from "mongoose";
import { typeDef as Common, resolver as commonResolver } from './graphql/common';
// import { typeDef as Book , resolver as bookResolver } from './graphql/books'

const mem = () => {
	return process.memoryUsage();
}
const schemaDirectives = {
}
const schema = [    
	Common, // typeDef (타입정의)
	// Book,
];
const resolvs = merge({},
	commonResolver, //resolver
	// bookResolver,
);

// Lambda의 경우 handler 밖에 정의한 variable은 lambda instance간에 유지가 된다.
// (Any variable outside the handler function will be frozen in between Lambda invocations and possibly reused.)
// Lambda를 사용할 경우 db.disconnect를 처리하면 안된다.

const Logging = {
	requestDidStart(requestContext: { request: any; }) {
		const request = requestContext.request;

		if (request.operationName !== 'IntrospectionQuery') {
			console.log(request);
			console.log(JSON.stringify(request.variables));
		}
	}
}

try{
	mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true})
}catch(err){
	console.log(err)
}

const server = new ApolloServer({
	typeDefs: schema,
	resolvers: resolvs,
	schemaDirectives,
	introspection: true,
	playground: true, 
	context: ({ context }) => {
		context.callbackWaitsForEmptyEventLoop = false;
		return {
			functionName: context.functionName,
			context,
			meminfo: mem()
		}
	},
	engine: {
		generateClientInfo: ({ request }) => {
			// console.log(request);
			const headers: any = request.http && request.http.headers;
			if (headers) {
				// console.log(headers['apollographql-client-name']);
				return {
					clientName: headers['apollographql-client-name'],
					clientVersion: headers['apollographql-client-version'],
				};
			} else {
				return {
					clientName: "Unknown Client",
					clientVersion: "Unversioned",
				};
			}
		}
	},
	plugins: [
		Logging
	]
});

exports.graphql = server.createHandler({
	cors: {
		origin: '*',
		credentials: true
	}
});
