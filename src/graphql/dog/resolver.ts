import { Dog } from '../../models/mongo/dog';

export const resolver = {
	Query: {
        dogs: () => Dog.find()
	},
	Mutation: {
        createDog: async (_: any, { name }: any) => {
            const puppy = new Dog({ name });
            await puppy.save();
            return puppy;
        },
        deleteDog: async (_: any, { name }: any) => {
            return Dog.findOneAndDelete({ name });
        },
        updateDog: async (_:any, { name , input }: any) => {
            return Dog.findOneAndUpdate({name: name}, { $set: { name: input}});
        }
    }
}