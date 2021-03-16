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

//
const showState = state => state.value.show;
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
            rowGap: '10px'
        },
        image: {

            display: 'flex',
            flexDirection: 'column',
            rowGap: '5px'
        }
    }),
);

const languageState = state => state.value.language;


export function ModalLogin() {
    const classes = useStyles();

    const [ImageSelected, setImageSelected] = useState(null);
    const [inputValue, setInput] = useState('');
    const [create, setCreate] = useState(true)
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
        dispatch({type: CHANGE_SHOW, value: false});
    }

    // @ts-ignore
    const time: number = store.getState().value.time;
    if (create) {
        return (
            <Modal show={show} keyboard={false} cenetered>
                <Modal.Header>
                    <Modal.Title>{strings.create_user}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.body}>
                    <TextField id="outlined-basic" label={strings.name} variant="outlined" onChange={(event => {
                        setInput(event.target.value);
                    })}/>
                    <div className={classes.image}
                    > {strings.choose_image} :
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setImageSelected(e.target.files[0])}
                        />
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={!inputValue.trim() || !ImageSelected}
                            onClick={(e) => {
                                e.preventDefault();
                                apolloClient
                                    .query({
                                        query: userByNameQuery,
                                        variables: {name: inputValue},
                                        fetchPolicy: 'no-cache',
                                    })
                                    .then(result => {
                                        if (result.data.UserByName) {
                                            strings.setLanguage(language);
                                            alert(strings.user_exist);
                                        } else {
                                            authenticate({
                                                variables: {userName: inputValue, file: ImageSelected}
                                            });
                                        }
                                    }).then(handleClose);
                            }}>
                        {strings.save_user}
                    </Button>
                    <Button variant="primary" onClick={() => setCreate(false)} disabled={false}>
                        {strings.have_account}
                    </Button>
                    <Button variant="primary" onClick={handleClose} disabled={false}>
                        {strings.close}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={show} keyboard={false} cenetered>
                <Modal.Header>
                    <Modal.Title>{strings.enter}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.body}>
                    <TextField id="outlined-basic" label={strings.name} variant="outlined" onChange={(event => {
                        setInput(event.target.value);
                    })}/>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={!inputValue.trim()}
                            onClick={(e) => {
                                e.preventDefault();
                                apolloClient
                                    .query({
                                        query: userByNameQuery,
                                        variables: {name: inputValue},
                                        fetchPolicy: 'no-cache',
                                    })
                                    .then(result => {
                                        if (result.data.UserByName) {

                                            dispatch({type: USER_LOGGED_IN, value: result.data.UserByName});
                                            saveState(store);
                                        } else {
                                            alert(strings.not_exist)
                                        }
                                    }).then(handleClose);
                            }}>
                        {strings.login}
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setCreate(true);
                    }} disabled={false}>
                        {strings.create_user}
                    </Button>
                    <Button variant="primary" onClick={handleClose} disabled={false}>
                        {strings.close}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
