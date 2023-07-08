import { Paper, TextareaAutosize } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { searchMusicApi } from '../../store/api';
import { ListSongs } from './ListSongs';
import { Player } from './Player';
import { Button } from '@mui/material';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { SPOTIFY_TOKEN } from '../../store/api';
import StyledTextArea from '../../components/StyledTextArea';

const defaultTheme = createTheme();

export default function DiroxRadar() {
  const [listSongs, setListSongs] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    // get list song ids from api
  }, []);

  const onAdd = () => {
    if (!isRequesting) {
      setIsRequesting(true);
      return;
    }

    // call api to add song to playlist
    setIsRequesting(false);
  };

  const handleGetSongs = debounce(async event => {
    event.preventDefault();
    const value = event.target.value;

    if (!value) return;

    // search music
    const res = await searchMusicApi(value);

    const songs = res.tracks.items;

    const saveSongs = songs.map(song => {
      return {
        id: song.id,
        name: song.name,
        img: song.preview_url,
        href: song.href,
        uri: song.uri,
      };
    });

    setListSongs(saveSongs);
  }, 500);

  const onSelect = song => {
    setSelectedSong(song);
    setListSongs([]);
  };

  const playerStyle = isRequesting
    ? { hideCoverArt: true, hideAttribute: true }
    : {};
  console.log(
    '🚀 ~ file: Music.jsx:68 ~ DiroxRadar ~ playerStyle:',
    playerStyle,
  );

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
            <Box>
              <ListSongs songs={listSongs} onSelect={onSelect} />
            </Box>
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
                />
              )}
              {selectedSong && (
                <SpotifyWebPlayer
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
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
