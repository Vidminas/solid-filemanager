import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { Theme } from "@mui/material/styles";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import './BreadcrumbText.css';

const useStyles = makeStyles()((theme: Theme) => ({
  lastPath: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  paths: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  }
}));

const BreadcrumbText: React.FC<BreadcrumbTextProps> = (props) => {
  const { handleClickPath, path, rootTitle, handleGoBack, canGoBack } = props;
  const { classes } = useStyles();

  const separator = <span>&gt;</span>;
  const rootPath = <span onClick={() => handleClickPath(-1)} data-index={0}>
      { rootTitle } { path.length ? separator : '' }
  </span>;
  const lastPath = [...path].pop() || rootTitle;

  const directories = path.map((dir: string, index: number) => {
      return <span key={index} data-index={index} onClick={(e) => handleClickPath(index)}>
          <span>{dir}</span> { path.length -1 !== index ? separator : '' }&nbsp;
      </span>
  });

  return (
      <div className="BreadcrumbText">
          <div className={classes.lastPath}>
              <Button onClick={handleGoBack} color="inherit" type="button" style={{display: canGoBack ? 'inline-flex' : 'none'}}>
                  <KeyboardArrowLeftIcon />
              </Button>
              {lastPath}
          </div>
          <div className={classes.paths}>{rootPath} {directories}</div>
      </div>
  );
}

interface BreadcrumbTextProps {
    handleClickPath(index: number): void;
    handleGoBack(): void;
    canGoBack: boolean;
    path: string[];
    rootTitle: string;

}

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbText);
