import mongoose from 'mongoose'
const {Schema} = mongoose

const OrderSchemaRules = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    orderItems:[
        {productId:{type:Schema.Types.ObjectId,ref:"Product",required:true}},
        {quantity:{type:Number,required:true}}
    ],
    orderStatus:{type:String,
        enum:{values:['Pending','shipped','Delivered','Cancelled']},
        default:'Pending'
    },
    deliveryCharge:{type:Number,default:60},
    Total:{type:Number,required:true}
},{timestamps:true})

export default mongoose.model("Order",OrderSchemaRules)