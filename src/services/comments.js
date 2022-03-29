import axios from "axios";

const comments_url = "https://jsonplaceholder.typicode.com/comments";

export const getAllComments = async () => {
  try {
    const comments = await axios.get(`${comments_url}`);
    console.log(comments.data);
    return comments.data;
  } catch (error) {
    console.log(error);
  }
};
