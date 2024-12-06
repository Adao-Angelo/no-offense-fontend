import { http } from "@/common/http";
import { type CommentType } from "@/types";

export namespace CommentService {
  export async function createComment(data: CommentType) {
    try {
      const response = await http().post("/comments", data);
      return response.data;
    } catch (error) {
      console.error("Error creating a Publication: ", error);
      throw error;
    }
  }

  export async function fetchComments(id: string) {
    try {
      const response = await http().get(`/comments/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching comments: ", error);
      throw error;
    }
  }

  export async function deleteComment(id?: string) {
    try {
      await http().delete(`/comments/${id}`);
    } catch (error) {
      console.error("Error deleting comments: ", error);
      throw error;
    }
  }

  export async function updateComment(id: string, data: CommentType) {
    try {
      const response = await http().patch(`/comments/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating Publication: ", error);
      throw error;
    }
  }
}
