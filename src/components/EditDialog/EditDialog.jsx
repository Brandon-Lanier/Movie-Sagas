import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function EditDialog({ details }) {
    // const [open, setOpen] = useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const updateState = {
        title: '',
        description: ''
    }


    const [update, setUpdate] = useState(updateState)
    

    const updateMovie = (e) => {
        console.log('Update movie is', update);
        e.preventDefault()
        
    }


    return (
        <div>
            <Dialog open={open} onClose={handleCloseEdit}>
                <DialogTitle>Edit Movie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit {details.title}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        placeholder={details.title}
                        variant="standard"
                        value={update.title}
                        onChange={(e) => setUpdate({...update, title: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        multiline
                        rows="5"
                        fullWidth
                        label=" Movie Description"
                        margin="dense"
                        id="description"
                        type="text"
                        placeholder={details.description}
                        variant="standard"
                        value={update.description}
                        onChange={(e) => setUpdate({...update, description: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={updateMovie}>Update Movie</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default EditDialog;