import React from "react";
import {Button} from "@material-ui/core";
import {useDispatch} from 'react-redux'
import {CHANGE_SHOW} from "../../store/actions/ChangeShow";


export function ButtonLogin() {
    const dispatch = useDispatch();
    return <Button variant="outlined" onClick={() => dispatch({type: CHANGE_SHOW, value: true})}>Default</Button>
}
