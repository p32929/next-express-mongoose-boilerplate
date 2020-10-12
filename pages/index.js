import React from 'react';
import Grid from "@material-ui/core/Grid";
import {theme} from '../src/Others/Theme';
import {useOvermind} from '../src/Others/OvermindHelper'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {GlobalMethods} from "../src/Others/GlobalMethods";
import Link from 'next/link'
import {NextSeo} from "next-seo";

const Index = (props) => {
    const {state, actions} = useOvermind()

    return (
        <Grid style={{margin: 32}} container direction='column' alignContent='center' alignItems='center'
              justify='center'>
            <NextSeo
                title={"Our Index"}
            />

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

            <Grid style={{marginTop: 16}} container direction='row' alignContent='center' alignItems='center'
                  justify='center'>

                {
                    // JSON.stringify(state.users)

                    state?.users?.map((item, index) => {
                        return <Link
                            href={`/user?id=${item._id}`}>
                            <Button style={{margin: 8}} color='primary' variant='contained' item={item}
                                    key={index}>{item.name}</Button>
                        </Link>
                    })
                }
            </Grid>

        </Grid>
    );
}

export default Index;