import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Theme } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import { MyDispatch, resetErrorMessage } from '../../Actions/Actions';
import { AppState } from '../../Reducers/reducer';

const useStyles = makeStyles()((theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const DynamicSnackbar: React.FC<DynamicSnackbarProps> = (props) => {
  const { errorMsg, handleClose, open, notificationDuration } = props;
  const { classes } = useStyles();

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={notificationDuration}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errorMsg}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
            size="large">
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

interface StateProps {
  open: boolean;
  errorMsg: string;
  notificationDuration: number;
}
interface DispatchProps {
  handleClose(): void;
}
interface DynamicSnackbarProps extends StateProps, DispatchProps {}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: !!state.errorMessage,
        errorMsg: state.errorMessage,
        notificationDuration: 60000
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handleClose: () => {
          dispatch(resetErrorMessage());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicSnackbar);

