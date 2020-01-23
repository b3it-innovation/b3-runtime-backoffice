import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

const styles = {
    input: {
        width: '70%',
        marginTop: 12
    }
}

function CategoryDropDown(props) {

    const { classes } = props;

    let cats = null;

    if (props.cat) {
        cats = props.cat.map(c => (<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>));
        if(props.allCat) {
            cats.push(<MenuItem key='all' value='all'>All</MenuItem>)
        }
    }
    else {
        cats = (
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
        );
    }

    return (
        <FormControl variant="filled" className={classes.input}>
            <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
            <Select
                labelId="categoryId"
                id="categoryId"
                value={props.value}
                onChange={props.handleChange}
                name='category'
            >
                {cats}
            </Select>
        </FormControl>
    )
}

CategoryDropDown.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CategoryDropDown)