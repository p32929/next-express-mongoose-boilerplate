import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useOvermind} from "../helpers/OvermindHelper";

const Index = (props) => {
    const {state, actions} = useOvermind()

    return (
        <Grid>
            Index
        </Grid>
    );
}

export default Index;