import React from 'react';
import { withStyles, createStyles, WithStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

const styles = (theme: Theme) => createStyles({
  progress: {
    margin: theme.spacing(10),
  },
});

function Loader(props: LoaderProps) {
    return (
        <Grid container justifyContent="center">
            <CircularProgress className={props.classes.progress} color="secondary" />
        </Grid>
    );
}

interface LoaderProps extends WithStyles<typeof styles> {};

export default withStyles(styles)(Loader);
