import mongoose from "mongoose";
import validator from 'validator';
interface IProductImage extends Document {
    imageUrl: string,
    productId: string
}

const productImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => validator.isURL(value),
            message: (props: any) => `${props.value} is not a valid url!`
        }
    },
    productId: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });


const ProductImageModel = mongoose.model<IProductImage>('ProductImage', productImageSchema) || mongoose.models.ProductImage;
export default ProductImageModel;