import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom'

// function Authentication({ updateUser }) {
//     const history = useHistory()
//     const loginURL = 'http://127.0.0.1:5555/login'
//     const createAccountURL = 'http://127.0.0.1:5555/create_account'

//     const initialState = {
//         username: '',
//         password: '',
//         email: ''
//     }

//     const [signUp, setSignUp] = useState(false)
//     const [formState, setFormState] = useState(initialState)

//     const changeFormState = (e) => {
//         const { name, value } = e.target
//         const updateFormState = { ...formState, [name]: value }
//         setFormState(updateFormState)
//     }

//     const handleClick = () => setSignUp((signUp) => !signUp)

//     const userLoginOrCreation = (e) => {
//         // if (signUp) {
//         //     if (formState.password == formState.c_password) {}
//         //     else {
//         //         return "Error: Passwords do not match";
//         //     }
//         // }
//         e.preventDefault()

//         const postRequest = {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//                 'accept': 'application/json'
//             },
//             body: JSON.stringify(formState)
//         }

//         fetch(signUp ? createAccountURL : loginURL, postRequest)
//             .then(r => r.json())
//             .then(user => {
//                 if (user) {
//                     updateUser(user)
//                     history.push('/')
//                     setFormState(initialState)
//                 } else {
//                     console.log("error")
//                 }
//             })
//     }
function Authentication({ updateUser }) {
    const history = useHistory();
    const loginURL = 'http://127.0.0.1:5555/login';
    const createAccountURL = 'http://127.0.0.1:5555/create_account';

    const initialState = {
        username: '',
        password: '',
        email: ''
    };

    const [signUp, setSignUp] = useState(false);
    const [formState, setFormState] = useState(initialState);
    const [fetching, setFetching] = useState(false); // Track fetching state
    const [formErrors, setFormErrors] = useState(null)

    const renderFormErrors = () => {
        return 
    }

    useEffect(() => {
        return () => {
            // Cleanup function
            if (fetching) {
                controller.abort(); // Cancel the fetch request
            }
        };
    }, [fetching]);

    const controller = new AbortController();

    const changeFormState = (e) => {
        const { name, value } = e.target;
        const updatedFormState = { ...formState, [name]: value };
        setFormState(updatedFormState);
    };

    const handleClick = () => setSignUp((signUp) => !signUp);

    const userLoginOrCreation = (e) => {
        e.preventDefault();
        
        const postRequest = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(formState),
            signal: controller.signal // Pass the signal to the fetch request
        };

        setFetching(true); // Start fetching

        fetch(signUp ? createAccountURL : loginURL, postRequest)
            .then((r) => r.json())
            .then((user) => {
                if (!user.errors) {
                    updateUser(user)
                    history.push('/')
                    setFormState(initialState)
                } else {
                    setFormErrors(user.errors)
                }
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted')
                } else {
                    console.log('Fetch error:', error)
                }
            })
            .finally(() => {
                setFetching(false) // Fetching completed
            });
    };


    return (
        <>
            <div className="auth-form">
                <div className="auth-info">
                    <h2 style={{ color: 'red' }}> {formErrors? renderFormErrors() : null}</h2>
                    <h2>Please Log in or Sign up!</h2>
                    <h2>{signUp ? 'Already a member?' : 'Not a member?'}</h2>
                    <Button variant="secondary" onClick={handleClick}>
                        {signUp ? 'Log In!' : 'Register now!'}
                    </Button>
                </div>
                <Form style={{ width: '25rem' }} onSubmit={userLoginOrCreation}>
                    {signUp ?
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="username"
                                    name="username"
                                    placeholder="Enter username"
                                    value={formState.username}
                                    onChange={changeFormState}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email URL"
                                    value={formState.email}
                                    onChange={changeFormState}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formState.password}
                                    onChange={changeFormState}
                                    required
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formState.c_password}
                                    onChange={changeFormState}
                                    required
                                />
                            </Form.Group> */}
                        </div>
                        :
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="username"
                                    name="username"
                                    placeholder="Enter username"
                                    value={formState.username}
                                    onChange={changeFormState}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formState.password}
                                    onChange={changeFormState}
                                    required
                                />
                            </Form.Group>
                        </div>}

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I'm not a robot" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Authentication