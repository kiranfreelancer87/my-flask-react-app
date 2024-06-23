import axios from 'axios';

const API_BASE_URL = 'http://173.208.167.145:8080';


class ApiServices {
  getBaseUrl(): string {
    return API_BASE_URL
  }
  // Fetch a single category by ID
  async getCategory(id: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  // Fetch all categories
  async getAllCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all categories:', error);
      throw error;
    }
  }

  async createCategory(categoryData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Update an existing category
  async updateCategory(id: number, categoryData: any) {
    try {
      const response = await axios.put(`${API_BASE_URL}/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // Delete a category by ID
  async deleteCategory(id: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // Swap the order of two categories
  async swapCategoryOrder(id1: number, id2: number) {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories/swap`, { id1, id2 });
      return response.data;
    } catch (error) {
      console.error('Error swapping category order:', error);
      throw error;
    }
  }

  //Images Api
  // Fetch all images under a selected category
  async getImages(categoryId: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/images`);
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

  // Upload a new image under a selected category
  async uploadImage(categoryId: number, imageData: FormData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/categories/${categoryId}/images`,
        imageData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };


  // Delete an image by ID
  async deleteImage(imageId: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/images/${imageId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Swap the order of two images under a category
  async swapImageOrder(categoryId: number, id1: number, id2: number) {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories/${categoryId}/images/swap`, { id1, id2 });
      return response.data;
    } catch (error) {
      console.error('Error swapping image order:', error);
      throw error;
    }
  }

  // Mark an image as premium
  async markImagePremium(imageId: number) {
    try {
      const response = await axios.put(`${API_BASE_URL}/images/${imageId}/mark_premium`);
      return response.data;
    } catch (error) {
      console.error('Error marking image as premium:', error);
      throw error;
    }
  }

  // Remove premium status from an image
  async removeImagePremium(imageId: number) {
    try {
      const response = await axios.put(`${API_BASE_URL}/images/${imageId}/remove_premium`);
      return response.data;
    } catch (error) {
      console.error('Error removing premium status from image:', error);
      throw error;
    }
  }

  // Toggle premium status of an image
  async toggleImagePremium(imageId: number) {
    try {
      const response = await axios.put(`${API_BASE_URL}/images/${imageId}/toggle_premium`);
      return response.data;
    } catch (error) {
      console.error('Error toggling premium status of image:', error);
      throw error;
    }
  }

  //Notifications
  // Fetch all promotional messages
  async getAllPromotionalMessages() {
    try {
      const response = await axios.get(`${API_BASE_URL}/promotional_messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching promotional messages:', error);
      throw error;
    }
  }

  // Send a new promotional message
  async sendPromotionalMessage(messageData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/promotional_messages/send`, messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending promotional message:', error);
      throw error;
    }
  }

  // Delete a promotional message by ID
  async deletePromotionalMessage(messageId: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/promotional_messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting promotional message:', error);
      throw error;
    }
  }
}

export default new ApiServices();
