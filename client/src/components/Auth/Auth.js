import React, {useState, useEffect} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {GoogleLogin} from "react-google-login";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import Icon from './icon';
import useStyles from './styles';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import {signIn, signUp} from '../../actions/auth'
import {gapi} from "gapi-script";



const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    let isCorrect = true;
    const [matchPass, setMatchPass] = useState(true);
    const [emailVal, setEmailVal] = useState(true);
    const [passwordVal, setPasswordVal] = useState(true);
    const [firstNameVal, setFirstNameVal] = useState(true);
    const [lastNameVal, setLastNameVal] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        function start() {
            gapi.client.init({
                clientId: "97723876179-lt0hkkmu6sg1bejjc5p8uve2fgit9c39.apps.googleusercontent.com",
                scope: "",
            })
        }
        gapi.load('client:auth2', start);
    })


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const validate = (values) => {

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;
        const regexName = /^[A-Za-z]{3,32}/i

        setMatchPass(true);
        setPasswordVal(true)
        setEmailVal(true)
        setFirstNameVal(true)
        setLastNameVal(true)
        isCorrect = true;

        if(values.password !== values.confirmPassword)
        {
            setMatchPass(false);
            isCorrect = false;
        }
        if(!regexPassword.test(values.password)) {
            setPasswordVal(false)
            isCorrect = false;
        }
        if(!regexEmail.test(values.email)) {
            setEmailVal(false)
            isCorrect = false;
        }
        if(!regexName.test(values.firstName)) {
            setFirstNameVal(false)
            isCorrect = false;
        }
        if(!regexName.test(values.lastName)) {
            setLastNameVal(false)
            isCorrect = false;
        }


    };

    const handleSubmit = (e) => {
        e.preventDefault()

        validate(formData);

            if(isSignUp){
                if(isCorrect) {
                    dispatch(signUp(formData, navigate))
                    if (localStorage.key('user')) {
                        window.alert(localStorage.getItem('user'))
                        localStorage.removeItem('user')
                    }
                }
            } else {
                dispatch(signIn(formData, navigate))
            }

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({type: 'AUTH', data: {result, token}});

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };



    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name"  handleChange={handleChange} autoFocus half/>
                                    {!firstNameVal &&(
                                        <p style={{color: 'red', marginLeft: "10px"}}> This is not valid First Name format!</p>
                                    )}
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                    {!lastNameVal &&(
                                        <p style={{color: 'red', marginLeft: "10px"}}> This is not valid  Last Name format!</p>
                                    )}
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        {!emailVal &&(
                            <p style={{color: 'red', marginLeft: "10px"}}> This is not valid email format!</p>
                        )}
                        <Input name="password" label="Password"  handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {!passwordVal&&isSignUp &&(
                            <p style={{color: 'red', marginLeft: "10px"}}> Password must have minimum eight characters, at least one letter, one number and one special character</p>
                        )}
                        { isSignUp && <> <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                            {!matchPass &&(
                            <p style={{color: 'red', marginLeft: "10px"}}> Passwords are different!</p>
                                )}
                            </>
                            }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="97723876179-lt0hkkmu6sg1bejjc5p8uve2fgit9c39.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained' >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default  Auth;
