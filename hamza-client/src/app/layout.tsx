'use client';

import React from 'react';
import { Metadata } from 'next';
import 'styles/globals.css';
const BASE_URL =
    process.env.NEXT_PUBLIC_MEDUSA_CLIENT_URL || 'https://localhost:8000';
import MedusaProvider from '@/components/providers/medusa/medusa-provider'; // Import MedusaProvider
import { RainbowWrapper } from '@/components/providers/rainbowkit/rainbow-provider';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../styles/chakra-theme';
import { Toaster } from 'react-hot-toast';
// TODO: Refactor using scaffold-eth-2 for proper layout.

// export const metadata: Metadata = {
//     metadataBase: new URL(BASE_URL),
// };

// Define your custom colors

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" data-mode="dark">
            <body>
                <div>
                    <MedusaProvider>
                        <RainbowWrapper>
                            <ChakraProvider theme={theme}>
                                <main className="relative">
                                    {props.children}
                                </main>
                            </ChakraProvider>
                        </RainbowWrapper>
                    </MedusaProvider>
                    <div>
                        <Toaster position="top-right" />
                    </div>
                </div>
            </body>
        </html>
    );
}
