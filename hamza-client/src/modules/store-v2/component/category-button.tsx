import React, { useState } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import useStorePage from '@store/store-page/store-page';

const CategoryButton = (props: any) => {
    const { categorySelect, setCategorySelect } = useStorePage();

    return (
        <Flex>
            <Flex
                borderColor={
                    props.view === 'filter-display'
                        ? 'transparent'
                        : 'secondary.davy.900'
                }
                backgroundColor={
                    props.view === 'filter-display' ? '#020202' : 'transparent'
                }
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                borderWidth={'1px'}
                borderRadius={'49px'}
                cursor="pointer"
                style={{ padding: '10px 24px' }}
                _hover={{
                    background: 'white',
                }}
                onClick={() => setSelected(true)}
            >
                {/* <Text marginRight={'8px'}>icon</Text> */}
                <Text
                    color="white"
                    _hover={{
                        color: 'black',
                    }}
                >
                    {props.name}
                </Text>
            </Flex>
        </Flex>
    );
};

export default CategoryButton;
