import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import green from '@mui/material/colors/green';
import amber from '@mui/material/colors/amber';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { withStyles, createStyles, WithStyles } from "@mui/styles";
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

const styles1 = (theme: Theme) => createStyles({
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
});

function MySnackbarContent(props: MySnackbarContentProps) {
  const { open, classes, className, message, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    open ?
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        {...other}
      />
    : <></>
  );
}

interface MySnackbarContentProps extends WithStyles<typeof styles1> {
  open: boolean;
  className: string;
  variant: VariantTypes;
  message: string;
  [k: string]: any;
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = (theme: Theme) => createStyles({
  margin: {
    margin: theme.spacing(),
  },
});

function CustomizedSnackbars(props: CustomizedSnackbarsProps) {
  const { classes, open, errorMsg } = props;
  return (
      <MySnackbarContentWrapper
        variant={VariantTypes.ERROR}
        open={open}
        className={classes.margin}
        message={errorMsg}
      />
  );
}

interface StateProps {
  open: boolean;
  errorMsg: string;
}
interface CustomizedSnackbarsProps extends StateProps, WithStyles<typeof styles2> {}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: !!state.errorMessage,
        errorMsg: state.errorMessage,
    };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles2)(CustomizedSnackbars));


