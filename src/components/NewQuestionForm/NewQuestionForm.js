import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import * as actions from './../../store/actions/index';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: 'auto',
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


export const NewQuestionForm = (props) => {

    const [state, setState] = useState({
        questionText: '',
        category: '',
        options: [],
        correctAnswer: '',
        title: '',
    });

    const [optionInput, setOptionInput] = useState({
        currentOption: ''
    });

    useEffect(() => {
        props.initCategories();
    }, []);

    const optionLetters = ['A', 'B', 'C', 'D']

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addQuestion({ ...state });
    }

    function handleChange(e) {
        const value = e.target.value;

        if (e.target.name === 'option') {
            setOptionInput({
                ...optionInput,
                currentOption: e.target.value
            });
        } else {
            setState({
                ...state,
                [e.target.name]: value
            });
        }
    }

    const handleAddOption = (e) => {
        e.preventDefault();
        const option = (' ' + optionInput.currentOption).slice(1);
        const newOptions = [...state.options, option];
        setState({
            ...state,
            options: newOptions
        });

        setOptionInput({
            ...optionInput,
            currentOption: ''
        });
    }

    let cats = null;
    if (props.cat) {
        cats = props.cat.map(c => (<MenuItem key={c.id} value={c.id}>{c.name.name}</MenuItem>));
        console.log(cats);
    }
    else {
        cats = (<MenuItem value="">
            <em>None</em>
        </MenuItem>);
    }

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Add a new question
                    </Typography>
                    <form autoComplete="off" className={classes.content}>
                        <TextField className={classes.input} name='title' label="Title" variant="filled" value={state.title} onChange={handleChange} />
                        <TextField className={classes.input} name='questionText' label="Question" variant="filled" value={state.questionText} onChange={handleChange} />

                        <FormControl variant="filled" className={classes.input}>
                            <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                            <Select
                                labelId="categoryId"
                                id="categoryId"
                                value={state.category}
                                onChange={handleChange}
                                name='category'
                            >
                                {cats}
                            </Select>
                        </FormControl>

                        <TextField name='option' value={optionInput.currentOption} onChange={handleChange} className={classes.input} label="Option" variant="filled" />
                        {state.options.length < 4 ? <Button size="small" className={classes.optionsButton} onClick={handleAddOption}>ADD OPTION</Button>
                            : <Button disabled='true' size="small" className={classes.optionsButton} onClick={handleAddOption}>ADD OPTION</Button>}

                        <FormControl component="fieldset" className={classes.radio}>
                            <FormLabel component="legend">Mark the correct answer</FormLabel>
                            <RadioGroup name="correctAnswer" className={classes.radio} value={state.correctAnswer} onChange={handleChange}>

                                {state.options.map((option, index) => {
                                    return (
                                        <FormControlLabel
                                            key={optionLetters[index]}
                                            value={optionLetters[index]}
                                            control={<Radio color="primary" />}
                                            label={optionLetters[index] + ' ' + option}
                                            labelPlacement="end"
                                        />
                                    )
                                })}

                            </RadioGroup>
                        </FormControl>

                    </form>
                </CardContent>
                <CardActions>
                    <Button size="medium" onClick={handleSubmit}>SAVE QUESTION</Button>
                </CardActions>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cat: state.questions.categories,
        err: state.questions.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (question) => dispatch(actions.addQuestion(question)),
        initCategories: () => dispatch(actions.initCategories())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionForm);

