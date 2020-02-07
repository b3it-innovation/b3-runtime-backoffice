import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import DropDown from '../../../components/UI/Dropdown/DropDown';
import ImageTransitionOverlay from '../../../components/UI/ImageTransitionOverlay/ImageTransitionOverlay';
import checkbox from '../../../assets/images/checkbox.png';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        padding: '0',
        margin: 'auto',
        flexWrap: 'nowrap',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
    },
    cardAction: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '70%',
        marginTop: 12,

    },
    options: {
        display: 'flex',
        flexFlow: 'column-nowrap',
    },
    optionsButton: {
        width: '70%',
        alignSelf: 'center',
        fontSize: 14,
        marginBottom: 8,
    },
    radio: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButton: {
        width: '50%',
        alignSelf: 'center',
    },
});

const AddQuestion = (props) => {
    const [localState, setLocalState] = useState({
        text: '',
        categoryKey: '',
        options: [],
        correctAnswer: '',
        title: '',
    });

    const [optionInput, setOptionInput] = useState({
        currentOption: '',
    });

    const { options } = localState;
    const { added, loading, questionKey } = props;

    useEffect(() => {
        setTimeout(() => {
            if (props.added) {
                props.init();
            }
        }, 2000);
    }, [added]);

    const optionLetters = ['A', 'B', 'C', 'D'];

    const classes = useStyles();

    const handleSubmit = () => {
        props.addQuestion({ ...localState });
        setLocalState({
            text: '',
            categoryKey: '',
            options: [],
            correctAnswer: '',
            title: '',
        });
        setOptionInput({ currentOption: '' });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        props.updateQuestion(questionKey, { ...localState });
        props.resetKey(null);
        setLocalState({
            text: '',
            categoryKey: '',
            options: [],
            correctAnswer: '',
            title: '',
        });
        setOptionInput({ currentOption: '' });
    };

    function handleChange(e) {
        const { value } = e.target;

        if (e.target.name === 'option') {
            setOptionInput({
                ...optionInput,
                currentOption: e.target.value,
            });
        } else {
            setLocalState({
                ...localState,
                [e.target.name]: value,
            });
        }
    }

    const handleAddOption = () => {
        const option = (` ${optionInput.currentOption}`).slice(1);
        let optionLetter = null;
        if (!localState.options) {
            optionLetter = 'A';
        } else {
            optionLetter = optionLetters[localState.options.length];
        }
        const object = {
            text: option,
            option: optionLetter,
            imgUrl: null,
        };
        const newOptions = [...localState.options, object];
        setLocalState({
            ...localState,
            options: newOptions,
        });

        setOptionInput({
            ...optionInput,
            currentOption: '',
        });
    };

    function handleDeleteOption(index) {
        const newOptions = options.filter((option) => option.option !== index);
        const copyoptions = [...newOptions];

        const updOptions = copyoptions.map((opt, i) => {
            opt.option = optionLetters[i];
            return opt;
        });

        setLocalState({
            ...localState,
            options: updOptions,
        });
    }


    let form = <Spinner />;
    const disabled = localState.options.length >= 4;
    if (!loading) {
        form = (
            <form autoComplete="off">
                <TextField className={classes.input} name="title" label="Title" variant="filled" value={localState.title} onChange={handleChange} />
                <TextField className={classes.input} multiline name="text" label="Question" variant="filled" value={localState.text} onChange={handleChange} />

                <DropDown
                    value={localState.categoryKey}
                    handleChange={handleChange}
                    obj={props.categories}
                    label="Category"
                    name="categoryKey"
                    id="categoryId"
                />

                <TextField name="option" value={optionInput.currentOption} onChange={handleChange} className={classes.input} label="Option" variant="filled" />
                <div>
                    <Button size="small" disabled={disabled} className={classes.optionsButton} click={handleAddOption} text="add option" type="add" />
                </div>
                <FormControl component="fieldset" className={classes.radio}>
                    <FormLabel component="legend">Mark the correct answer</FormLabel>
                    <RadioGroup name="correctAnswer" className={classes.radio} value={localState.correctAnswer} onChange={handleChange}>

                        {localState.options.map((option, index) => (
                            <div className={classes.options} key={optionLetters[index]}>
                                <FormControlLabel
                                    value={optionLetters[index]}
                                    control={<Radio color="primary" />}
                                    label={`${optionLetters[index]} ${option.text}`}
                                    labelPlacement="end"
                                />
                                <Button click={handleDeleteOption} index={option.option} type="delete" text="delete" />
                            </div>
                        ))}

                    </RadioGroup>
                </FormControl>
            </form>
        );
    }

    if (questionKey !== null && localState.text === '') { // TODO: Find another way to prevent loop
        const questionToEdit = props.questions.find((question) => question.id === questionKey);
        const deepCopy = JSON.parse(JSON.stringify(questionToEdit));

        setLocalState({
            text: deepCopy.text,
            categoryKey: deepCopy.categoryKey,
            options: deepCopy.options,
            correctAnswer: deepCopy.correctAnswer,
            title: deepCopy.title,
        });
    }

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {questionKey ? 'Edit question' : 'Add new question'}
                    </Typography>
                    {added
                        ? (
                            <ImageTransitionOverlay>
                                <img alt="success" src={checkbox} width="400px" height="400px" />
                            </ImageTransitionOverlay>
                        )
                        : null}
                    {form}
                </CardContent>
                <CardActions className={classes.cardAction}>
                    {questionKey ? <Button size="large" click={handleUpdate} text="update question" type="update" />
                        : <Button size="large" click={handleSubmit} text="save question" type="save" />}
                </CardActions>
            </Card>
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.questions.loading,
    err: state.questions.error,
    added: state.questions.questionAdded,
    questions: state.questions.fetchedQuestions,
});

const mapDispatchToProps = (dispatch) => ({
    addQuestion: (question) => dispatch(actions.addQuestion(question)),
    updateQuestion: (Key, question) => dispatch(actions.updateQuestion(Key, question)),
    init: () => dispatch(actions.addQuestionInit()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
