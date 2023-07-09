import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  Tooltip,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import { Delete, Lyrics, MusicNote, ThumbUp } from '@mui/icons-material';

export function ListSongs({
  songs,
  onSelect,
  isDelete,
  onDelete,
  isVote,
  onVote,
}) {
  console.log('🚀 ~ file: ListSongs.jsx:22 ~ songs:', songs);
  return (
    <List
      dense={true}
      sx={{
        width: '100%',
      }}
    >
      {songs.map(song => (
        <ListItem key={song.id} disablePadding>
          <ListItemButton onClick={() => onSelect(song)}>
            <ListItemIcon>
              {/* <MusicNote /> */}
              <Avatar src={song.img} />
            </ListItemIcon>
            <ListItemText primary={song.name} secondary={song.artist} />
          </ListItemButton>
          {isVote && (
            <>
              <Button
                variant="outlined"
                color={song.isMyVote ? 'success' : 'primary'}
                // color="primary"
                sx={
                  song.isMyVote
                    ? { ml: 2 }
                    : { ml: 2, borderColor: 'gray', color: 'gray' }
                }
                onClick={() => onVote(song)}
                startIcon={<ThumbUp />}
              >
                {song.vote}
              </Button>
              <Tooltip title={song.message}>
                <IconButton>
                  <Lyrics />
                </IconButton>
              </Tooltip>
            </>
          )}
          {isDelete && (
            <IconButton
              variant="contained"
              color="error"
              sx={{ ml: 0 }}
              onClick={() => onDelete(song)}
            >
              <Delete />
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
  );
}
