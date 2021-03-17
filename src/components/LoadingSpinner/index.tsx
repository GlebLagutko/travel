import React from 'react';
import {usePromiseTracker} from "react-promise-tracker";
import {css} from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export const LoadingSpinner = (props) => {
    const {promiseInProgress} = usePromiseTracker();
    return (
        <div>
            {
                (promiseInProgress === true) ?
                    <div className="spinner">
                        <PuffLoader color={"#36D7B7"} loading={promiseInProgress} css={override} size={150} />
                    </div>
                    :
                    null
            }
        </div>
    )
};