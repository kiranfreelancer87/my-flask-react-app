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
  TextField,
  Button,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiServices from '../services/ApiServices';
import { toast } from 'react-toastify';

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await ApiServices.getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await ApiServices.deleteCategory(id);
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSwapCategoryOrder = async (id1: number, id2: number) => {
    try {
      await ApiServices.swapCategoryOrder(id1, id2);
      fetchCategories(); // Refresh categories after swapping
      toast('Category order swapped successfully');
    } catch (error) {
      console.error('Error swapping category order:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const data = {'category': newCategoryName}
      await ApiServices.createCategory(data);
      fetchCategories();
      setNewCategoryName(''); // Clear the input field after adding
      toast('Category added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Categories
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              All Categories
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.category}</TableCell>
                      <TableCell>
                        {index > 0 && (
                          <IconButton
                            onClick={() => handleSwapCategoryOrder(categories[index - 1].id, category.id)}
                            color="primary"
                            aria-label="up"
                          >
                            <ArrowUpwardIcon />
                          </IconButton>
                        )}
                        {index < categories.length - 1 && (
                          <IconButton
                            onClick={() => handleSwapCategoryOrder(category.id, categories[index + 1].id)}
                            color="primary"
                            aria-label="down"
                          >
                            <ArrowDownwardIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => handleDeleteCategory(category.id)}
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
                      <TextField
                        label="New Category Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={handleAddCategory}>
                        Add Category
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

export default CategoryComponent;
