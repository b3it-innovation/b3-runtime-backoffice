import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: '#EEEEEE'
    },
  }));

function SearchButton(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<SearchIcon />}
        size='small'
        onClick={() => props.click()}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchButton;