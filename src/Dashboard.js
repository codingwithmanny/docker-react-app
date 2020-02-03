import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

const Dashboard = props => {
    const [state, setState] = useState({
        errors: null,
        loading: true,
        user: null,
    });

    const onClickLogout = () => {
        localStorage.removeItem('GITBRANCH_TOKEN');
        props.history.push('/login');
    }

    const onLoad = useCallback(() => {
        fetch('http://api.gitbranch.xyz/api/auth/me',
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('GITBRANCH_TOKEN')}`
            },
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
                ...state,
                loading: false,
                user: json.data
            })
        })
        .catch(error => {
            console.log('error', error)
            setState({
                ...state,
                errors: error.error
            });
        })
    }, []);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

return (state.loading ? <section>{state.errors ? <p>{JSON.stringify(state.errors)}</p> : <p>Loading...</p>}</section> : <div>
        <nav>
            <header>
                LMS
            </header>
            <ul>
                <li>{state.user && state.user.name}{state.user && state.user.email && `(${state.user.email})`}</li>
                <li><button onClick={onClickLogout}>Log Out</button></li>
            </ul>
        </nav>
        <section>

        <h1>Dashboard</h1>

        <h2>Welcome back <span style={{color: '#0088AA'}}>{state.user && state.user.name}</span>!</h2>

        <hr />
        
        <h2>My Courses</h2>

        <p>No Courses Yet</p>
    </section></div>)
};

export default withRouter(Dashboard);