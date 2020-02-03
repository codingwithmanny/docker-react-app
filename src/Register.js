import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = props => {
    const [state, setState] = useState({
        loading: false,
        errors: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const onChangeInput = key => event => {
        setState({
            ...state,
            [key]: event.target.value
        })
    }

    const onSubmitForm = event => {
        setState({
            ...state,
            errors: null,
            loading: true
        });
        fetch('http://api.gitbranch.xyz/api/auth/register',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password,
                password_confirmation: state.password_confirmation
            })
        })
        .then(response => {
            const json = response.json();
            if (response.ok) {
                return json.then((data) => data);
            } else {
                setState({
                    ...state,
                    loading: false
                });
                return json.then((data) => Promise.reject(data));
            }
        })
        .then(json => {
            setState({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            });

            localStorage.setItem('GITBRANCH_TOKEN', json.token);

            props.history.push('/dashboard');
        })
        .catch(error => {
            setState({
                ...state,
                loading: false,
                errors: error.error || (error.errors && error.errors.password) || 'Something went wrong.'
            });
        })
        event.preventDefault();
    }

    return (<section>
        <h1>Register</h1>
        <p>Already have an account? Go to <Link to={'/login'}>Login</Link>.</p>
        <form onSubmit={onSubmitForm}>
            <p>
                <label>Name</label>
                <input disabled={state.loading} onChange={onChangeInput('name')} type="text" required value={state.name} placeholder={'Full name'} />
            </p>
            <p>
                <label>Email</label>
                <input disabled={state.loading} onChange={onChangeInput('email')} type="email" required value={state.email} placeholder={'Email address'} />
            </p>

            <p>
                <label>Password</label>
                <input disabled={state.loading} onChange={onChangeInput('password')} type="password" required value={state.password} placeholder={'Password'} />
            </p>

            <p>
                <label>Confirm Password</label>
                <input disabled={state.loading} onChange={onChangeInput('password_confirmation')} type="password" required value={state.password_confirmation} placeholder={'Confirm Password'} />
            </p>
            {state.errors && state.errors.length > 0  && <p style={{backgroundColor: 'rgba(255,0,0,0.2)', color: 'rgba(134,57,57,0.9)', padding: '10px', borderRadius: '4px'}}>
                {state.errors.map(item => <span>{item}<br /></span>)}
            </p>}
            <p>
            <button disabled={state.loading}type={'submit'}>{state.loading ? 'Loading...' : 'Submit'}</button>
            </p>
        </form>
    </section>)
};

export default withRouter(Register);