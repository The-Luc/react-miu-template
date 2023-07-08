import SpotifyWebPlayer from 'react-spotify-web-playback';
import { SPOTIFY_TOKEN } from '../../store/api';

// Component for the music player that play song from spotify using react-spotify-web-playback
export function Player({ song }) {
  return (
    <>
      <SpotifyWebPlayer token={SPOTIFY_TOKEN} uris={[song.uri]} />
    </>
  );
}
