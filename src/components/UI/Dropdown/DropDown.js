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
        marginTop: 12,
    },
};

function CompetitionDropDown(props) {
    const { classes } = props;

    let items = null;

    if (props.obj) {
        items = props.obj.map((o) => (<MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>));
        if (props.all) {
            items.push(<MenuItem key="all" value="all">All</MenuItem>);
        }
    } else {
        items = <MenuItem value=""><em>None</em></MenuItem>;
    }

    return (
        <FormControl variant="filled" className={classes.input}>
            <InputLabel id="demo-simple-select-filled-label">{props.label}</InputLabel>
            <Select
                labelId={props.id}
                id={props.id}
                value={props.value}
                onChange={props.handleChange}
                name={props.name}
            >
                {items}
            </Select>
        </FormControl>
    );
}

CompetitionDropDown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompetitionDropDown);
