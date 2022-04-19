import axios from "axios";

export const fetchAPI = async (searchImg, page) => {
  const URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '21994966-77efd84e81d037cb6b64d4ef6',
      q: searchImg,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  };

  const response = await axios.get(URL, options);
  return response.data;
};