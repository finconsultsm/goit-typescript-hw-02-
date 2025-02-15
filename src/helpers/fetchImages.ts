import axios from "axios";

const API_KEY = "dnrFc9qrIvpCgXg4-E7-REOvDksR52RbcqAI--Q37lY";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export const fetchImages = async (query: string, page: number = 1): Promise<Image[]> => {
  const params = {
    query,
    per_page: 12,
    page,
  };

  const API_URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}`;

  try {
    const response = await axios.get(API_URL, { params });
    return response.data.results as Image[];
  } catch (error) {
    throw new Error("Failed to fetch images from Unsplash API.");
  }
};
