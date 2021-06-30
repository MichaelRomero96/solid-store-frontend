import {
    Dialog,
    Typography,
    TextField,
    makeStyles,
    Grid,
    Button
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginDialogAction } from '../reduxDucks/loginDucks';
import { setLoginAction } from '../reduxDucks/mainDuck';

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        padding: theme.spacing(5, 2, 5, 2)
    },
    inputContainer: {
        padding: theme.spacing(5, 10, 2, 10)
    }
}))

export default function Login() {
    const { loginDialog } = useSelector(state => state.login);
    const { users, login } = useSelector(state => state.main);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(true);
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const handleChange = ({ target }) => {
        setUserData({
            ...userData,
            [target.name]: target.value
        })
    };
    useEffect(() => {
        if (userData.email.trim().length && userData.password.trim().length) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }, [userData.email, userData.password]);
    const handleSubmit = () => {
        let filter = users.filter(user => user.email === userData.email);
        if (filter[0]) {
            if (filter[0].username === userData.password) {
                dispatch(setLoginAction(true, {
                    name: filter[0].name,
                    email: filter[0].email,
                    id: filter[0].id
                }))
            } else {
                alert('Contraseña inválida')
            }
        } else {
            alert('Usuario no registrado')
        }
    }
    return (
        <>
            <Dialog
                open={loginDialog}
                onClose={() => dispatch(setLoginDialogAction(false))}

            >
                {!login ?
                    <Grid container justify='center' className={classes.dialogContainer}>
                        <Grid item xs={12}>
                            <Typography align='center' variant='h4'>
                                Iniciar Sesión
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} justify='center' className={classes.inputContainer}>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        variant='outlined'
                                        placeholder='Email'
                                        onChange={handleChange}
                                        name='email'
                                        value={userData.email}
                                        type='email'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        variant='outlined'
                                        placeholder='Contraseña'
                                        onChange={handleChange}
                                        name='password'
                                        value={userData.password}
                                        type='password'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        disabled={checked}
                                        fullWidth
                                        onClick={handleSubmit}
                                        variant='contained'
                                        color='primary'>
                                        Entrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <Grid container
                        justify='center'
                        className={classes.dialogContainer}>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}>
                            <Typography align='center' variant='h6'>
                                Sesión Iniciada
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                onClick={() => dispatch(setLoginDialogAction(false))}
                            >
                                Aceptar
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Dialog>
        </>
    )
}

