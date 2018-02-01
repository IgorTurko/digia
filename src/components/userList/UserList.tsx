import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { addUser, deleteUser, saveUser, sortUser } from "../../state/user";

import Paper from "material-ui/Paper";
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "material-ui/Table";
import Edit from "material-ui-icons/Edit";
import Delete from "material-ui-icons/Delete";

import { UserForm } from "../userForm/UserForm";

import "./UserList.css";

interface UserListProps {
    users: User[];
    sort: Sort;
    onAddUser(user: User): any;
    onDeleteUser(id: number): any;
    onSaveUser(user: User): any;
    onSortUser(sort: Sort): any;
}

interface UserListState {
    editIndex: number;
}

class UserListComponent extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props);
        
        this.state = {
            editIndex: -1
        };
    }

    handleEditClick(id: number) {
        this.setState({editIndex: id});
    }

    handleEditCancel(index: number) {
        this.setState({editIndex: -1});
    }

    handleSaveUser(user: User) {
        const { onSaveUser } = this.props;

        this.handleEditCancel(user.id);
        onSaveUser(user);
    }

    handleRequestSort(event: React.MouseEvent<HTMLElement>, property: keyof User) {
        const { sort, onSortUser } = this.props;

        const orderBy = property;
        let order = "desc";

        if (sort.orderBy === property && sort.order === "desc") {
            order = "asc";
        }
        onSortUser({orderBy, order} as Sort);
    }

    render() {
        const { users, sort: {order, orderBy}, onAddUser, onDeleteUser } = this.props;

        return (
            <div className="UserList">
                <h1 className="UserList__header">List of participants</h1>
                <Paper className="UserList__addForm">
                    <UserForm isEdit={false} onSave={user => onAddUser(user)} />
                </Paper>
                <Paper className="UserList__tableWrapper">
                    <Table>
                        <TableHead>
                            <TableRow className="UserList__row__header">
                                <TableCell sortDirection={orderBy === "name" ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === "name"}
                                        direction={order}
                                        onClick={e => this.handleRequestSort(e, "name")}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sortDirection={orderBy === "email" ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === "email"}
                                        direction={order}
                                        onClick={e => this.handleRequestSort(e, "email")}
                                    >
                                        E-mail address
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sortDirection={orderBy === "phoneNumber" ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === "phoneNumber"}
                                        direction={order}
                                        onClick={e => this.handleRequestSort(e, "phoneNumber")}
                                    >
                                        Phone number
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { users.map(
                                user =>
                                    this.state.editIndex !== user.id ? (
                                        <TableRow key={user.id} className="UserList__row__view">
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell className="UserList__actionsCell">
                                                <Edit color="action" onClick={() => this.handleEditClick(user.id)} />
                                                <Delete color="action" onClick={() => onDeleteUser(user.id)} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow key={user.id}>
                                            <TableCell colSpan={4} className="UserList_row__edit">
                                                <UserForm
                                                    user={user}
                                                    isEdit={true}
                                                    onSave={edited => this.handleSaveUser(edited)}
                                                    onCancel={() => this.handleEditCancel(user.id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default connect(
    (state: AppState) => {
        const { data, sort } = state.users;

        let users = Object.keys(data).map(id => data[id])

        if (sort) {
            users = sort.order === "desc"
                ? users.sort((a, b) => 
                    (String(b[sort.orderBy]).toLowerCase() < String(a[sort.orderBy]).toLowerCase() ? -1 : 1))
                : users.sort((a, b) => 
                    (String(a[sort.orderBy]).toLowerCase() < String(b[sort.orderBy]).toLowerCase() ? -1 : 1));
        }

        return {
            users,
            sort
        }
    },
    (dispatch: Dispatch<AppState>) => {
        return {
            onAddUser: user => dispatch(addUser(user)),
            onDeleteUser: id => dispatch(deleteUser(id)),
            onSaveUser: user => dispatch(saveUser(user)),
            onSortUser: sort => dispatch(sortUser(sort))
        }
    }
)(UserListComponent);