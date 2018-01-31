interface AppState {
    users: UserState;
}

interface UserState {
    data: [number, User];
    sort: Sort;
}