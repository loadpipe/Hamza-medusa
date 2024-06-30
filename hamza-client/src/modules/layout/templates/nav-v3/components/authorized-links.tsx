'use client';
import React from 'react';
import { Text, Box, MenuItem, MenuDivider } from '@chakra-ui/react';
import NavLink from './nav-link';
import { useCustomerAuthStore } from '@store/customer-auth/customer-auth';

const AuthorizedLinks = () => {
    const { authData } = useCustomerAuthStore();
    return (
        <>
            {authData.status === 'authenticated' && (
                <>
                    <NavLink href={`/account`}>
                        <MenuItem
                            fontWeight={'600'}
                            mt="1rem"
                            px="2rem"
                            color={'white'}
                            backgroundColor={'black'}
                            _hover={{
                                color: 'primary.green.900',
                            }}
                        >
                            <Text>Account</Text>
                        </MenuItem>
                    </NavLink>
                    <NavLink href={`/account`}>
                        <MenuItem
                            fontWeight={'600'}
                            mb="1rem"
                            px="2rem"
                            color={'white'}
                            backgroundColor={'black'}
                            _hover={{ color: 'primary.green.900' }}
                        >
                            <Text>Settings</Text>
                        </MenuItem>
                    </NavLink>
                    <Box px={{ base: '2rem', md: 0 }}>
                        <MenuDivider
                            opacity={{ base: '0.5', md: '1' }}
                            borderColor={'white'}
                        />
                    </Box>
                </>
            )}
        </>
    );
};

export default AuthorizedLinks;
