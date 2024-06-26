import React, { useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import useSideFilter from '@store/store-page/side-filter';
import useModalFilter from '@store/store-page/filter-modal';
import categoryIcons from '../data/category-icons';

interface CategoryButtonProps {
    categoryName: string;
    categoryType: 'clothes' | 'games' | 'gadgets';
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    categoryName,
    categoryType,
}) => {
    const {
        categoryFilterSelect,
        setCategoryFilterSelect,
        setCategoryTypeFilterSelect,
    } = useSideFilter();

    return (
        <Flex>
            <Flex
                borderColor={'secondary.davy.900'}
                backgroundColor={
                    categoryFilterSelect === categoryName
                        ? 'white'
                        : 'transparent'
                }
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                borderWidth={'1px'}
                borderRadius={'49px'}
                cursor="pointer"
                color={
                    categoryFilterSelect === categoryName ? 'black' : 'white'
                }
                padding="10px 24px"
                _hover={{
                    background: 'white',
                    color: 'black',
                }}
                onClick={() => {
                    setCategoryFilterSelect(categoryName),
                        setCategoryTypeFilterSelect(categoryType);
                }}
            >
                <Image src={categoryIcons[categoryType]} alt={categoryName} />
                <Text ml="10px" fontSize={{ base: '14px', md: '16px' }}>
                    {categoryName}
                </Text>
            </Flex>
        </Flex>
    );
};

export default CategoryButton;
