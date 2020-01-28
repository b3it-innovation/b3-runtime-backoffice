import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerItem: {
        width: '50%',
    },
}));

function Panel(props) {
    const classes = useStyles();

    const { categories, label, object } = props;

    let categoryName = null;
    const matchedCategory = categories.find((cat) => cat.id === object.category);
    if (matchedCategory == null) {
        categoryName = 'No category found';
    } else {
        categoryName = matchedCategory.name;
    }

    const { id } = object;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{label}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.container}>
                <div className={classes.containerItem}>
                    <p>Text:</p>
                    {' '}
                    <p>{object.text}</p>
                    <p>Category:</p>
                    {' '}
                    <p>{categoryName}</p>
                </div>
                <div className={classes.containerItem}>

                    Options:
                    {' '}
                    {object.options.map((option) => (
                        <p key={option.option}>
                            {option.option}
                            {' '}
                            {option.text}
                        </p>
                    ))}

                    <p>
Correct Answer:
                        {object.correctAnswer}
                    </p>
                    <Button variant="contained" color="primary" onClick={() => props.onDelete(id)}>Delete Question</Button>
                </div>
                <Typography />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
});

export default connect(mapStateToProps)(Panel);
