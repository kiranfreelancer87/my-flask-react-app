// src/components/PromotionalMessages.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress, IconButton, TextField, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ApiServices from '../services/ApiServices';

interface PromotionalMessage {
    id: number;
    message_title: string;
    message_body: string;
    image_url: string | null;
    sent_at: string | null
}

const PromotionalMessages: React.FC = () => {
    const [messages, setMessages] = useState<PromotionalMessage[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [messageTitle, setMessageTitle] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [topicName, setTopicName] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const APP_BASE_URL = ApiServices.getBaseUrl();

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    const fetchMessages = async (page: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`${APP_BASE_URL}/promotional_messages?page=${page}`);
            setMessages(response.data);
            setTotalPages(response.data.length);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMessage = async (id: number) => {
        try {
            await axios.delete(`${APP_BASE_URL}/promotional_messages/${id}`);
            // Refresh messages after deletion
            fetchMessages(page);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('message_title', messageTitle);
        formData.append('message_body', messageBody);
        formData.append('topic_name', topicName);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post(`${APP_BASE_URL}/send_notification_to_topic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Clear form fields after successful submission
            setMessageTitle('');
            setMessageBody('');
            setTopicName('');
            setImage(null);
            // Refresh messages after sending
            fetchMessages(page);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Promotional Message History</Typography>
            <Box sx={{ mb: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Message Title"
                        variant="outlined"
                        fullWidth
                        value={messageTitle}
                        onChange={(e) => setMessageTitle(e.target.value)}
                        required
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        label="Message Body"
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        required
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        label="Topic Name"
                        variant="outlined"
                        fullWidth
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        required
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        type="file"
                        label="Image (Optional)"
                        fullWidth
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            setImage(target.files?.[0] || null);
                        }}
                        sx={{ mb: 1 }}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Send Notification
                    </Button>
                </form>
            </Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Message Title</TableCell>
                                    <TableCell>Message Body</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Sent At</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages && messages.map((message) => (
                                    <TableRow key={message.id}>
                                        <TableCell>{message.id}</TableCell>
                                        <TableCell>{message.message_title}</TableCell>
                                        <TableCell>{message.message_body}</TableCell>
                                        <TableCell><img style={{width: 100, height: 100}} src={`${APP_BASE_URL}/${message.image_url}`}></img></TableCell>
                                        <TableCell>{message.sent_at}</TableCell>
                                        <TableCell>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMessage(message.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PromotionalMessages;
