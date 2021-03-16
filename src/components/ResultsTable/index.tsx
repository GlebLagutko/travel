import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux'
import {Rating} from "@material-ui/lab";
import strings from '../localization'

const useStyles = makeStyles({
    table: {},
});

const userState = state => state.value.user;
const languageState = state => state.value.language;


export function ResultsTable({attraction}) {

    const classes = useStyles();
    const user = useSelector(userState);
    const language = useSelector(languageState);
    strings.setLanguage(language);

    return (
        <TableContainer component={Paper} id="result-table">
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>{strings.user}</TableCell>
                        <TableCell align="right">{strings.rate}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attraction.Votes.filter(elem => elem.User.name !== user?.name).map((vote) => (
                        <TableRow key={vote.User.name}>
                            <TableCell component="th" scope="row">
                                {vote.User.name}
                            </TableCell>
                            <Rating defaultValue={vote.rate} max={5} readOnly/>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
