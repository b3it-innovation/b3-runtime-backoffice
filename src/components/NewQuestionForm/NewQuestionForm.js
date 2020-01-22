import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';
import CategoryDropDown from '../UI/Dropdown/CategoryDropDown';


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
        minWidth: '100%',
        maxWidth: 1075,
        margin: '50px'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24
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
        text: '',
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
        let optionLetter = null;
        if(!state.options){
            optionLetter = 'A';
        } else {
            optionLetter = optionLetters[state.options.length];
        }
        let object = {
            text: option,
            option: optionLetter,
            imgUrl: null
        }
        const newOptions = [...state.options, object];
        setState({
            ...state,
            options: newOptions
        });

        setOptionInput({
            ...optionInput,
            currentOption: ''
        });
    }


    let form = <Spinner />;
    if(!props.loading){
        form = (
            <form autoComplete="off">
                        <TextField className={classes.input} name='title' label="Title" variant="filled" value={state.title} onChange={handleChange} />
                        <TextField className={classes.input} name='text' label="Question" variant="filled" value={state.text} onChange={handleChange} />

                        <CategoryDropDown value={state.category} handleChange={handleChange} cat={props.cat}/>

                        <TextField name='option' value={optionInput.currentOption} onChange={handleChange} className={classes.input} label="Option" variant="filled" />
                        {state.options.length < 4 ? <Button size="small" className={classes.optionsButton} onClick={handleAddOption}>ADD OPTION</Button>
                            : <Button disabled={true} size="small" className={classes.optionsButton} onClick={handleAddOption}>ADD OPTION</Button>}

                        <FormControl component="fieldset" className={classes.radio}>
                            <FormLabel component="legend">Mark the correct answer</FormLabel>
                            <RadioGroup name="correctAnswer" className={classes.radio} value={state.correctAnswer} onChange={handleChange}>

                                {state.options.map((option, index) => {
                                    return (
                                        <FormControlLabel
                                            key={optionLetters[index]}
                                            value={optionLetters[index]}
                                            control={<Radio color="primary" />}
                                            label={optionLetters[index] + ' ' + option.text}
                                            labelPlacement="end"
                                        />
                                    )
                                })}

                            </RadioGroup>
                        </FormControl>
                    </form>
        );
    }

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
            <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Add a new question
                    </Typography>
                    {form}
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
        loading: state.questions.loading,
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