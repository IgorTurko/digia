import * as React from "react";
import Paper from "material-ui/Paper";
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "material-ui/Table";
import Edit from "material-ui-icons/Edit";
import Delete from "material-ui-icons/Delete";

import { UserForm } from "../userForm/UserForm";

import "./UserList.css";
import { UserModel } from "../models/user";

interface UserListProps {}

interface UserListState {
    users: UserModel[];
    isEdit: number[];
    order?: "asc" | "desc";
    orderBy?: keyof UserModel;
}

export class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props);
        this.state = {
            users: [],
            isEdit: []
        };
    }

    handleAdd(user: UserModel) {
        this.setState(prev => ({
            users: [...prev.users, user]
        }));
    }

    handleDelete(index: number) {
        this.setState(prev => ({
            ...prev,
            users: prev.users.filter((_, i) => i !== index)
        }));
    }

    handleEditClick(index: number) {
        this.setState(prev => ({
            ...prev,
            isEdit: [...prev.isEdit, index]
        }));
    }

    handleEditCancel(index: number) {
        this.setState(prev => ({
            ...prev,
            isEdit: prev.isEdit.filter(i => i !== index)
        }));
    }

    handleEditSave(user: UserModel, index: number) {
        this.setState(prev => {
            const newUsers = [...prev.users];
            newUsers[index] = user;
            return {
                ...prev,
                users: newUsers,
                isEdit: prev.isEdit.filter(i => i !== index)
            };
        });
    }

    handleRequestSort(event: React.MouseEvent<HTMLElement>, property: keyof UserModel) {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        const users =
            order === "desc"
                ? this.state.users.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
                : this.state.users.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));

        this.setState(prev => ({ ...prev, users, order, orderBy } as any));
    }

    render() {
        const { orderBy, order } = this.state;
        return (
            <div className="UserList">
                <Paper className="UserList__addForm">
                    <UserForm onSave={user => this.handleAdd(user)} />
                </Paper>
                <Paper className="UserList__tableWrapper">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={orderBy === "fullName" ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === "fullName"}
                                        direction={order}
                                        onClick={e => this.handleRequestSort(e, "fullName")}
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
                            {this.state.users.map(
                                (user, index) =>
                                    this.state.isEdit.indexOf(index) === -1 ? (
                                        <TableRow key={index}>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell className="UserList__actionsCell">
                                                <Edit color="action" onClick={() => this.handleEditClick(index)} />
                                                <Delete color="action" onClick={() => this.handleDelete(index)} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell colSpan={4}>
                                                <UserForm
                                                    user={user}
                                                    isEdit={true}
                                                    onSave={edited => this.handleEditSave(edited, index)}
                                                    onCancel={() => this.handleEditCancel(index)}
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
