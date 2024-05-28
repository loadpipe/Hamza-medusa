import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import ProductReviewService from 'src/services/product-review';
import { readRequestBody } from '../../../../utils/request-body';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const productReviewService: ProductReviewService = req.scope.resolve(
        'productReviewService'
    );

    const { customer_id, product_id } = readRequestBody(req.body, [
        'customer_id',
        'product_id',
    ]);
    console.log(
        `Customer ID is: ${customer_id} and Product ID is: ${product_id}`
    );
    try {
        const verify = await productReviewService.customerHasBoughtProduct(
            customer_id,
            product_id
        );
        res.json(verify);
    } catch (err) {
        console.error('Error fetching product verification:', err);
        res.status(500).json({
            error: 'Failed to verify customer',
        });
    }
};
