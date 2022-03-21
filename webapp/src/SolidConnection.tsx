import { useState, useEffect } from "react";
import { Autocomplete, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";
import { handleIncomingRedirect, onSessionRestore } from "@inrupt/solid-client-authn-browser";


export default function SolidConection() {
    const navigate = useNavigate();
    const { session } = useSession();
    const [oidcIssuer, setOidcIssuer] = useState("https://broker.pod.inrupt.com/");

    const providers = [{ displayName: "Broker Inrupt", url: "https://broker.pod.inrupt.com/" }, { displayName: "Inrupt", url: "https://inrupt.net/" }]

    onSessionRestore((url) => {
        if (session.info.isLoggedIn) {
            navigate(url);
        }
    });

    useEffect(() => {
        handleIncomingRedirect({
            restorePreviousSession: true
        }).then(() => {
            if (session.info.isLoggedIn) {
                navigate("/profile");
            }
        })
    }, []);

    return (
        <Container id="mainLoginDiv">
            <>
                <Typography id="solidLogin" variant="h3">
                    SOLID Login
                </Typography>
                <Autocomplete
                    disablePortal
                    id="combo-box-providers"
                    options={providers}
                    renderInput={(params) => <TextField {...params} label="Proveedor:" />}
                    getOptionLabel={(option) => option.displayName}
                    onChange={(e, value) => {
                        if (value != null)
                            setOidcIssuer(value.url)
                    }}
                />
                <Grid id="solidButtons" container>
                    <Grid item>
                        <LoginButton
                            oidcIssuer={oidcIssuer}
                            redirectUrl={window.location.href}>
                            <Button id="loginButton" data-testid="button" color="primary" variant="contained">Conectar</Button>
                        </LoginButton>
                    </Grid>
                    <Grid item>
                        <Button href="/" variant="contained" id="cancelButton">Cancelar</Button>
                    </Grid>
                </Grid>
                <Typography variant="body1" component="p" id="help">
                    ¿No tienes un POD? Registrate aquí: <Link id="inrupt" href="https://signup.pod.inrupt.com" target="_blank">Inrupt</Link>
                </Typography>
            </>
        </Container>
    );
}