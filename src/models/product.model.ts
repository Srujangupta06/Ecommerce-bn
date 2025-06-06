import mongoose from "mongoose";
import validator from 'validator';

interface IProduct extends Document {
    name: string,
    brand: string,
    category: string,
    stock: number,
    originalPrice: number,
    discountPrice: number,
    description: string,
    size: string,
    userId: string
}


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        typr: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: (value: number) => value > 0,
            message: (props: any) => `${props.value} is not a valid original price!`
        }
    },
    discountPrice: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: (value: number) => value > 0,
            message: (props: any) => `${props.value} is not a valid discount price!`
        }
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 500
    },
    size: {
        type: String,
        required: true
    },
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true });


const ProductModel = mongoose.model<IProduct>('Product', productSchema) || mongoose.models.Product;
export default ProductModel;