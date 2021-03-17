import React, {useState} from 'react';

import {Button, Modal} from 'react-bootstrap';
import store from "../../store";
import {useDispatch, useSelector} from 'react-redux'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {gql, useApolloClient, useMutation} from "@apollo/client";
import strings from "../localization"
import {USER_LOGGED_IN} from "../../store/actions/UserLoggedIn";
import {saveState} from "../../store/SaveState";
import {USER_LOGGED_OUT} from "../../store/actions/UserLoggedOut";
import {CHANGE_SHOW_OUT} from "../../store/actions/ChangeShowOut";

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
        body: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '10px',
            width: '300px',
            height: '150px'
        },
        image: {

            display: 'flex',
            flexDirection: 'column',
            rowGap: '5px'
        }
    }),
);

const languageState = state => state.value.language;
const showState = state => state.value.showOut;

export default function ModalLogout() {

    const dispatch = useDispatch();
    const language = useSelector(languageState);
    strings.setLanguage(language);


    const show = useSelector(showState);

    const handleClose = () => {
        dispatch({type: CHANGE_SHOW_OUT, value: false});
        saveState(store);
    };

    return (
        <Modal show={show} keyboard={false} cenetered>
            <Modal.Title>{strings.question}</Modal.Title>
            <Modal.Footer>
                <Button variant="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch({type: USER_LOGGED_OUT});
                            saveState(store);
                            handleClose();
                        }}>
                    {strings.logout}
                </Button>
                <Button variant="primary" onClick={handleClose} disabled={false}>
                    {strings.close}
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
