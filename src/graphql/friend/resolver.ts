import { Friend } from '../../models/mongo/friends'

export const resolver = {
    Query: {
        friends: () => Friend.find()
    },
    Mutation: {
        createFriend: async(_: any, {name, age}: any) =>{
            const create = new Friend({name, age});
            await create.save();
            return create;
        },
        deleteFriend: async (_: any, { name }: any) => {
            return Friend.findOneAndDelete({ name });
        },
        updateFriend: async (_:any, { name , input }: any) => {
            return Friend.findOneAndUpdate({name: name}, { $set: { name: input}});
        }
    }
}