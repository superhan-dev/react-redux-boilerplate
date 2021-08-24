import React, {useState, useEffect} from "react";
import {
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../_actions";
import {useLocation} from "react-router-dom";
import {Footer} from "../../_components";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        margin: "0px",
    },
    root: (props) => ({}),
    container: {},

    form: {},

    textGroup: {},

    primaryText: {},
    secondaryText: {},

    button: {},

    textField: {},

    logo: {},
}));

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        showPassword: false,
    });

    const [submitted, setSubmitted] = useState(false);
    const {username, password, showPassword} = inputs;

    const classes = useStyles();
    const location = useLocation();

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        // 사용자가 로그인된 상태인데 다시 로그인페이지로 돌아온다면, 로그아웃을 요청한 상황이므로 로그아웃처리한다.
        if (user.loggedIn) {
            dispatch(userActions.logout());
        }
    }, []);

    const alert = useSelector((state) => state.alert);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs((inputs) => ({...inputs, [name]: value}));
    }

    function handleClickShowPassword() {
        setInputs({...inputs, showPassword: !showPassword});
    }

    function handleMouseDownPassword(event) {
        event.preventDefault();
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const {from} = location.state || {from: {pathname: "/"}};
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <img className={classes.logo} src="/images/index/logo.png" alt=""></img>

                <form className={classes.form} name="form" onSubmit={handleSubmit}>
                    <TextField
                        className={classes.textField}
                        type={"text"}
                        label={"아이디"}
                        name="username"
                        value={username}
                        onChange={handleChange}
                        placeholder={"아이디를 입력하세요."}
                        variant="outlined"
                        error={alert && alert.type.endsWith("danger") ? true : false}
                        helperText={submitted && !username && "아이디를 확인해 주세요."}
                    />

                    <TextField
                        className={classes.textField}
                        type={showPassword ? "text" : "password"}
                        label={"패스워드"}
                        name="password"
                        value={password}
                        placeholder={"패스워드를 입력하세요."}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={alert && alert.type.endsWith("danger") ? true : false}
                        helperText={submitted && !password && "패스워드를 확인해 주세요."}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disableElevation
                    >
                        {user.loggingIn ? <CircularProgress/> : "로그인"}
                    </Button>
                </form>
            </Container>
            <Footer _user={user}/>
        </div>
    );
}

export {LoginPage};
