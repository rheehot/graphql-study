import { ApolloServer } from "apollo-server-lambda";
import { merge } from 'lodash';
import mongoose from "mongoose";
import { typeDef as Common, resolver as commonResolver } from './graphql/common';
import { typeDef as Dog , resolver as dogResolver } from './graphql/dog';
import { typeDef as Friend, resolver as friendResolver} from './graphql/friend';

const mem = () => {
	return process.memoryUsage();
}
const schemaDirectives = {
}
const schema = [    
	Common, // typeDef (타입정의)
	Dog,
	Friend
];
const resolvs = merge({},
	commonResolver, //resolver
	dogResolver,
	friendResolver
);

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
	]
});

exports.graphql = server.createHandler({
	cors: {
		origin: '*',
		credentials: true
	}
});
