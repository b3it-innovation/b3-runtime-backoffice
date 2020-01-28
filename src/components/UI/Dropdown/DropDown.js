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

    const {
        obj, id, value, handleChange, name, label,
    } = props;

    let items = null;

    if (obj) {
        items = obj.map((o) => (<MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>));
        if (props.all) {
            items.push(<MenuItem key="all" value="all">All</MenuItem>);
        }
    } else {
        items = <MenuItem value=""><em>None</em></MenuItem>;
    }

    return (
        <FormControl variant="filled" className={classes.input}>
            <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
            <Select
                labelId={id}
                id={id}
                value={value}
                onChange={handleChange}
                name={name}
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
