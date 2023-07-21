import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import green from '@mui/material/colors/green';
import amber from '@mui/material/colors/amber';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles } from 'tss-react/mui';
import { Theme } from "@mui/material/styles";
import { connect } from 'react-redux';
import { AppState } from '../../Reducers/reducer';


enum VariantTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}

const variantIcon = {
  [VariantTypes.SUCCESS]: CheckCircleIcon,
  [VariantTypes.WARNING]: WarningIcon,
  [VariantTypes.ERROR]: ErrorIcon,
  [VariantTypes.INFO]:InfoIcon,
};

const useStyles1 = makeStyles()((theme) => ({
    [VariantTypes.SUCCESS]: {
      backgroundColor: green[600],
    },
    [VariantTypes.ERROR]: {
      backgroundColor: theme.palette.error.dark,
    },
    [VariantTypes.INFO]: {
      backgroundColor: theme.palette.primary.dark,
    },
    [VariantTypes.WARNING]: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
}));

const MySnackbarContent: React.FC<MySnackbarContentProps> = (props) => {
  const { open, className, message, variant, ...other } = props;
  const { classes, cx } = useStyles1();
  const Icon = variantIcon[variant];

  return (
    open ?
      <SnackbarContent
        className={cx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={cx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        {...other}
      />
    : <></>
  );
};

interface MySnackbarContentProps {
  open: boolean;
  className: string;
  variant: VariantTypes;
  message: string;
  [k: string]: any;
}

const useStyles2 = makeStyles()((theme: Theme) => ({
  margin: {
    margin: theme.spacing(),
  },
}));

const CustomizedSnackbars: React.FC<StateProps> = (props) => {
  const { open, errorMsg } = props;
  const { classes } = useStyles2();
  return (
      <MySnackbarContent
        variant={VariantTypes.ERROR}
        open={open}
        className={classes.margin}
        message={errorMsg}
      />
  );
};

interface StateProps {
  open: boolean;
  errorMsg: string;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: !!state.errorMessage,
        errorMsg: state.errorMessage,
    };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedSnackbars);


