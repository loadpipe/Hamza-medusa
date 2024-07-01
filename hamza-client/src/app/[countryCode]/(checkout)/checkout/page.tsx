import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, useSearchParams } from 'next/navigation';
import { LineItem } from '@medusajs/medusa';

import { enrichLineItems, retrieveCart } from '@modules/cart/actions';
import Wrapper from '@modules/checkout/components/payment-wrapper';
import CheckoutForm from '@modules/checkout/templates/checkout-form';
import CheckoutSummary from '@modules/checkout/templates/checkout-summary';

export const metadata: Metadata = {
    title: 'Checkout',
};

const sleep = (seconds: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), seconds * 1000);
    });
};

const fetchCart = async (cartId: string) => {
    const cart = await retrieveCart(cartId);
    console.log(cart);

    if (cart?.items.length) {
        const enrichedItems = await enrichLineItems(
            cart?.items,
            cart?.region_id
        );
        cart.items = enrichedItems as LineItem[];
    }

    return cart;
};

export default async function Checkout(params: any) {
    let cartId = cookies().get('_medusa_cart_id')?.value;
    if (!cartId && params?.searchParams?.cart)
        cartId = params.searchParams.cart;

    if (!cartId) {
        console.log('cart id not found');
        return notFound();
    }

    const cart = await fetchCart(cartId);

    if (!cart) {
        console.log('cart data not found');
        return notFound();
    }

    return (
        <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12 bg-black">
            <Wrapper cart={cart}>
                <CheckoutForm />
            </Wrapper>
            <CheckoutSummary cartId={cartId} />
        </div>
    );
}
