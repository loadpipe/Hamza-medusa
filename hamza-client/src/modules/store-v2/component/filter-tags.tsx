import React from 'react';
import { Text, Flex } from '@chakra-ui/react';
import useStorePage from '@store/store-page/store-page';
import FilterTag from './filter-tag';
import ReviewStar from '../../../../public/images/products/review-star.svg';
import { IoCloseOutline } from 'react-icons/io5';
import categoryIcons from '../data/category-icons';
import currencyIcons from '../data/crypto-currencies';

const FilterTags = () => {
    const {
        categorySelect,
        currencySelect,
        categoryTypeSelect,
        reviewStarsSelect,
        setCategorySelect,
        setCurrencySelect,
        setReviewStarsSelect,
    } = useStorePage();

    const filterTags = () => {
        const tags = [];
        if (categorySelect) {
            tags.push(
                <FilterTag
                    img={categoryTypeSelect ? categoryIcons[categoryTypeSelect] : ''}
                    key="category"
                    name={`${categorySelect}`}
                />
            );
        }
        if (currencySelect) {
            const currencyIcon = currencyIcons[currencySelect];
            tags.push(
                <FilterTag
                    img={currencyIcon}
                    key="currency"
                    name={`${currencySelect}`}
                />
            );
        }
        if (reviewStarsSelect) {
            // Check for non-null explicitly for numbers
            tags.push(
                <FilterTag img={ReviewStar} name={`${reviewStarsSelect}`} />
            );
        }
        return tags.length > 0 ? (
            tags
        ) : (
            <Text alignSelf={'center'} color={'primary.yellow.900'}>
                No filters applied.
            </Text>
        );
    };

    return (
        <Flex gap="20px">
            {filterTags()}
            <Flex
                height="63px"
                ml="auto"
                cursor={'pointer'}
                onClick={() => {
                    setCategorySelect(null);
                    setCurrencySelect(null);
                    setReviewStarsSelect(null);
                }}
            >
                <Text fontSize="16px" alignSelf={'center'} color={'white'}>
                    Clear All
                </Text>
                <Flex>
                    <IoCloseOutline
                        size={19}
                        color="white"
                        style={{ alignSelf: 'center', marginLeft: '5px' }}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default FilterTags;
