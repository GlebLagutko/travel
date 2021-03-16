import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: "300px",
            height: "330px",
            width: '70%',
            maxWidth: "1000px"
        }


    }),
);

export default function VideoWidget({video}) {

    const classes = useStyles();

    return (
        <iframe className={classes.root} src={video} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
    );
}
