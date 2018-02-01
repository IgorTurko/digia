import * as React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import "./UserForm.css";

interface UserFormProps {
    user?: User;
    isEdit: boolean;

    onSave(user: User): any;
    onCancel?(): any;
}

interface UserFormState {
    user: User;
    nameValid: boolean;
    emailValid: boolean;
    phoneNumberValid: boolean;
}

const emptyUser: User = {
    id: -1,
    name: "",
    phoneNumber: "",
    email: "" 
}

export class UserForm extends React.Component<UserFormProps, UserFormState> {

    constructor(props: UserFormProps) {
        super(props);

        this.state = { 
            user: props.user || emptyUser,
            nameValid: true,
            emailValid: true,
            phoneNumberValid: true    
        };
    }

    componentWillReceiveProps({ user }: UserFormProps) {
        if (user && user !== this.props.user) {
            this.setState({ user: { ...user } });
        }
    }

    handleFieldChange = (val: string, field: keyof User) => {
        this.setState(prev => {
            return { user: { ...prev.user, [field]: val } };
        });
    };

    handleButton() {
        const { user, user: { name, email, phoneNumber} } = this.state;
        
        const emailInvalid = !email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.setState({ emailValid: !emailInvalid });

        const nameInvalid = !name || name.length < 2;
        this.setState({ nameValid: !nameInvalid });

        const phoneNumberMatch = phoneNumber.match(/\d/g);
        const phoneNumberInvalid = !phoneNumber || !phoneNumberMatch || phoneNumberMatch.length < 6;
        this.setState({ phoneNumberValid: !phoneNumberInvalid });
        
        if (emailInvalid || nameInvalid || phoneNumberInvalid) {
            return;
        }

        if (this.props.onSave) {
            this.props.onSave(user);
        }

        if (!this.props.isEdit) {
            this.setState({user: emptyUser});
        }
    }

    render() {
        const { user, nameValid, emailValid, phoneNumberValid } = this.state;

        return (
            <div className="UserForm">
                <div className="UserForm__inputs">
                    <TextField
                        className="UserForm__input"
                        placeholder="Full name"
                        value={user.name}
                        onChange={e => this.handleFieldChange(e.target.value, "name")}
                        required={true}
                        error={!nameValid}
                    />
                    <TextField
                        type="email"
                        className="UserForm__input"
                        placeholder="E-mail address"
                        value={user.email}
                        onChange={e => this.handleFieldChange(e.target.value, "email")}
                        required={true}
                        error={!emailValid}
                    />
                    <TextField
                        type="tel"
                        className="UserForm__input"
                        placeholder="Phone number"
                        value={user.phoneNumber}
                        onChange={e => this.handleFieldChange(e.target.value, "phoneNumber")}
                        required={true}
                        error={!phoneNumberValid}
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
