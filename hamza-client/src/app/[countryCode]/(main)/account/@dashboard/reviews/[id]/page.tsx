import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { retrieveOrder } from '@lib/data';
import ReviewTemplate from '@modules/review/[id]/review-template';

type Props = {
    params: { id: string };
};

export default async function ReviewPage({ params }: Props) {
    const order = await retrieveOrder(params.id).catch(() => null);

    return (
        <div className="w-full bg-black text-white p-8">
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="text-2xl-semi">Orders</h1>
                <p className="text-base-regular">
                    View your previous orders and their status. You can also
                    create returns or exchanges for your orders if needed.
                </p>
            </div>
            <div>
                <ReviewTemplate item={order} />
            </div>
        </div>
    );
}
