import axios from 'axios';

const API_KEY = 'AIzaSyClu2V_22XpCG2GTe1euD35_Mh5bn4eTjA';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        type: 'video',
        maxResults: 20,
      },
    });
    console.log('API Response:', response.data); 
    return response.data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};
