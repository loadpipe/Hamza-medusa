import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import CategoryTopButton from './category-top-button';
import { CgChevronRight } from 'react-icons/cg';
import vendors from '@modules/home/components/search-and-filter-panel/data/data';

const FilterBarStore = () => {
    const [startIdx, setStartIdx] = useState(0);

    const toggleShowMore = () => {
        // Update the starting index to show the next set of vendors
        const nextIndex = (startIdx + 1) % vendors.length; // Cycle through the list
        setStartIdx(nextIndex);
    };

    const visibleVendors = vendors
        .slice(startIdx, startIdx + 6)
        .concat(vendors.slice(0, Math.max(0, 6 - (vendors.length - startIdx))));

    return (
        <Flex maxW={'941px'} width={'100%'} position="relative">
            <Flex
                maxW={'941px'}
                width={'100%'}
                overflow={'hidden'}
                gap={'20px'}
                position="absolute"
            >
                {visibleVendors.map((vendor: any, index) => (
                    <CategoryTopButton
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
        </Flex>
    );
};

export default FilterBarStore;
