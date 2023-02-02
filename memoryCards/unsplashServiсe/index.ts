import axios from 'axios';

const client_id = 'ayg6WVIHzxcmWFQ7RHw7gEOHHjd5K8KsnTrB342PtN8';
const baseUrl = 'https://api.unsplash.com';

const getRandomPhotos = async (query: string, count: number) => {
  try {
    const res = await axios.get(`${baseUrl}/photos/random`, {
      params: { query, count },
      headers: {
        Authorization: `Client-ID ${client_id}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

const getPhotoById = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/photos`, {
      params: { id },
      headers: {
        Authorization: `Client-ID ${client_id}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export { getRandomPhotos, getPhotoById };
