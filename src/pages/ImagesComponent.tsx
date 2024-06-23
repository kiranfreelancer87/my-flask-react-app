import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Button,
    TextField,
    MenuItem,
    Select,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiServices from '../services/ApiServices';
import { toast } from 'react-toastify';
import { ArrowDownward, Star, StarOutline } from '@mui/icons-material';

interface Image {
    id: number;
    image_url: string;
    premium: boolean;
}

interface Category {
    id: number;
    category: string;
    total_images: string
}

const ImagesComponent: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
    const [images, setImages] = useState<Image[]>([]);
    const [newImage, setNewImage] = useState<File | null>(null);
    const API_BASE_URL = `${ApiServices.getBaseUrl()}/`;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await ApiServices.getAllCategories();
            setCategories(fetchedCategories);
            if (fetchedCategories.length > 0) {
                setSelectedCategoryId(fetchedCategories[0].id);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        if (selectedCategoryId > 0) {
            fetchImages(selectedCategoryId);
        }
    }, [selectedCategoryId]);

    const fetchImages = async (categoryId: number) => {
        try {
            const fetchedImages = await ApiServices.getImages(categoryId);
            setImages(fetchedImages);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDeleteImage = async (id: number) => {
        try {
            await ApiServices.deleteImage(id);
            const updatedImages = images.filter((img) => img.id !== id);
            setImages(updatedImages);
            toast('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleTogglePremium = async (id: number, currentPremiumStatus: boolean) => {
        try {
            if (currentPremiumStatus) {
                await ApiServices.removeImagePremium(id);
                toast('Premium status removed from image successfully');
            } else {
                await ApiServices.markImagePremium(id);
                toast('Image marked as premium successfully');
            }
            fetchImages(selectedCategoryId || 0); // Refresh images after update
        } catch (error) {
            console.error('Error toggling premium status:', error);
        }
    };

    const handleUploadImage = async () => {
        try {
            if (!newImage) {
                toast.error('No image selected for uploading');
                return;
            }

            if (!selectedCategoryId) {
                toast.error('Please select a category before uploading');
                return;
            }

            const formData = new FormData();
            formData.append('image', newImage); // Ensure 'image' matches the expected key on the server

            await ApiServices.uploadImage(selectedCategoryId, formData);
            fetchImages(selectedCategoryId); // Refresh images after upload
            setNewImage(null); // Clear the input field after upload
            toast('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSwapImageOrder = async (id1: number, id2: number) => {
        try {
            await ApiServices.swapImageOrder(selectedCategoryId, id1, id2);
            const updatedImages = [...images];
            // Find the images with id1 and id2 and swap their positions
            const index1 = updatedImages.findIndex(img => img.id === id1);
            const index2 = updatedImages.findIndex(img => img.id === id2);
            if (index1 !== -1 && index2 !== -1) {
                // Swap positions
                const temp = updatedImages[index1];
                updatedImages[index1] = updatedImages[index2];
                updatedImages[index2] = temp;
                // Update state with the new order
                setImages(updatedImages);
                toast('Image order swapped successfully');
            }
        } catch (error) {
            console.error('Error swapping image order:', error);
        }
    };



    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Manage Images
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Select Category
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            value={selectedCategoryId || ''}
                            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            All Images
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Premium</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {images.map((image, index) => (
                                        <TableRow key={image.id}>
                                            <TableCell>{image.id}</TableCell>
                                            <TableCell><img style={{ width: 100, height: 100 }} src={API_BASE_URL + image.image_url}></img></TableCell>
                                            <TableCell><IconButton
                                                onClick={() => handleTogglePremium(image.id, image.premium)}
                                                color={image.premium ? 'secondary' : 'primary'}
                                                aria-label={image.premium ? 'remove premium' : 'mark premium'}
                                            >
                                                {image.premium ? <Star /> : <StarOutline />}
                                            </IconButton></TableCell>
                                            <TableCell>
                                                {index > 0 && (
                                                    <IconButton
                                                        onClick={() => handleSwapImageOrder(images[index - 1].id, image.id)}
                                                        color="primary"
                                                        aria-label="up"
                                                    >
                                                        <ArrowUpwardIcon />
                                                    </IconButton>
                                                )}
                                                {index < images.length - 1 && (
                                                    <IconButton
                                                        onClick={() => handleSwapImageOrder(image.id, images[index + 1].id)}
                                                        color="primary"
                                                        aria-label="down"
                                                    >
                                                        <ArrowDownward />
                                                    </IconButton>
                                                )}
                                                <IconButton
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    color="secondary"
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files?.[0] || null)} />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={handleUploadImage}>
                                                Upload Image
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ImagesComponent;
