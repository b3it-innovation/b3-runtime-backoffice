import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';



const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: 'auto',
        backgroundColor: 'lightgrey',
        flexWrap: 'nowrap',
    },
    card: {
        minWidth: '50%',
        maxWidth: 1075,
        margin: '100px'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24
    },
    pos: {
        marginBottom: 12,
    },
    input: {
        width: '70%',
        marginTop: 12

    },
    optionsButton: {
        width: '70%',
        alignSelf: 'center',
        fontSize: 14,
        marginBottom: 8
    },
    option: {
        fontWeight: 'bold',
        width: '40%',
        marginTop: 12,
    },
    radio: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButton: {
        width: '50%',
        alignSelf: 'center',
    }
});

export const NewQuestionForm = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Add a new question
                    </Typography>
                    <form autoComplete="off" className={classes.content}>
                        <TextField className={classes.input} id="filled-basic" label="Title" variant="filled" />
                        <TextField className={classes.input} id="filled-basic" label="Question" variant="filled" />

                        <FormControl variant="filled" className={classes.input}>
                            <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                            <Select
                                labelId="categoryId"
                                id="categoryId"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Java</MenuItem>
                                <MenuItem value={20}>Javascript</MenuItem>
                                <MenuItem value={30}>Other</MenuItem>
                            </Select>
                        </FormControl>



                        <TextField className={classes.input} id="filled-basic" label="Option" variant="filled" />
                        <Button size="small" className={classes.optionsButton}>ADD OPTION</Button>


                        <FormControl component="fieldset" className={classes.radio}>
                        <FormLabel component="legend">Mark the correct answer</FormLabel>
                            <RadioGroup name="correct" className={classes.radio} column>
                                <FormControlLabel
                                    value="A"
                                    control={<Radio color="primary" />}
                                    label="Option A"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="B"
                                    control={<Radio color="primary" />}
                                    label="Option B"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="C"
                                    control={<Radio color="primary" />}
                                    label="Option C"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="D"
                                    control={<Radio color="primary" />}
                                    label="Option D"
                                    labelPlacement="end"
                                />

                            </RadioGroup>
                        </FormControl>

                    </form>
                </CardContent>
                <CardActions>
                    <Button size="medium">SAVE QUESTION</Button>
                </CardActions>
            </Card>
        </div>
    )
}

const mapStateToProps = (dispatch) => {
    return {
        addQuestion: (question) => dispatch(addQuestion(question))
    }
};

const mapDispatchToProps = {
    
};


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionForm);

