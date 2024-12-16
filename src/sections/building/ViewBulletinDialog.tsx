import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button,
  TextField,
  Stack,
  Snackbar,
  Alert,
  Typography,
  IconButton,
} from '@mui/material';
import { Bulletin } from 'src/utils/types';

interface ViewBulletinDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const ViewBulletinDialog: React.FC<ViewBulletinDialogProps> = ({ open, setOpen, id }) => {
  const [bulletin, setBulletin] = React.useState<Bulletin[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchBulletin = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bulletins/building`,
        { buildingID: id }, // Pass data in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        console.log('response', response.data.data);
        setBulletin(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bulletin:', error);
      setSnackbarOpen(true);
    }
  };

  const onClickAddBulletin = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bulletins`,
        {
          title: title,
          content: content,
          buildingID: id,
        }, // Pass data in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data) {
        console.log('response', response.data);
        fetchBulletin();
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Failed to fetch bulletin:', error);
      setSnackbarOpen(true);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchBulletin();
    }
  }, [open, id]);

  if (bulletin.length === 0) {
    return null;
  }

  const action = (
    <Button color="secondary" size="small" onClick={handleClose}>
      UNDO
    </Button>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiPaper-root': {
            maxWidth: '1000px',
          },
        }}
      >
        <DialogTitle>Bulletin Details</DialogTitle>
        <Stack direction="column" spacing={2} sx={{ pl: '24px' }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            sx={{
              width: '240px',
            }}
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            sx={{
              width: '240px',
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={onClickAddBulletin}
            sx={{
              width: '240px',
            }}
          >
            Add Bulletin
          </Button>
        </Stack>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Posted At</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bulletin.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>

                  <TableCell>{item.content}</TableCell>

                  <TableCell>{new Date(item.postedAt).toLocaleString()}</TableCell>

                  <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>

                  <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Note archived"
        action={action}
      />
    </>
  );
};

export default ViewBulletinDialog;
