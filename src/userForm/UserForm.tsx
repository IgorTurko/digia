import * as React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { UserModel } from "../models/user";

import "./UserForm.css";

interface UserFormProps {
    user?: UserModel;
    isEdit?: boolean;

    onSave?(user: UserModel): any;
    onCancel?(): any;
}

interface UserFormState {
    toEdit: UserModel;
}

export class UserForm extends React.Component<UserFormProps, UserFormState> {
    constructor(props: UserFormProps) {
        super(props);
        this.state = {
            toEdit: props.user || {
                fullName: "",
                phoneNumber: "",
                email: ""
            }
        };
    }

    componentWillReceiveProps({ user }: UserFormProps) {
        if (user && user !== this.props.user) {
            this.setState({ toEdit: { ...user } });
        }
    }

    handleFieldChange = (val: string, field: keyof UserModel) => {
        this.setState(prev => {
            return { toEdit: { ...prev.toEdit, [field]: val } };
        });
    };

    handleButton() {
        if (this.props.onSave) {
            this.props.onSave(this.state.toEdit);
        }
        if (!this.props.isEdit) {
            this.setState({
                toEdit: {
                    fullName: "",
                    email: "",
                    phoneNumber: ""
                }
            });
        }
    }

    render() {
        return (
            <div className="UserForm">
                <div className="UserForm__inputs">
                    <TextField
                        className="UserForm__input"
                        placeholder="Full name"
                        value={this.state.toEdit.fullName}
                        onChange={e => this.handleFieldChange(e.target.value, "fullName")}
                        required={true}
                    />
                    <TextField
                        type="email"
                        className="UserForm__input"
                        placeholder="E-mail address"
                        value={this.state.toEdit.email}
                        onChange={e => this.handleFieldChange(e.target.value, "email")}
                        required={true}
                    />

                    <TextField
                        type="tel"
                        className="UserForm__input"
                        placeholder="Phone number"
                        value={this.state.toEdit.phoneNumber}
                        onChange={e => this.handleFieldChange(e.target.value, "phoneNumber")}
                        required={true}
                    />
                </div>
                <div className="UserForm__buttons">
                    <Button raised={true} onClick={() => this.handleButton()}>
                        {this.props.isEdit ? "Save" : "Add new"}
                    </Button>
                    {this.props.isEdit && (
                        <Button onClick={() => this.props.onCancel && this.props.onCancel()}>Cancel</Button>
                    )}
                </div>
            </div>
        );
    }
}
