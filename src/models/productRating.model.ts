import mongoose from "mongoose";

interface IProductRating extends Document {
    rating: number,
    userId: string,
    productId: string,
    comment: string
}

const ProductRatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    }

}, { timestamps: true });

const ProductRatingModel = mongoose.model<IProductRating>('ProductRating', ProductRatingSchema) || mongoose.models.ProductRating;
export default ProductRatingModel;

