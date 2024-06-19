'use client';

import React, { useEffect, useState } from 'react';
import { Text, Card, Button, Flex, Box, Heading } from '@chakra-ui/react';
import useProductPreview from '@store/product-preview/product-preview';
import Image from 'next/image';
import currencyIcons from '../../../../../../public/images/currencies/crypto-currencies';
import CurrencyButtonPreview from './currency-buttons';
import ReviewStar from '../../../../../../public/images/categories/';
import QuantityButton from './quantity-button';

const PreviewCheckout = () => {
    const currencies = {
        ETH: 'ETH',
        USDT: 'USDT',
        USDC: 'USDC',
    };

    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [price, setSelectedPrice] = useState('');

    const { productData } = useProductPreview();

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
            setSelectedPrice(productData.variants[0].prices[0].amount);
            console.log(productData);
        }
    }, [productData]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    console.log(productData);

    return (
        <Card
            padding="2rem"
            borderRadius={'16px'}
            height={'739px'}
            maxW={'504px'}
            width={'100%'}
            backgroundColor={'#121212'}
        >
            <Text color="primary.green.900">Listing Price</Text>
            <Flex gap="12px">
                <CurrencyButtonPreview currencyName={currencies['USDC']} />
                <Text fontSize={'32px'} color="white">
                    {price}
                </Text>
            </Flex>
            <Heading as="h3" color="white">
                {price}
            </Heading>
            <Heading as="h4" fontSize="16px" color="white">
                Also available in other currencies
            </Heading>
            <Flex mt="10px" gap="7px">
                {Object.keys(currencies)
                    .filter((key) => currencies[key] !== 'USDC')
                    .map((key) => (
                        <CurrencyButtonPreview
                            key={key}
                            currencyName={currencies[key]}
                        />
                    ))}
            </Flex>
            <Flex width={'100%'} flexDirection={'column'}>
                <Flex flexDirection="column" mt="2rem">
                    <Heading as="h3" fontSize={'18px'} color="white">
                        Size:
                    </Heading>
                    <Flex mt="1rem" gap="10px">
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
                                    <Text color="white">{size}</Text>
                                </Flex>
                            ))
                        ) : (
                            <Text color="primary.green.900">
                                No sizes available
                            </Text>
                        )}
                    </Flex>
                </Flex>
                <Flex flexDirection="column" my="1rem">
                    <Heading as="h3" fontSize={'18px'} color="white">
                        Color :
                    </Heading>
                    <Flex mt="1rem" gap="10px">
                        {colors.length > 0 ? (
                            colors.map((color, index) => (
                                <Flex
                                    key={index}
                                    p="2px" // Padding creates the space for the ring
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
                                    backgroundColor={'transparent'} // Change the background color to show selection
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
                    </Flex>
                </Flex>

                <QuantityButton />
                <Button
                    borderRadius={'56px'}
                    height="75px"
                    backgroundColor={'primary.yellow.900'}
                >
                    Buy Now
                </Button>
                <Button
                    borderRadius={'56px'}
                    height="75px"
                    borderWidth={'1px'}
                    color="white"
                    borderColor={'primary.yellow.900'}
                    backgroundColor={'transparent'}
                    mt="1rem"
                    _hover={{
                        color: 'black',
                        bg: 'white',
                        borderColor: 'white',
                    }}
                >
                    Add To Cart
                </Button>
            </Flex>
        </Card>
    );
};

export default PreviewCheckout;
