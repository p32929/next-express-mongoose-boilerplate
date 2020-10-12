import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import {theme} from '../src/Others/Theme';
import {useOvermind} from '../src/Others/OvermindHelper'
import {withRouter} from 'next/router'
import {GlobalMethods} from "../src/Others/GlobalMethods";
import {NextSeo} from 'next-seo';
import Router from "next/router";

const User = ({router}) => {
    const {state, actions} = useOvermind()

    useEffect(() => {
        if (router.query.id && (state.currentUser == null || state.currentUser?._id !== router.query.id)) {
            GlobalMethods.getOneUser(router.query.id, (status, jsonData) => {
                actions.setCurrentUser(jsonData)
                Router.push('/user?id=' + router.query.id)
            })
        }

        console.log("ID: " + router.query.id)

    }, [router.query.id])

    return (
        <Grid style={{margin: 16}}>
            <NextSeo title={state?.currentUser?.name ? "name: " + state?.currentUser?.name : "Loading..."}/>
            {
                JSON.stringify(state.currentUser)
            }
        </Grid>
    );
}

export default withRouter(User);