import { http } from "@/common/https";

import { PublicationType } from "@/types";
import axios from "axios";

const baseUrl = process.env.BASE_URL;

export namespace PublicationService {
  export async function createPublication(data: PublicationType) {
    try {
      const response = await http.post("/publications", data);
      return response.data;
    } catch (error) {
      console.error("Error creating a Publication: ", error);
      throw error;
    }
  }

  export async function fetchPublications() {
    try {
      const response = await http.get("/publications");
      console.log(`Records: ${response.data}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching publications: ", error);
      throw error;
    }
  }

  export async function deletePublication(id?: string) {
    try {
      await http.delete(`/publications/${id}`);
    } catch (error) {
      console.error("Error deleting publications: ", error);
      throw error;
    }
  }

  export async function updatePublication(id: string, data: PublicationType) {
    try {
      const response = await http.patch(`/publications/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating Publication: ", error);
      throw error;
    }
  }
}
