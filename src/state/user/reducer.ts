import { ADD_USER, UserAction } from './actions';
import { DELETE_USER, SAVE_USER, SORT_USER } from './index';

let userId = 1;
let data: [number, User] | any = {};

for (let i = userId; i <= 20; i++) {
    userId = i;

    data[i] = {
        id: i,
        name: `John Doe ${i}`,
        email: `john.doe${i}@gmail.com`,
        phoneNumber: `12345${i}`
    };
}

const defaultState: UserState = {
    data,
    sort: {} as Sort
};

export function userReducer(state: UserState = defaultState, action: UserAction): UserState {
    switch (action.type) {
        case ADD_USER: {
            console.log(action.user);
            return {
                ...state,
                data: {
                    [++userId]: action.user,
                    ...state.data,
                }  
            };
        }

        case DELETE_USER: {
            delete state.data[action.id];
            return {
                ...state,
                data: {
                    ...state.data
                }
            }
        }

        case SAVE_USER: {
            state.data[action.user.id] = action.user;

            return {
                ...state,
                data: {
                    ...state.data
                }
            }
        }

        case SORT_USER: {
            return {
                ...state,
                sort: {
                    ...action.sort
                }
            } 
        }

        default:
            return state;
    }
}