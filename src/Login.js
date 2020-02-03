import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

const Login = props => {
    const [state, setState] = useState({
        loading: false,
        errors: null,
        email: '',
        password: '',
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
        fetch('http://api.gitbranch.xyz/api/auth/login',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password,
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
                errors: error.error
            });
        })
        event.preventDefault();
    }

    return (<section>
        <h1>Login</h1>
        <p>Don't have an account? <Link to={'/register'}>Register</Link> a new account.</p>
        <form onSubmit={onSubmitForm}>
            <p>
                <label>Email</label>
                <input disabled={state.loading} onChange={onChangeInput('email')} type="email" required value={state.email} placeholder={'Email address'} />
            </p>

            <p>
                <label>Password</label>
                <input disabled={state.loading} onChange={onChangeInput('password')} type="password" required value={state.password} placeholder={'Password'} />
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

export default withRouter(Login);