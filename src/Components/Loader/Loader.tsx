import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Theme } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles()((theme: Theme) => ({
  progress: {
    margin: theme.spacing(10),
  },
}));

function Loader() {
  const { classes } = useStyles();
    return (
        <Grid container justifyContent="center">
            <CircularProgress className={classes.progress} color="secondary" />
        </Grid>
    );
}

export default Loader;
