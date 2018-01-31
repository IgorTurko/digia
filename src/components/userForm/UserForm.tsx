import * as React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import "./UserForm.css";

interface UserFormProps {
    user?: User;
    isEdit?: boolean;

    onSave?(user: User): any;
    onCancel?(): any;
}

interface UserFormState {
    toEdit: User;
}

export class UserForm extends React.Component<UserFormProps, UserFormState> {
    constructor(props: UserFormProps) {
        super(props);
        this.state = {
            toEdit: props.user || {
                id: -1,
                name: "",
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

    handleFieldChange = (val: string, field: keyof User) => {
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
                    id: -1,
                    name: "",
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
                        value={this.state.toEdit.name}
                        onChange={e => this.handleFieldChange(e.target.value, "name")}
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
