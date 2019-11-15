const mongoose = require('mongoose');
export const Dog = mongoose.model("Dog", { name: String, input: String!})