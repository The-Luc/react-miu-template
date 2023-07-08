import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { MusicNote } from '@mui/icons-material';

export function ListSongs({ songs, onSelect }) {
  return (
    <List dense={true}>
      {songs.map(song => (
        <ListItem key={song.id} disablePadding>
          <ListItemButton onClick={() => onSelect(song)}>
            <ListItemIcon>
              <MusicNote />
            </ListItemIcon>
            <ListItemText primary={song.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
