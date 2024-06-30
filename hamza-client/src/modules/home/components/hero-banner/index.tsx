'use client';

import React, { useState, useEffect } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { SwitchNetwork } from '@/components/providers/rainbowkit/rainbowkit-utils/rainbow-utils';

const HeroBanner = () => {
    const [opacity, setOpacity] = useState(1);

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(0, 1 - scrollY / 200);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <></>;
    }

    return (
        <>
            <Flex
                w="100%"
                bg="primary.indigo.900"
                color="white"
                py={2}
                mb={4}
                justifyContent="center"
                alignItems="center"
                style={{ opacity, transition: 'opacity 0.5s ease-out' }}
            >
                <Link href="https://blog.hamza.biz/affiliate/" isExternal>
                    <Text fontSize="lg" fontWeight="bold">
                        Become an affiliate
                    </Text>
                </Link>
            </Flex>
            <SwitchNetwork enabled={false} />
            <Flex
                px={6}
                pt={8}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                <Text
                    mb={{ sm: 3, md: '0' }}
                    lineHeight={'62px'}
                    color={'#FBFDFA'}
                    style={{ fontSize: '32px' }}
                >
                    Buy & Sell Products Using{' '}
                    <span style={{ color: '#7B61FF' }}>
                        <b>Crypto</b>
                    </span>{' '}
                    as a Community
                </Text>
                <b />
                <Flex
                    gap="10px"
                    flexDirection={{
                        base: 'column',
                        md: 'row',
                    }}
                    marginRight={{
                        base: 'auto',
                        md: '0',
                    }}
                >
                    <Text color={'#FBFDFA'} style={{ fontSize: '20px' }}>
                        By The <b>People</b>
                    </Text>
                    <Box
                        marginRight={{ base: 'auto', md: '0' }}
                        alignSelf="center"
                    >
                        <FaArrowRightLong size={24} color="#FBFDFA" />
                    </Box>
                    <Text color={'#FBFDFA'} style={{ fontSize: '20px' }}>
                        For The <b>People</b> Using Blockchain Tech
                    </Text>
                </Flex>
            </Flex>
        </>
    );
};

export default HeroBanner;
