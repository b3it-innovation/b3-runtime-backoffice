import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    delete: {
        color: 'white',
        backgroundColor: '#EE4319',
    },
    edit: {
        backgroundColor: '#006A8E',
        color: 'white',
    },
    search: {
        backgroundColor: '#006A8E',
        color: 'white',
    },
    save: {
        backgroundColor: '#3F51B5',
        color: 'white',
    },
    update: {
        backgroundColor: '#3F51B5',
        color: 'white',
    },
    back: {
        backgroundColor: '#3F51B5',
        color: 'white',
    },
    continue: {
        backgroundColor: '#3F51B5',
        color: 'white',
    },
    add: {
        backgroundColor: '#3F51B5',
        color: 'white',
    },
}));

function Button(props) {
    const {
        type, click, disabled, text, index, size,
    } = props;
    const classes = useStyles();
    const classNames = [classes.button];
    let icon = null;
    if (type && type.toLowerCase() === 'delete') {
        classNames.push(classes.delete);
        icon = <DeleteIcon />;
    } else if (type && type.toLowerCase() === 'edit') {
        classNames.push(classes.edit);
        icon = <EditIcon />;
    } else if (type && type.toLowerCase() === 'search') {
        classNames.push(classes.search);
        icon = <SearchIcon />;
    } else if (type && type.toLowerCase() === 'save') {
        classNames.push(classes.save);
        icon = <SaveIcon />;
    } else if (type && type.toLowerCase() === 'update') {
        classNames.push(classes.update);
        icon = <UpdateIcon />;
    } else if (type && type.toLowerCase() === 'back') {
        classNames.push(classes.back);
        icon = <ArrowBackIcon />;
    } else if (type && type.toLowerCase() === 'continue') {
        classNames.push(classes.continue);
        icon = <NavigateNextIcon />;
    } else if (type && type.toLowerCase() === 'add') {
        classNames.push(classes.add);
        icon = <AddIcon />;
    }

    return (
        <MuiButton
            variant="contained"
            className={classNames.join(' ')}
            startIcon={icon}
            size={size || 'small'}
            onClick={() => click(index)}
            disabled={disabled}
        >
            {text}
        </MuiButton>
    );
}

export default Button;
