import React, { ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { withStyles, createStyles, WithStyles } from "@mui/styles";
import { Theme, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { connect } from 'react-redux';
import { refreshItemList, moveFolderUpwardsAndRefresh, filterItems, MyDispatch } from '../../Actions/Actions';
import ThreeDotsMenu from './ThreeDotsMenu';
import BreadcrumbText from '../Breadcrumb/BreadcrumbText';
import { AppState } from '../../Reducers/reducer';

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginBottom: '4.3em'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block', // was none
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
      display: 'block'
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 100,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function SearchAppBar(props: SearchAppBarProps) {
  const { classes, path, filter, moveUpwards, canGoBack, handleChange, handleRefresh } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            <BreadcrumbText 
                path={path} 
                handleClickPath={(index: number) => moveUpwards(path.length - index - 1)} 
                handleGoBack={() => moveUpwards(1)}
                canGoBack={canGoBack}
                rootTitle="Solid Filemanager"
            />
          </Typography>
          <div className={classes.grow} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={filter}
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <IconButton color="inherit" aria-label="Refresh" onClick={handleRefresh} size="large">
            <RefreshIcon/>
          </IconButton>
          <ThreeDotsMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

interface StateProps {
  filter: string;
  path: string[];
  canGoBack: boolean; 
}
interface DispatchProps {
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  moveUpwards(n: number): void;
  handleRefresh(): void;
}
interface SearchAppBarProps extends StateProps, DispatchProps, WithStyles<typeof styles> {

}


const mapStateToProps = (state: AppState): StateProps => {
    return {
        filter: state.items.filter,
        path: state.path,
        canGoBack: state.path.length > 0,
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handleChange: (event) => {
            dispatch(filterItems(event.currentTarget.value));
        },
        moveUpwards: (n) => {
          console.log('moveUpwards', n);
          dispatch(moveFolderUpwardsAndRefresh(n));
        },
        handleRefresh: () => dispatch(refreshItemList())
    };
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchAppBar));
