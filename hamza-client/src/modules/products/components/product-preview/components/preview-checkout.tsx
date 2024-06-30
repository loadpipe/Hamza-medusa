'use client';

import React, { useEffect, useState } from 'react';
import {
    Text,
    Card,
    Button,
    Flex,
    Box,
    Heading,
    Divider,
    textDecoration,
} from '@chakra-ui/react';
import useProductPreview from '@store/product-preview/product-preview';
import CurrencyButtonPreview from './currency-buttons';
import QuantityButton from './quantity-button';
import { addToCart } from '@modules/cart/actions';
import { useParams, useRouter } from 'next/navigation';
import ReviewStar from '../../../../../../public/images/products/review-star.svg';
import Image from 'next/image';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Link from 'next/link';
import { Variant } from 'types/medusa';
import { formatCryptoPrice } from '@lib/util/get-product-price';
import { useCustomerAuthStore } from '@store/customer-auth/customer-auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const PreviewCheckout = () => {
    const currencies: { [key: string]: 'ETH' | 'USDC' | 'USDT' } = {
        ETH: 'ETH',
        USDT: 'USDT',
        USDC: 'USDC',
    };

    let countryCode = useParams().countryCode as string;
    if (process.env.NEXT_PUBLIC_FORCE_US_COUNTRY)
        countryCode = process.env.NEXT_PUBLIC_FORCE_US_COUNTRY;
    const colorSample = ['black', 'white', 'red', 'teal'];

    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [price, setSelectedPrice] = useState('');
    const [isWhitelisted, setIsWhitelisted] = useState(false);

    const { productData, variantId, quantity } = useProductPreview();
    const { preferred_currency_code } = useCustomerAuthStore();
    const { whitelist_config, setWhitelistConfig, authData } =
        useCustomerAuthStore();
    const router = useRouter();

    const getUniqueOptions = (
        variants: Variant[],
        optionIndex: number
    ): string[] => {
        const optionsSet = new Set<string>(
            variants.map((variant) => variant.title.split(' / ')[optionIndex])
        );
        return Array.from(optionsSet);
    };

    useEffect(() => {
        if (productData && productData.variants) {
            setSizes(getUniqueOptions(productData.variants, 0));
            setColors(getUniqueOptions(productData.variants, 1));
            const price = productData.variants[0].prices.find((p: any) => p.currency_code === preferred_currency_code ?? 'usdt');
            setSelectedPrice(price?.amount ?? 0);
            console.log(productData);
        }
    }, [productData]);

    const handleColorSelect = (color: any) => {
        setSelectedColor(color);
    };

    const handleAddToCart = async () => {
        await addToCart({
            variantId: productData.variants[0].id,
            quantity: quantity,
            countryCode: countryCode,
            currencyCode: 'eth',
        });
    };

    const whitelistedProductHandler = async () => {
        let res = await axios.get(
            `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/custom/product/get-store?product_id=${productData.id}`
        );
        let data = res.data;
        console.log(data);

        if (data.status == true) {
            console.log('white list config ', whitelist_config);
            const whitelistedProduct =
                whitelist_config.is_whitelisted &&
                    whitelist_config.whitelisted_stores.includes(data.data)
                    ? true
                    : false;

            console.log('white listed product ', whitelistedProduct);

            setIsWhitelisted(whitelistedProduct);
        }
        return;
    };

    const inStock =
        productData &&
            productData.variants &&
            productData.variants[0] &&
            productData.variants[0].inventory_quantity > 0
            ? true
            : false;

    useEffect(() => {
        if (
            authData.status == 'authenticated' &&
            productData &&
            productData.variants &&
            productData.variants[0] &&
            productData.variants[0].allow_backorder
        ) {
            console.log('running whitelist product handler');
            whitelistedProductHandler();
        }
    }, [authData.status, productData]);

    useEffect(() => {
        console.log(inStock, isWhitelisted);
    }, [inStock, isWhitelisted]);

    return (
        <Flex
            padding={{ base: '0', md: '2rem' }}
            borderRadius={{ base: '0px', md: '16px' }}
            maxW={{ base: '100%', md: '504px' }}
            width={'100%'}
            flexDirection={'column'}
            backgroundColor={{ base: 'transparent', md: '#121212' }}
            overflow={'hidden'}
        >
            <Flex gap="10px" flexDirection={'column'}>
                <Heading
                    display={{ base: 'block', md: 'none' }}
                    fontSize={'16px'}
                    color="white"
                >
                    {productData.title}
                </Heading>
                <Heading
                    display={{ base: 'none', md: 'block' }}
                    fontSize={'16px'}
                    color="primary.green.900"
                >
                    Listing Price
                </Heading>
                <Flex gap="10px" mb="-0.5rem">
                    <CurrencyButtonPreview
                        width="24px"
                        height="24px"
                        currencyName={currencies['USDC']}
                    />
                    <Heading
                        fontSize={{ base: '18px', md: '32px' }}
                        color="white"
                    >
                        {`${formatCryptoPrice(parseFloat(price), preferred_currency_code ?? 'usdc')} ${preferred_currency_code?.toUpperCase() ?? 'USDC'}`}
                    </Heading>
                    <Text
                        style={{ textDecoration: 'line-through' }}
                        alignSelf={'center'}
                        fontSize={{ base: '9px', md: '18px' }}
                        display={{ base: 'none', md: 'block' }}
                        color="#555555"
                    >
                        {`${formatCryptoPrice(parseFloat(price), preferred_currency_code ?? 'usdc')}`}
                    </Text>
                </Flex>

                <Heading
                    display={{ base: 'none', md: 'block' }}
                    as="h3"
                    variant="semibold"
                    fontSize={'18px'}
                    color="white"
                >
                    {`${formatCryptoPrice(parseFloat(price), preferred_currency_code ?? 'usdc')} ${preferred_currency_code?.toUpperCase() ?? 'USDC'}`}
                </Heading>
                <Flex gap="5px" height="20px">
                    <Flex flexDirection={'row'}>
                        <Image src={ReviewStar} alt={'star'} />
                        <Image src={ReviewStar} alt={'star'} />
                        <Image src={ReviewStar} alt={'star'} />
                        <Image src={ReviewStar} alt={'star'} />
                        <Image src={ReviewStar} alt={'star'} />
                    </Flex>

                    <Flex flexDirection={'row'}>
                        <Heading
                            as="h4"
                            variant="semibold"
                            fontSize={'16px'}
                            color={'white'}
                            alignSelf={'center'}
                            mt="2px"
                        >
                            4.97
                        </Heading>
                        <Heading
                            ml="4px"
                            as="h4"
                            variant="semibold"
                            fontSize={'16px'}
                            color={'#555555'}
                            alignSelf={'center'}
                            mt="2px"
                        >
                            (0 Reviews)
                        </Heading>
                    </Flex>
                </Flex>

                <Heading
                    display={{ base: 'none', md: 'flex' }}
                    as="h4"
                    fontSize="16px"
                    color="white"
                >
                    Also available in other currencies
                </Heading>
                <Flex display={{ base: 'none', md: 'flex' }} gap="10px">
                    {Object.keys(currencies)
                        .filter((key: string) => currencies[key] !== 'USDC')
                        .map((key) => (
                            <CurrencyButtonPreview
                                width="20px"
                                height="20px"
                                key={key}
                                currencyName={currencies[key]}
                            />
                        ))}
                </Flex>
            </Flex>
            <Divider
                color="#555555"
                display={{ base: 'block', md: 'none' }}
                mt="1rem"
            />
            {/* Varients */}
            <Flex width={'100%'} flexDirection={'column'} mt="1rem">
                <Flex flexDirection="column" gap="10px">
                    <Heading
                        as="h3"
                        fontSize={{ base: '14px', md: '18px' }}
                        color="white"
                    >
                        Size
                    </Heading>
                    <Flex gap="10px" wrap="wrap">
                        {sizes.length > 0 ? (
                            sizes.map((size, index) => (
                                <Flex
                                    backgroundColor={'transparent'}
                                    key={index}
                                    borderWidth={'1px'}
                                    px="16px"
                                    py="8px"
                                    borderRadius="full"
                                    borderColor={'#3E3E3E'}
                                >
                                    <Text
                                        fontSize={{ base: '10px', md: '16px' }}
                                        color="white"
                                    >
                                        {size}
                                    </Text>
                                </Flex>
                            ))
                        ) : (
                            <Text color="primary.green.900">
                                No sizes available
                            </Text>
                        )}
                    </Flex>
                </Flex>
                <Flex flexDirection="column" my="1rem" gap="10px">
                    <Heading
                        as="h3"
                        fontSize={{ base: '14px', md: '18px' }}
                        color="white"
                    >
                        Color
                    </Heading>
                    <Flex gap="10px" wrap="wrap">
                        {colorSample.length > 0 ? (
                            colorSample.map((color, index) => (
                                <Flex
                                    key={index}
                                    p="2px"
                                    borderRadius="full"
                                    borderWidth={'2px'}
                                    width={{ base: '40px', md: '52px' }}
                                    height={{ base: '40px', md: '52px' }}
                                    borderColor={
                                        color === selectedColor ||
                                            (selectedColor === '' && index === 0)
                                            ? 'white'
                                            : 'transparent'
                                    }
                                    backgroundColor={'transparent'}
                                    cursor="pointer"
                                    justifyContent={'center'}
                                    onClick={() => handleColorSelect(color)}
                                >
                                    <Box
                                        alignSelf={'center'}
                                        width={{ base: '24px', md: '36px' }}
                                        height={{ base: '24px', md: '36px' }}
                                        borderRadius="full"
                                        backgroundColor={color}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    />
                                </Flex>
                            ))
                        ) : (
                            <Text color="primary.green.900">
                                No colors available
                            </Text>
                        )}
                    </Flex>
                    {/* <Flex gap="10px">
                        {colors.length > 0 ? (
                            colors.map((color, index) => (
                                <Flex
                                    key={index}
                                    p="2px"
                                    borderRadius="full"
                                    borderWidth={'2px'}
                                    width="52px"
                                    height="52px"
                                    borderColor={
                                        color === selectedColor ||
                                        (selectedColor === '' && index === 0)
                                            ? 'white'
                                            : 'transparent'
                                    }
                                    backgroundColor={'transparent'}
                                    cursor="pointer"
                                    justifyContent={'center'}
                                    onClick={() => handleColorSelect(color)}
                                >
                                    <Box
                                        alignSelf={'center'}
                                        width="36px"
                                        height="36px"
                                        borderRadius="full"
                                        backgroundColor={color}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    />
                                </Flex>
                            ))
                        ) : (
                            <Text color="primary.green.900">
                                No colors available
                            </Text>
                        )}
                    </Flex> */}
                </Flex>

                <QuantityButton />

                <Button
                    onClick={() => {
                        if (!inStock && isWhitelisted) {
                            handleAddToCart();
                            router.push('/checkout?step=address');

                            return;
                        }
                        if (inStock) {
                            handleAddToCart();
                            router.push('/checkout?step=address');

                            return;
                        }
                        if (!inStock && !isWhitelisted) {
                            toast.error('Out of stock');
                        }
                    }}
                    borderRadius={'56px'}
                    height={{ base: '40px', md: '75px' }}
                    width="100%"
                    backgroundColor={'primary.yellow.900'}
                    fontSize={{ base: '12px', md: '18px' }}
                >
                    Buy Now
                </Button>
                {!inStock && isWhitelisted && (
                    <span className="text-xs text-white px-4 py-2">
                        You can buy it as you are whitelisted customer
                    </span>
                )}

                <Button
                    disabled={!inStock && !isWhitelisted}
                    onClick={() => {
                        if (!inStock && isWhitelisted) {
                            handleAddToCart();
                            return;
                        }
                        if (inStock) {
                            handleAddToCart();
                            return;
                        }
                        if (!inStock && !isWhitelisted) {
                            toast.error('Out of stock');
                        }
                    }}
                    borderRadius={'56px'}
                    height={{ base: '40px', md: '75px' }}
                    borderWidth={'1px'}
                    color="primary.yellow.900"
                    borderColor={'primary.yellow.900'}
                    backgroundColor={'transparent'}
                    mt="1rem"
                    fontSize={{ base: '12px', md: '18px' }}
                    _hover={{
                        color: 'black',
                        bg: 'white',
                        borderColor: 'white',
                    }}
                >
                    {!inStock && isWhitelisted
                        ? 'Add to cart'
                        : inStock
                            ? 'Add to Cart'
                            : 'Out of Stock'}
                </Button>
                {!inStock && isWhitelisted && (
                    <span className="text-xs text-white px-4 py-2">
                        You can add it as you are whitelisted customer
                    </span>
                )}

                <Divider
                    color="#555555"
                    display={{ base: 'block', md: 'none' }}
                    mt="2rem"
                />
            </Flex>
        </Flex>
    );
};

export default PreviewCheckout;
