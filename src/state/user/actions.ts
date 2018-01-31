export const ADD_USER = "ADD_USER";
export type ADD_USER = typeof ADD_USER;
export interface AddUser {
    type: ADD_USER;
    user: User;
}
export const addUser = (user: User): AddUser => {
    return {
        type: ADD_USER,
        user
    };
};

export const DELETE_USER = "DELETE_USER";
export type DELETE_USER = typeof DELETE_USER;
export interface DeleteUser {
    type: DELETE_USER,
    id: number;
}
export const deleteUser = (id: number): DeleteUser => {
    return {
        type: DELETE_USER,
        id
    }
}

export const SAVE_USER = "SAVE_USER";
export type SAVE_USER = typeof SAVE_USER;
export interface SaveUser {
    type: SAVE_USER,
    user: User;
}
export const saveUser = (user: User): SaveUser => {
    return {
        type: SAVE_USER,
        user
    }
}

export const SORT_USER = "SORT_USER";
export type SORT_USER = typeof SORT_USER;
export interface SortUser {
    type: SORT_USER,
    sort: Sort;
}
export const sortUser = (sort: Sort): SortUser => {
    return {
        type: SORT_USER,
        sort
    }
}

export type UserAction = AddUser | DeleteUser | SaveUser | SortUser;
