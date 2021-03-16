import React, {useState} from "react";
import {Rating} from '@material-ui/lab'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {gql, useMutation, useApolloClient} from "@apollo/client";
import {USER_LOGGED_IN} from "../../store/actions/UserLoggedIn";
import {saveState} from "../../store/SaveState";
import {useSelector} from 'react-redux'
import store from "../../store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
    }),
);


const userState = state => state.value.user;

export function VoteBar({attraction}) {

    const classes = useStyles();
    const user = useSelector(userState);
    const vote = attraction.Votes.find(elem => elem.User.name === user.name);

    const [value, setValue] = useState(vote ? vote.rate : 0);


    const apolloClient = useApolloClient();

    const AUTHENTICATE = gql`
        mutation vote($rate: Int!, $userId: Int!, $attractionPath: String!) {
            vote(rate: $rate, userId: $userId, attractionPath: $attractionPath)
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

    const [authenticate] = useMutation(AUTHENTICATE, {}
    );


    return (
        <div className={classes.root}>
            {
                attraction.name
            }
            <Rating defaultValue={value} max={5} onChange={(event, newVal) => {
                setValue(newVal);
                authenticate(
                    {
                        variables: {rate: newVal, userId: user.id, attractionPath: attraction.image},
                    }
                ).then()


            }}/>
        </div>
    );
}
