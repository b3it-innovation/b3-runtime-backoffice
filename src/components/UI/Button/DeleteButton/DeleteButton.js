import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#EE4319',
    },
}));

function DeleteButton(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                className={classes.button}
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => props.click(props.index)}
            >
        Delete
            </Button>
        </div>
    );
}

export default DeleteButton;
