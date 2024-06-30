import React, { useState } from 'react';
import mobileFilter from '../../../../../public/images/categories/mobile-filter.svg';
import {
    Flex,
    Box,
    Input,
    Text,
    InputGroup,
    InputRightElement,
    useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { MdChevronLeft } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import FilterModal from './components/filter-modal';
import useModalFilter from '@store/store-page/filter-modal';

const MobileFilter = () => {
    const { setModalFilterSelected } = useModalFilter();

    const [showFilterModal, setShowFilterModal] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            width={'100%'}
            display={{ base: 'flex', md: 'none' }}
            my="2rem"
            px="1rem"
            gap={'12px'}
        >
            {/* back button */}
            <Box alignSelf={'center'} width={'30px'} cursor={'pointer'}>
                <MdChevronLeft
                    color="white"
                    size={40}
                    style={{ marginRight: 'auto' }}
                />
            </Box>
            {/* search bar */}
            <InputGroup>
                <Input
                    width="100%"
                    height="52px"
                    borderWidth={'2px'}
                    borderColor={'#3E3E3E'}
                    borderRadius={'full'}
                />
                <InputRightElement
                    height="100%"
                    display="flex"
                    alignItems="center"
                    pointerEvents="none"
                    mr="3"
                >
                    <FaSearch size={20} color="white" />
                </InputRightElement>
            </InputGroup>
            {/* filter button */}
            <Box>
                <Flex
                    onClick={() => {
                        onOpen();
                        setModalFilterSelected(true);
                    }}
                    wrap={'nowrap'}
                    ml="auto"
                    borderWidth={'2px'}
                    width={'52px'}
                    height={'52px'}
                    borderRadius={'full'}
                    borderColor={'#3E3E3E'}
                    justifyContent={'center'}
                    cursor={'pointer'}
                    _hover={{
                        borderColor: 'white',
                    }}
                >
                    <Image
                        style={{
                            width: '18px',
                            height: '18px',
                            alignSelf: 'center',
                        }}
                        src={mobileFilter}
                        alt="mobile filter"
                    />
                </Flex>
            </Box>
            <FilterModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default MobileFilter;
