import React, { useEffect, useState } from 'react';
import {
    getDefaultWallets,
    darkTheme,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
    injectedWallet,
    rainbowWallet,
    coinbaseWallet,
    metaMaskWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, optimismSepolia, sepolia } from 'wagmi/chains';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react';

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

export const darkThemeConfig = darkTheme({
    accentColor: '#94D42A',
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
});
export const { chains, publicClient, webSocketPublicClient } = configureChains(
    [optimismSepolia, sepolia],
    [
        alchemyProvider({
            apiKey: ALCHEMY_API_KEY,
        }),
        jsonRpcProvider({
            rpc: () => {
                return {
                    http: 'https://opt-sepolia.g.alchemy.com/v2/VrVSe8y0T1pBnrwgzgFr2vtHl9Dtj3Fn',
                };
            },
        }),
        publicProvider(),
    ]
);

export const SwitchNetwork = () => {
    const { chain } = useNetwork();
    const { error, isLoading, pendingChainId, switchNetwork } =
        useSwitchNetwork();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const voidFunction = () => { };

    const requiredChains = [11155111, 11155420]; // Sepolia and Optimism Sepolia

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    useEffect(() => {
        if (chain && requiredChains.includes(chain.id)) {
            onClose();
        } else {
            onOpen();
        }
    }, [chain, onClose, onOpen, requiredChains]);

    if (!chain) return <div>Loading...</div>;

    return (
        <Modal isOpen={isOpen} onClose={() => { }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Switch Network</ModalHeader>
                <ModalBody>
                    <p>The currently selected chain is not supported!</p>
                    <Button
                        disabled={!switchNetwork || isLoading}
                        onClick={() => switchNetwork ? switchNetwork(11155111) : voidFunction()}
                    >
                        Switch to Sepolia testnet
                    </Button>
                    <Button
                        disabled={!switchNetwork || isLoading}
                        onClick={() => switchNetwork ? switchNetwork(11155420) : voidFunction()}
                    >
                        Switch to Optimism Sepolia testnet
                    </Button>
                    {error && <p>Error: {error.message}</p>}
                    {isLoading && pendingChainId && (
                        <p>Switching to chain ID {pendingChainId}...</p>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
// const { connectors } = getDefaultWallets({
//     appName: 'op_sep',
//     projectId: PROJECT_ID,
//     chains,
// });

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            rainbowWallet({ projectId: PROJECT_ID, chains }),
            coinbaseWallet({ appName: PROJECT_ID, chains }),
            metaMaskWallet({
                projectId: PROJECT_ID,
                chains,
            }),
        ],
    },
]);

// Metamask, Rainbow, Coinbase Wallet, remove `WalletConnect`
// const connector = connectorsForWallets({
//     appName: 'op_sep',
//     projectId: PROJECT_ID,
//     chains,
//     wallets: [],
// });

// Config in v1.x.wagmi Client in 2.x.wagmi?
export const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});
