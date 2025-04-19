import { addData, getData, updateData, deleteData } from './firebase'; // Import the necessary Firebase functions

export const getPosts = async () => {
  try {
    const posts = await getData('todos');
    if (!posts) return [];
    return Object.keys(posts).map(key => ({
      id: key,
      ...posts[key]
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const postPosts = async (postData) => {
  try {
    const result = await addData('todos', postData);
    if (!result.success) {
      throw new Error("Failed to add post");
    }
    return {
      id: result.id,
      ...postData
    };
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const deletePosts = async (postId) => {
  try {
    const result = await deleteData(`todos/${postId}`);
    if (!result.success) {
      throw new Error("Failed to delete post");
    }
    return postId;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const updatePost = async (postId, updatedData) => {
  try {
    const result = await updateData(`todos/${postId}`, updatedData);
    if (!result.success) {
      throw new Error("Failed to update post");
    }
    return { id: postId, ...updatedData };
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
