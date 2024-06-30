import React, { useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import CategoryTopButton from './category-top-button';
import useStorePage from '@store/store-page/store-page';
import FilterTags from './filter-tags';
import { FaGreaterThan } from 'react-icons/fa';

const StoreFilterDisplay = () => {
    const { categorySelect } = useStorePage();
    return (
        <Flex
            display={{ base: 'none', md: 'flex' }}
            width={'100%'}
            flexDirection={'column'}
        >
            <Flex flexDirection={'column'} gap="1rem">
                <Flex gap="10px">
                    <Text color="White" fontSize={'18px'}>
                        Home
                    </Text>
                    <Flex alignSelf={'center'}>
                        <FaGreaterThan size={12} color="white" />
                    </Flex>
                    <Text fontSize={'18px'} color="primary.indigo.900">
                        {categorySelect}
                    </Text>
                </Flex>
                <Flex gap="20px" overflow={'hidden'}>
                    <CategoryTopButton
                        categoryType="home_light"
                        categoryName="Legendary Light Design"
                    />
                    <CategoryTopButton
                        categoryType="gadgets"
                        categoryName="Dauntless"
                    />
                    <CategoryTopButton
                        categoryType="clothes"
                        categoryName="Medusa Merch"
                    />
                    <CategoryTopButton
                        categoryType="games"
                        categoryName="Echo Rift"
                    />
                </Flex>
                <Text fontSize={'18px'} color="primary.indigo.900">
                    Filters Applied
                </Text>
                <FilterTags />
            </Flex>
        </Flex>
    );
};

export default StoreFilterDisplay;
