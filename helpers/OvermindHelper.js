// npm install overmind overmind-react
// yarn add overmind overmind-react

import {createOvermind} from "overmind";
import {createHook} from "overmind-react";

export const useOvermind = createHook();
export const overmind = createOvermind({
    state: {
        counter: 0,
        serverStatus: 0,
        users: [{
            name: "Fay"
        }]
    },
    actions: {
        increase({state}, number) {
            state.counter += number
        },
        setServerStatus({state}, status) {
            state.serverStatus = status
        },
        setUsers({state}, users) {
            state.users = users
        }
    }
});