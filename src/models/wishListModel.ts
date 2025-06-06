import mongoose from 'mongoose'
const {Schema} = mongoose

const wishListSchemaRules = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    productId:{type:Schema.Types.ObjectId,ref:"Product"}
})

export default mongoose.model("WishList",wishListSchemaRules)