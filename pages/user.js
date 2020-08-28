import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import {useOvermind} from "../helpers/OvermindHelper";
import {withRouter} from 'next/router'
import theme from "../utils/theme";
import {Head} from "next/document";
import {GlobalMethods} from "../helpers/GlobalMethods";
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
        <Grid>
            <NextSeo
                title={"name: " + state?.currentUser?.name}
            />
            {
                JSON.stringify(state.currentUser)
            }
        </Grid>
    );
}

export default withRouter(User);