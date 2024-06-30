'use client';

import React, { useState, useEffect, Suspense } from 'react';
import ProductCardGroup from '../product-layout';
import { Box, Container, Flex, Button, Text } from '@chakra-ui/react';
import FilterButtons from './components/FilterButtons';
import vendors from './data/data';
import { RiMenu2Fill } from 'react-icons/ri';
import Reputation from '../reputation';
import SearchBar from './components/SearchBar';
import SearchModalWrapper from '@modules/search/templates/search-wrapper';
import SkeletonProductGrid from '@modules/skeletons/components/skeleton-product-grid';

const SearchAndFilterPanel = () => {
    const [vendorName, setVendorName] = useState('Legendary Light Design');
    const [isClient, setIsClient] = useState(false);

    // Ensure that the component knows when it's running on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Box>
            <SearchBar />
            <Container py="8" maxW="1280px">
                <Flex gap="1rem">
                    {vendors.map((vendor: any) => (
                        <FilterButtons
                            key={vendor.id}
                            title={vendor.vendorName}
                            selected={vendorName}
                            setVendorName={() =>
                                setVendorName(vendor.vendorName)
                            }
                        />
                    ))}
                    <Button
                        display="flex"
                        justifyContent={'center'}
                        height="60px"
                        padding="10px 24px"
                        gap="10px"
                        borderRadius="56px"
                        borderWidth="1px"
                        borderColor="white"
                        backgroundColor={'transparent'}
                        color={'white'}
                    >
                        <RiMenu2Fill size={24} color={'white'} />
                        <Text color={'white'} alignSelf="center" pl="2">
                            Filter
                        </Text>
                    </Button>
                </Flex>
            </Container>
            {isClient ? (
                <Suspense fallback={<SkeletonProductGrid />}>
                    <ProductCardGroup vendorName={vendorName} />
                </Suspense>
            ) : (
                <SkeletonProductGrid />
            )}
        </Box>
    );
};

export default SearchAndFilterPanel;
