import mongoose from 'mongoose'

const cartSchemaRules = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }
})

export default mongoose.model("Cart",cartSchemaRules)