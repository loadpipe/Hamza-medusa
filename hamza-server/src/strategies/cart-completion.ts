import {
    AbstractCartCompletionStrategy,
    CartCompletionResponse,
    IdempotencyKey,
    IdempotencyKeyService,
} from '@medusajs/medusa';
import { RequestContext } from '@medusajs/medusa/dist/types/request';

type InjectedDependencies = {
    idempotencyKeyService: IdempotencyKeyService;
};

class CartCompletionStrategy extends AbstractCartCompletionStrategy {
    protected readonly idempotencyKeyService_: IdempotencyKeyService;

    constructor({ idempotencyKeyService }: InjectedDependencies) {
        super(arguments[0]);
        this.idempotencyKeyService_ = idempotencyKeyService;
    }

    complete(
        cartId: string,
        idempotencyKey: IdempotencyKey,
        context: RequestContext
    ): Promise<CartCompletionResponse> {
        throw new Error('Method not implemented.');
    }
}

export default CartCompletionStrategy;
