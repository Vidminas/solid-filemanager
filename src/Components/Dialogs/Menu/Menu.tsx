import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { solidLogin, setHost, enterFolder, solidLogout, clearCache, MyDispatch, setErrorMessage, closeDialog } from '../../../Actions/Actions';
import { getLocationObjectFromUrl } from '../../HistoryHandler/HistoryHandler';
import { DialogButtonClickEvent, DialogDispatchProps, DialogStateProps } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

const FormDialog: React.FC<ChooseLocationProps> = (props) => {
    const { handleClose, handleLogout, open, isLoggedIn, webId } = props;
    const [location, setLocation] = useState("");
    const [oidcIssuer, setOidcIssuer] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(document.location.search.substr(1));
        const encodedUrl = params.get('url');
        setOidcIssuer('https://solidcommunity.net/');

        if (encodedUrl !== null) {
            const location = decodeURI(encodedUrl);
            setLocation(location);
        }
        else if (isLoggedIn && webId) {
            const location = (new URL(webId)).origin;
            setLocation(location);
        }
    }, [isLoggedIn, webId, setOidcIssuer, setLocation]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setLocation(event.target.value);
    }

    const handleIDProviderChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setOidcIssuer(event.target.value);
    }
    
    const handleSubmit = (event: DialogButtonClickEvent) => {
        props.handleSubmit(event, { location });
    }

    const handleLogin = (event: DialogButtonClickEvent) => {
        props.handleLogin(event, { oidcIssuer });
    }
    
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-choose-location" fullWidth={true} maxWidth={'sm'}>
            <form>
                <DialogTitle id="form-dialog-choose-location">Choose the storage location</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        {!isLoggedIn ?
                            "If you want to access private resources, please choose your ID provider and login with the button below."
                            : "Logged in as " + webId + "."
                        }
                    </Typography>
                    {
                        !isLoggedIn && <TextField autoFocus fullWidth
                            margin="normal"
                            label="Solid ID provider"
                            variant="outlined"
                            onChange={handleIDProviderChange}
                            value={oidcIssuer}
                            inputProps={{ 'data-cy': 'idp' }}
                            required />
                    }
                    {!isLoggedIn ?
                        <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
                        : <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                    }

                    <Typography variant="body1">
                        Please enter the directory you want to open below.
                </Typography>
                <TextField autoFocus fullWidth
                    margin="normal"
                    label="Storage Location"
                    variant="outlined"
                    onChange={handleChange}
                    inputProps={{ 'data-cy': 'storageLocation' }}
                    value={location ?? ""} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                        Cancel
                </Button>
                    <Button color="primary" type="submit" onClick={handleSubmit}>
                        Open directory
                </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

interface StateProps extends DialogStateProps {
    webId: string | null;
    isLoggedIn: boolean;
}
interface DispatchProps extends DialogDispatchProps {
    handleLogin(event: DialogButtonClickEvent, { oidcIssuer }: { oidcIssuer: string }): void;
    handleLogout(event: DialogButtonClickEvent): void;
    handleSubmit(event: DialogButtonClickEvent, { location }: { location: string }): void;
}
interface ChooseLocationProps extends StateProps, DispatchProps { }


const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: state.visibleDialogs.CHOOSE_LOCATION,
        webId: state.account.webId,
        isLoggedIn: state.account.loggedIn
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handleClose: () => {
            dispatch(closeDialog(DIALOGS.CHOOSE_LOCATION));
        },
        handleLogin: (event, { oidcIssuer }) => {
            event.preventDefault();
            dispatch(solidLogin(oidcIssuer));
        },
        handleLogout: event => {
            event.preventDefault();
            dispatch(solidLogout());
        },
        handleSubmit: (event, { location }) => {
            event.preventDefault();
            if (!location)
                return dispatch(setErrorMessage("Please enter the folder which should be opened"));

            const { host, path } = getLocationObjectFromUrl(location);
            dispatch(closeDialog(DIALOGS.CHOOSE_LOCATION));
            dispatch(setHost(host));
            dispatch(clearCache());
            dispatch(enterFolder(path));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
