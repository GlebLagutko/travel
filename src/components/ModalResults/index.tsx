import React, {useState} from 'react';

import {Button, Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {CHANGE_RESULTS_SHOW} from "../../store/actions/ChangeResultsShow";
import {ResultsTable} from "../ResultsTable";
import strings from '../localization'

//
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
        modal: {
            height: 'auto',
        }
    }),
);


const voteState = state => state.value.results;
const langState = state => state.value.language;


export function ModalResults({attractions}) {
    const classes = useStyles();

    console.log('modal render');
    console.log(attractions);

    const dispatch = useDispatch();
    const language = useSelector(langState);
    const vote = useSelector(voteState);
    const [currentAttraction, changeCurrent] = useState('')

    strings.setLanguage(language)

    const handleClose = () => {
        dispatch({type: CHANGE_RESULTS_SHOW, value: false});
        changeCurrent('');
    };


    const voteBars = attractions.map(elem => <Typography onClick={() => {
        changeCurrent(elem.name);
    }}>{elem.name}</Typography>);


    return (
        <Modal className={classes.modal} show={vote} keyboard={false} cenetered>
            <Modal.Header>
                <Modal.Title>{strings.choose_attraction}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    !currentAttraction ?
                        attractions.map(elem => <Typography className='results-row' onClick={() => {
                            changeCurrent(elem.name);
                        }}>{elem.name}</Typography>) :
                        <ResultsTable attraction={attractions.find(elem => elem.name === currentAttraction)}/>
                }
            </Modal.Body>
            <Modal.Footer>{

                currentAttraction ?
                    <Button variant="primary" onClick={() => {
                        changeCurrent('');
                    }}>{strings.choose_another}</Button> : ''
            }
                <Button variant="primary" onClick={handleClose}>
                    {strings.close}
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
