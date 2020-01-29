import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#006A8E',
        color: 'white',
    },
}));

const EditButton = (props) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            className={classes.button}
            startIcon={<EditIcon />}
            size="small"
            onClick={() => props.click()}
        >
            Edit
        </Button>
    );
};

export default EditButton;
