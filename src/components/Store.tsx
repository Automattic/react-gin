import React, { PureComponent } from 'react';
import { StoreContext } from './storeContext';
import GinStore, { Deed, obj, checkEqualOneLevelDeep, BatchMode } from 'gin';

type NameFunction = (generatedId: string) => string;
interface StoreProps {
  deeds?: Deed[];
  cargo?: obj<any>;
  customFetch?: any;
  batchTime?: number;
  batchMode?: BatchMode;
  name?: string | NameFunction;
  debug?: boolean;
  sync?: Record<string, any>;
  [key: string]: any;
}

interface StoreState {
  connected: boolean;
}

class Store extends PureComponent<StoreProps, StoreState> {
  public state = {
    connected: true,
  };

  private store: GinStore;
  private synced: any = { current: null };

  constructor(props: StoreProps) {
    super(props);
    this.init(props);
  }

  public init = props => {
    this.store = new GinStore({ cargo: {}, deeds: [], ...props });

    // Sets up proxy to track when sync is modified, calling updateCargo
    if (props.sync) {
      this.handleSync(props.sync);
    }
  };

  public handleSync = sync => {
    this.synced = new Proxy(sync, {
      set: (target, prop, val, reciever) => {
        Reflect.set(target, prop, val, reciever);
        this.store.updateCargo(val);
        return true;
      },
    });
  };

  public componentDidMount() {
    this.checkConnection();
  }

  public componentDidCatch(e) {
    this.setState({ connected: false });
  }

  public checkConnection() {
    if (!GinStore.namedStores.has(this.store.getName())) {
      this.setState({ connected: false });

      this.store.disconnect();
      this.init(this.props);
    }

    if (!this.state.connected) {
      this.setState({ connected: true });
    }
  }

  public getSnapshotBeforeUpdate(prevProps) {
    this.checkConnection();
    if (!checkEqualOneLevelDeep(prevProps.sync, this.props.sync)) {
      this.synced.current = this.props.sync; // triggers proxy trap
    }
    this.store.updateCurrentProps(this.props);
    return null;
  }

  // tslint:disable-next-line: no-empty
  public componentDidUpdate() {}

  public componentWillUnmount() {
    this.store.disconnect();
  }

  public render() {
    return (
      <StoreContext.Provider
        value={{
          name: this.store.getName(),
        }}
      >
        {this.state.connected && this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default Store;
