import mongoose from 'mongoose'

const addresSchemaRules = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'User ID is required'],
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },

},{timestamps:true})

export default mongoose.model('Address',addresSchemaRules)