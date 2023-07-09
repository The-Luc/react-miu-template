import { Paper, TextareaAutosize } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { debounce } from 'lodash';
import { useEffect, useState, useRef } from 'react';
import {
  addSongRecord,
  searchMusicApi,
  getListUserSongs as getListUserSongsApi,
  getSongByIds,
  deleteSongRecord,
  addVotting,
} from '../../store/api';
import { ListSongs } from './ListSongs';
import { Button } from '@mui/material';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { SPOTIFY_TOKEN } from '../../store/api';
import StyledTextArea from '../../components/StyledTextArea';
import { mapSongs } from './util';

const defaultTheme = createTheme();

export default function DiroxRadar() {
  const [listSongs, setListSongs] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [userSongs, setUserSongs] = useState([]);
  let message = '';

  const getListUserSongs = async () => {
    const userSongs = await getListUserSongsApi();
    const dbSongs = await getSongByIds(userSongs.map(song => song.refId));

    // attach id to each song
    dbSongs.tracks.forEach((song, index) => {
      if (!song) return;
      song.dbId = userSongs[index].id;
      song.message = userSongs[index].messages.map((m, idx) => {
        if (!m.msg) return;

        return (
          <div key={idx} style={{ fontSize: '1rem', paddingBottom: '5px' }}>
            <b>{m.fullName}</b>: {m.msg}
          </div>
        );
      });

      song.vote = userSongs[index].count;
      song.isMyVote = userSongs[index].isMyVote;
    });

    const removeNull = dbSongs.tracks.filter(Boolean);
    const savedSongs = mapSongs(removeNull);
    setUserSongs(savedSongs);
  };

  useEffect(() => {
    // get list song ids from api
    getListUserSongs();
  }, []);

  const onAdd = async () => {
    if (!isRequesting) {
      setIsRequesting(true);
      return;
    }

    // call api to add song to playlist
    setIsRequesting(false);
    await addSongRecord({ userId: 1, RefId: selectedSong.id, message });
    await getListUserSongs();
  };

  const handleGetSongs = debounce(async event => {
    event.preventDefault();
    const value = event.target.value;

    if (!value) return;

    // search music
    const res = await searchMusicApi(value);

    const songs = res.tracks.items;

    const saveSongs = mapSongs(songs);

    setListSongs(saveSongs);
  }, 500);

  const onSelect = async song => {
    setSelectedSong(song);
    setListSongs([]);
  };

  const onDeleteSong = async song => {
    await deleteSongRecord(song.dbId);
    await getListUserSongs();
  };

  const handleVote = async song => {
    await addVotting(song.id);
    await getListUserSongs();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Paper
          sx={{
            width: 450,
            padding: 4,
            margin: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            position="relative"
          >
            <Typography component="h2" variant="h5">
              Dirox Radio
            </Typography>

            <Box component="form" noValidate width="100%" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                required
                id="song"
                label="What do you want to listen to?"
                name="song"
                autoComplete="song"
                autoFocus
                width="70%"
                onChange={handleGetSongs}
              />
            </Box>
            {listSongs?.length > 0 && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: 120,
                  backgroundColor: 'white',
                  zIndex: 1000,
                  width: '450px',
                }}
              >
                <ListSongs songs={listSongs} onSelect={onSelect} />
              </Paper>
            )}
            <Box
              width="100%"
              sx={{
                display: 'flex',
              }}
            >
              {isRequesting && (
                <StyledTextArea
                  minRows={3}
                  placeholder="Your message here..."
                  variant="outlined"
                  color="primary"
                  sx={{ width: '80%' }}
                  onChange={e => (message = e.target.value)}
                />
              )}
              {selectedSong && (
                <SpotifyWebPlayer
                  key={selectedSong.id}
                  token={SPOTIFY_TOKEN}
                  uris={[selectedSong.uri]}
                  hideCoverArt={isRequesting}
                  hideAttribution={isRequesting}
                />
              )}
            </Box>
            {/* DISPLAY ADD BUTTON */}
            <Box sx={{ mt: 3 }}>
              {selectedSong && (
                <>
                  {isRequesting && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mr: 2 }}
                      onClick={() => setIsRequesting(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button variant="contained" color="primary" onClick={onAdd}>
                    {!isRequesting ? 'Request this song' : 'Submit'}
                  </Button>
                </>
              )}
            </Box>

            {/* LIST USER SONGS */}
            <Box sx={{ mt: 3, width: '400px' }}>
              <ListSongs
                songs={userSongs}
                onSelect={onSelect}
                isDelete
                isVote
                onDelete={onDeleteSong}
                onVote={handleVote}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
