import React, {useState} from 'react';

import {Button, Modal} from 'react-bootstrap';
import store from "../../store";
import {useDispatch, useSelector} from 'react-redux'
import {createStyles, IconButton, makeStyles, TextField, Theme} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";
import {CHANGE_SHOW} from "../../store/actions/ChangeShow";
import {gql, useMutation, useApolloClient} from "@apollo/client";
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

export function ModalLogou() {
    const classes = useStyles();

    const [ImageSelected, setImageSelected] = useState(null);
    const [inputValue, setInput] = useState('');
    const dispatch = useDispatch();
    const language = useSelector(languageState);
    strings.setLanguage(language);


    const show = useSelector(showState);

    const AUTHENTICATE = gql`
        mutation authenticate($userName: String!, $file: Upload!) {
            authenticate(userName: $userName, file: $file)
        }`;
    const userByNameQuery = gql`
        query UserByName($name: String!)
        {
            UserByName(name: $name){
                id
                name
                fileName
            }
        }`;


    const [authenticate] = useMutation(AUTHENTICATE, {
            onCompleted: _result => {
                apolloClient
                    .query({
                        query: userByNameQuery,
                        variables: {name: inputValue},
                        fetchPolicy: 'no-cache',
                    })
                    .then(result => {
                        dispatch({type: USER_LOGGED_IN, value: result.data.UserByName});
                        saveState(store);
                    });
            }
        }
    );
    const apolloClient = useApolloClient();

    const handleClose = () => {
        dispatch({type: CHANGE_SHOW_OUT, value: false});
        saveState(store);
    }

    // @ts-ignore
    const time: number = store.getState().value.time;

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
