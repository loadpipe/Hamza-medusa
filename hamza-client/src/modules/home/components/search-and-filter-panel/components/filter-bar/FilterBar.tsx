import React, { useEffect, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import useStorePage from '@store/store-page/store-page';
import CategoryButtons from './components/CategoryButtons';
import vendors from '../../data/data';
import FilterButton from './components/FilterButton';
import { CgChevronRight } from 'react-icons/cg';
import FilterModalHome from './components/FilterModal';
import useHomeProductsPage from '@store/home-page/product-layout/product-layout';

const FilterBar = () => {
    const { categorySelect } = useHomeProductsPage();
    const [vendorName, setVendorName] = useState('Legendary Light Design');
    const [isClient, setIsClient] = useState(false);
    const [startIdx, setStartIdx] = useState(0); // State to keep track of the starting index of visible vendors

    // const { setModalFilterSelected } = useModalFilter();
    const [showFilterModal, setShowFilterModal] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Ensure that the component knows when it's running on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (categorySelect) {
            setVendorName(categorySelect);
        }
    }, [categorySelect]);

    const toggleShowMore = () => {
        // Update the starting index to show the next set of vendors
        const nextIndex = (startIdx + 1) % vendors.length; // Cycle through the list
        setStartIdx(nextIndex);
    };

    const visibleVendors = vendors
        .slice(startIdx, startIdx + 6)
        .concat(vendors.slice(0, Math.max(0, 6 - (vendors.length - startIdx))));

    return (
        <Flex
            mt={{ base: '2.5rem', md: '4rem' }}
            maxW={'1280px'}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Flex
                mx="1rem"
                maxW={'1249px'}
                width={'100%'}
                overflow={'hidden'}
                gap={'20px'}
                position="relative"
            >
                <FilterButton onClick={() => onOpen()} />
                {visibleVendors.map((vendor: any, index) => (
                    <CategoryButtons
                        key={index}
                        categoryType="clothes"
                        categoryName={vendor.vendorName}
                    />
                ))}
                <Flex
                    w="50px"
                    height={{ base: '42px', md: '63px' }}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onClick={toggleShowMore}
                    cursor="pointer"
                    position="absolute"
                    right="0"
                    top="0"
                    bg="linear-gradient(90deg, rgba(44, 39, 45, 0) 0%, #2C272D 50%)" // Applying linear gradient
                >
                    <Flex
                        w="35px"
                        height={'100%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        alignSelf={'center'}
                    >
                        <CgChevronRight size="4rem" color="white" />
                    </Flex>
                </Flex>
            </Flex>
            <FilterModalHome isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default FilterBar;
