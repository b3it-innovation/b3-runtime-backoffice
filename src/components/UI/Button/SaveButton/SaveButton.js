import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#006A8E',
    },
}));

const SaveButton = (props) => {
    const classes = useStyles();
    const { click, disabled, label } = props;
    return (
        <Button
            variant="contained"
            className={classes.button}
            startIcon={<SaveIcon />}
            size="small"
            onClick={() => click()}
            disabled={disabled}
        >
            {label || 'SAVE'}
        </Button>
    );
};

export default SaveButton;
