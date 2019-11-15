const mongoose = require('mongoose');
export const Dog: any = mongoose.model("Dog", { name: String, input: String!})