import React, { useState } from "react";
import {gql, useMutation} from "@apollo/client";
import {TextField} from "@material-ui/core";

export const Login = (props) => {

    const [ImageSelected, setImageSelected] = useState(null);
    const [inputValue, setInput] = useState('');

    const AUTHENTICATE = gql`
        mutation authenticate($userName: String!, $file: Upload!) {
            authenticate(userName: $userName, file: $file)
        }
    `;

    const [authenticate] = useMutation(AUTHENTICATE, {
            onCompleted: result => {
                console.log(result);
                if (result.authenticate === "USER EXISTS"){
                    console.log("SHOW EXISTS");
                }else{
                    console.log("CLOSE DIALOG");
                }

            }
        }
    );

    return(
        <div>
            <label>
                <p>Username</p>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event => {
                    setInput(event.target.value);
                })}/>
            </label>
            <input
                type="file"
                name="image"
                onChange={(e) => setImageSelected(e.target.files[0])}
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log("-------------");
                    console.log(ImageSelected);
                    authenticate({ variables: {
                            userName:inputValue,
                            file: ImageSelected
                        } });
                }}
            >
                Save image
            </button>
        </div>
    )
};
