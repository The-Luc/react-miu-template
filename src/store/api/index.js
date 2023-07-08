import axiosClient from './base';

if (!localStorage.getItem('SPOTIFY_TOKEN')) {
  localStorage.setItem('SPOTIFY_TOKEN', '');
}

export let SPOTIFY_TOKEN = localStorage.getItem('SPOTIFY_TOKEN');

// to update thur console
window.updateToken = token => {
  localStorage.setItem('SPOTIFY_TOKEN', token);
  SPOTIFY_TOKEN = token;
};

// Login
export const login = async (email, password) => {
  const res = await axiosClient.post('/login', {
    email,
    password,
  });
  return res.data;
};

// search music from spotify
export const searchMusicApi = async search => {
  const res = await axiosClient.get(`/`, {
    params: {
      q: search,
      type: 'track',
      offset: '0',
      limit: '10',
    },
    baseURL: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${SPOTIFY_TOKEN}`,
    },
  });
  return res.data;
};

export const getSongByIds = async ids => {
  const res = await axiosClient.get(`/`, {
    params: { ids },
    baseURL: 'https://spotify23.p.rapidapi.com/tracks',
    headers: {
      'x-rapidapi-key': '0316ee89c8msh00029a671e9cd4dp1a0b4ejsn203e09d97084',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    },
  });
  return res.data;
};
