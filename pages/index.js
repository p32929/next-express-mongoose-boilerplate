import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useOvermind} from "../helpers/OvermindHelper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {GlobalMethods} from "../helpers/GlobalMethods";

const Index = (props) => {
    const {state, actions} = useOvermind()

    return (
        <Grid style={{margin: 32}} container direction='column' alignContent='center' alignItems='center'
              justify='center'>
            <Typography variant='h3'>Overmind states</Typography>
            <Typography variant='h6'>Counter: {state.counter}</Typography>
            <Button style={{
                marginTop: 8,
                width: 150
            }} variant='contained' color='primary' onClick={() => {
                actions.increase(1)
            }}>+</Button>
            <Button style={{
                marginTop: 8,
                width: 150
            }} variant='contained' color='primary' onClick={() => {
                actions.increase(-1)
            }}>-</Button>

            <Typography style={{marginTop: 32}} variant='h3'>Status code from server: {state.serverStatus}</Typography>
            <Button variant='contained' color='primary' onClick={() => {
                GlobalMethods.createRandomUser((status, jsonData) => {
                    actions.setServerStatus(status)
                    if (status > 0 && status <= 400) {
                        GlobalMethods.getAllUsers((status, jsonData) => {
                            actions.setUsers(jsonData)
                        })
                    }
                })
            }}>Create random user</Button>

            <Typography>Users: {JSON.stringify(state.users)}</Typography>

        </Grid>
    );
}

export default Index;