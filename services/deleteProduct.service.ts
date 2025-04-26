import productModel from "../models/productData.model";
import { StatusCodes } from "../utils/statusCodes";

export default async function deleteProductHelper(id: string) {
    try {
        const deletedUser = await productModel.deleteOne({ _id: id });
        return {
            status: StatusCodes.ACCEPTED,
            user: deletedUser,
        };
    } catch (error) {
        console.log("Error:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
        };
    }
}
