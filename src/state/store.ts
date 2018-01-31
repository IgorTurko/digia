import { combineReducers, createStore } from 'redux';

import { userReducer } from "./user";

export const store = createStore<AppState>(
    combineReducers<AppState>({
        users: userReducer,
    })
);