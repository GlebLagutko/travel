import React, {useState} from "react";
import {Rating} from '@material-ui/lab'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";
import {useSelector} from 'react-redux'

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


    const AUTHENTICATE = gql`
        mutation vote($rate: Int!, $userId: Int!, $attractionPath: String!) {
            vote(rate: $rate, userId: $userId, attractionPath: $attractionPath)
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
