import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { createBrowserHistory, History, Location } from "history";
import { MyDispatch, setHost, enterFolder } from "../../Actions/Actions";
import { AppState } from "../../Reducers/reducer";

const HistoryHandler: React.FC<HistoryHandlerProps> = (props) => {
    const { host, path, handlePop: parentHandlePop } = props;
    const [states, setStates] = useState<LocationState[]>([]);
    const [stateIndex, setStateIndex] = useState<number>(-1);
    const [history] = useState<History>(createBrowserHistory());

    const handlePop = useCallback((location: Location) => {
        setStateIndex((location.state as LocationState).index);
        parentHandlePop(location);
    }, [parentHandlePop]);

    const handleReplace = useCallback((location: Location) => {
        setStates(prevStates => [
            ...prevStates.slice(0, stateIndex),
            location.state as LocationState,
            ...prevStates.slice(stateIndex + 1)
        ]);
    }, [setStates, stateIndex]);

    const handlePush = useCallback((location: Location) => {
        setStates(prevStates => [
            ...prevStates.slice(0, stateIndex + 1),
            location.state as LocationState
        ]);
        setStateIndex(prevIndex => prevIndex + 1);
    }, [setStates, setStateIndex, stateIndex]);

    useEffect(() => {
        return history.listen(({
            action,
            location
        }) => {
            switch(action) {
                case 'POP':
                    handlePop(location);
                    break;
                case 'REPLACE':
                    handleReplace(location);
                    break;
                case 'PUSH':
                    handlePush(location);
                    break;
            }
        });
    }, [history, handlePop, handlePush, handleReplace]);
    
    const updateBrowserHistory = useCallback(() => {
        const url = encodeURI(`${host}/${path.join('/')}`);
        const newState = {
            host: host || '',
            path,
            index: stateIndex + 1,
        };

        history.push(`?url=${url}`, newState);
    }, [host, path, stateIndex, history]);

    useEffect(() => {
        // Don't update history when the host is invalid
        if (host === null) {
            return;
        }
        if (states.length === 0 || stateIndex < 0) {
            updateBrowserHistory();
            return;
        }
        
        const prevState = states[stateIndex];
        if (!locationsEqual({ host, path }, prevState)) {
            updateBrowserHistory();
        }
    }, [host, states, stateIndex, path, updateBrowserHistory]);

    // This Component doesn't provide anything to the DOM
    // The only reason it is a component is to get access to the state and dispatch
    return <></>;
}

interface LocationState extends MyLocation {
    index: number;
}
interface MyLocation {
    host: string;
    path: string[];
}

interface StateProps {
    host: string | null;
    path: string[];
}
interface DispatchProps {
    handlePop(location: Location): void;
}
interface HistoryHandlerProps extends StateProps, DispatchProps { }


const mapStateToProps = (state: AppState): StateProps => ({
    host: state.account.host,
    path: state.path
});

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handlePop: (location: Location) => {
            let host = '';
            let path: string[] = [];

            if (location && typeof location.state !== typeof undefined) {
                ({ host, path } = (location.state as MyLocation));
            }
            else {
                const params = new URLSearchParams(location.search.slice(1));
                const url = params.get('url');
                if (url !== null) {
                    ({ host, path } = getLocationObjectFromUrl(url));
                }
            }
            dispatch(setHost(host));
            dispatch(enterFolder(path));
        }
    };
};

export const getLocationObjectFromUrl = (urlString: string) => {
    const url = new URL(urlString);
    const host = url.origin;
    const path = url.pathname.split('/').filter(val => val !== '');

    return {
        host,
        path
    };
}

const locationsEqual = (first: MyLocation, second: MyLocation) => {
    return first.host === second.host
           && first.path.length === second.path.length
           && first.path.every((val, index) => val === second.path[index]);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryHandler);
