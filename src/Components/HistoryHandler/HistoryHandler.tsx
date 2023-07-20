import React, { Component } from "react";
import { connect } from "react-redux";
import { createBrowserHistory, History, Location } from "history";
import { MyDispatch, setHost, enterFolder } from "../../Actions/Actions";
import { AppState } from "../../Reducers/reducer";

class HistoryHandler extends Component<HistoryHandlerProps> {
    private history: History;
    private states: LocationState[];
    private stateIndex: number;

    constructor(props: HistoryHandlerProps) {
        super(props);

        this.states = [];
        this.stateIndex = -1;
        this.history = createBrowserHistory();
        this.history.listen(({
            action,
            location
        }) => {
            switch(action) {
                case 'POP':
                    this.handlePop(location);
                    break;
                case 'REPLACE':
                    this.handleReplace(location);
                    break;
                case 'PUSH':
                    this.handlePush(location);
                    break;
            }
        });
    }

    componentDidUpdate() {
        const { host, path } = this.props;

        // Don't update history when the host is invalid
        if (host === null)
            return;
        if (this.states.length === 0 || this.stateIndex < 0)
            return this.updateBrowserHistory();
        
        const prevState = this.states[this.stateIndex];

        if (!locationsEqual({ host, path }, prevState))
            this.updateBrowserHistory();
    }

    updateBrowserHistory() {
        const { host, path } = this.props;
        const url = encodeURI(`${host}/${path.join('/')}`);
        const newState = {
            host: host || '',
            path,
            index: this.stateIndex + 1,
        };

        this.history.push(`?url=${url}`, newState);
    }

    handlePop(location: Location) {
        this.stateIndex = (location.state as LocationState).index;
        this.props.handlePop(location);
    }

    handleReplace(location: Location) {
        this.states[this.stateIndex] = (location.state as LocationState);
    }

    handlePush(location: Location) {
        this.states = [...this.states.slice(0, ++this.stateIndex), (location.state as LocationState)];
    }

    render() {
        // This Component doesn't provide anything to the DOM
        // The only reason it is a component is to get access to the state and dispatch
        return <></>;
    }
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
                const params = new URLSearchParams(location.search.substr(1));
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
