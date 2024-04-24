import { headers } from 'next/headers';
import { Suspense } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { listRegions } from '@lib/data';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import CartButton from '@modules/layout/components/cart-button';
import WishListPopover from '@/components/header/wishlist-popover';
import SideMenu from '@modules/layout/components/side-menu';
import Image from 'next/image';
import logo from '../../../../../public/nav/hamza_logo.png';
export default async function Nav() {
    const regions = await listRegions().then((regions) => regions);

    return (
        <div className="sticky top-0 inset-x-0 z-50 group">
            <header className="relative h-16 mx-auto border-b duration-200 bg-white dark:bg-black border-ui-border-base">
                <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
                    <div className="flex-1 basis-0 h-full flex items-center">
                        <div className="font-sora h-full">
                            <SideMenu regions={regions} />
                        </div>
                    </div>

                    {/*Add ETH CURRENCY*/}
                    <div className="flex items-center h-full">
                        <LocalizedClientLink
                            href="/"
                            className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                        >
                            <Image
                                src={logo}
                                width={207.41}
                                height={57.27}
                                alt="Hamza Logo"
                            />
                        </LocalizedClientLink>
                    </div>

                    <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
                        <div className="hidden small:flex items-center gap-x-6 h-full">
                            {process.env.FEATURE_SEARCH_ENABLED && (
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href="/search"
                                    scroll={false}
                                >
                                    Search
                                </LocalizedClientLink>
                            )}
                            <LocalizedClientLink
                                className="hover:text-ui-fg-base font-sora"
                                href="/account"
                            >
                                Account
                            </LocalizedClientLink>
                        </div>
                        <Suspense
                            fallback={
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base font-sora"
                                    href="/wishlist"
                                >
                                    Wishlist (0)
                                </LocalizedClientLink>
                            }
                        >
                            <WishListPopover />
                        </Suspense>
                        <Suspense
                            fallback={
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base font-sora"
                                    href="/cart"
                                >
                                    Cart (0)
                                </LocalizedClientLink>
                            }
                        >
                            <CartButton />
                            <ConnectButton />
                        </Suspense>
                    </div>
                </nav>
            </header>
        </div>
    );
}
