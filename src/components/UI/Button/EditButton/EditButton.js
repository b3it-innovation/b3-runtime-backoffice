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
    const { click, disabled } = props;
    return (
        <Button
            variant="contained"
            className={classes.button}
            startIcon={<EditIcon />}
            size="small"
            onClick={() => click()}
            disabled={disabled}
        >
            Edit
        </Button>
    );
};

export default EditButton;
