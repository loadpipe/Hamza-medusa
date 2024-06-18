import { Box, Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import useProductPreview from '@store/product-preview/product-preview';
import React, { useEffect, useState } from 'react';

const PreviewGallery = () => {
    const { productData } = useProductPreview();
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (productData !== null) {
            setImages(productData?.images || []);
        }
    }, [productData]);

    //TODO: If each product needs 5 images how will we handle blank images?
    return (
        <Flex maxWidth={'1280px'} width={'100%'} flexDirection={'column'}>
            <Grid templateColumns="2fr 1fr" gap={4}>
                <GridItem>
                    <Box
                        backgroundColor={'white'}
                        height="504.11px"
                        maxHeight="504.11px"
                        maxW={'716.04px'}
                        overflow="hidden"
                        borderLeftRadius={'16px'}
                    >
                        {images.length > 0 && (
                            <Image
                                src={images[0].url}
                                alt="Left Image"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                            />
                        )}
                    </Box>
                </GridItem>
                <GridItem>
                    <Grid templateColumns="1fr 1fr" gap={4}>
                        <GridItem>
                            <Box
                                backgroundColor={'white'}
                                width="257.4px"
                                height="245.18px"
                            >
                                <Image
                                    src="path/to/your/image2.jpg"
                                    alt="Top Left Image"
                                    width="100%"
                                />
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                borderTopRightRadius={'16px'}
                                backgroundColor={'white'}
                                width="257.4px"
                                height="245.18px"
                            >
                                <Image
                                    src="path/to/your/image2.jpg"
                                    alt="Top Left Image"
                                    width="100%"
                                />
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                backgroundColor={'white'}
                                width="257.4px"
                                height="245.18px"
                            >
                                <Image
                                    src="path/to/your/image2.jpg"
                                    alt="Top Left Image"
                                    width="100%"
                                />
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box
                                borderBottomRightRadius={'16px'}
                                backgroundColor={'white'}
                                width="257.4px"
                                height="245.18px"
                            >
                                <Image
                                    src="path/to/your/image2.jpg"
                                    alt="Top Left Image"
                                    width="100%"
                                />
                            </Box>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default PreviewGallery;
