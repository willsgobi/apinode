import * as mongoose from "mongoose"

const Person = mongoose.model("Person", {
    name: String,
    salary: Number,
    approved: Boolean
})

export default Person