'use client';

import React, { useEffect, useState } from 'react';
import { Flex, Container, Box } from '@chakra-ui/react';
// import ProductCardGroup from '@modules/products/components/product-card-group';
import SideMenu from './component/store-side-menu';
import useStorePage from '@store/store-page/store-page';
import useSideFilter from '@store/store-page/side-filter';
import MobileFilter from './component/mobile-fitler/mobile-filter';
import ProductCardGroup from '@modules/products/components/product-group-store';
import StoreFilterDisplay from '@modules/store-v2/component/store-filter-display';

const StoreTemplate = () => {
    //ipad pro 1024px
    //ipad air 820px (hide left)

    const { categorySelect } = useStorePage();
    const { reviewFilterSelect } = useSideFilter();

    //TODO: make zustand state for default vendor "all"
    const [vendorName, setVendorName] = useState('Legendary Light Design');
    useEffect(() => {
        if (categorySelect) {
            setVendorName(categorySelect);
        }
    }, [categorySelect]);

    useEffect(() => {
        console.log(`${reviewFilterSelect}`);
    }, [reviewFilterSelect]);

    return (
        <Flex width={'100%'} flexDirection={'column'} my="2rem">
            <Flex
                width={'100%'}
                flexDirection={{ base: 'column', md: 'row' }}
                maxWidth={'1280px'}
                mx="auto"
            >
                <SideMenu />
                <MobileFilter />
                <ProductCardGroup
                    filterByRating={reviewFilterSelect}
                    vendorName={vendorName}
                    category=""
                />
            </Flex>
        </Flex>
    );
};

export default StoreTemplate;
