import axiosClient from './base';

const USER_ID = '1';

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
  const payload = ids.join(',');

  const res = await axiosClient.get(`tracks`, {
    params: {
      ids: payload,
    },
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
      Authorization: `Bearer ${SPOTIFY_TOKEN}`,
    },
  });
  return res.data;
};

export const deleteSongRecord = async id => {
  await axiosClient.delete(`/music/${id}`);
};

export const addVotting = async id => {
  await axiosClient.patch(
    `/music/votting`,
    { refId: id },
    {
      headers: {
        userId: USER_ID,
      },
    },
  );
};

export const addSongRecord = async payload => {
  const res = await axiosClient.post('/music', payload, {
    headers: {
      userId: USER_ID,
    },
  });
  return res.data;
};

export const getListUserSongs = async () => {
  const res = await axiosClient.get('/music', {
    headers: {
      userId: USER_ID,
    },
  });
  return res.data;
};
