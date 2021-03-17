import React from 'react';

import {Button, Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {VoteBar} from "../VoteBar";
import {CHANGE_VOTE} from "../../store/actions/ChangeVote";
import strings from "../localization"

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


const voteState = state => state.value.vote;
const langState = state => state.value.language;


export function VoteModal({attractions, refetchFunction}) {
    const classes = useStyles();

    console.log('modal render');
    console.log(attractions);

    const dispatch = useDispatch();
    const language = useSelector(langState);
    const vote = useSelector(voteState);
    strings.setLanguage(language)


    const handleClose = () => {
        dispatch({type: CHANGE_VOTE, value: false});
        console.log('===ref====')
        console.log(refetchFunction);
        refetchFunction();
    };


    const voteBars = attractions.map(elem => <VoteBar attraction={elem}/>);


    return (
        <Modal className={classes.modal} show={vote} keyboard={false} cenetered>
            <Modal.Header>
                <Modal.Title>{strings.vote}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    voteBars
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    {
                        strings.close
                    }
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
