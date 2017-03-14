import Event from '../../events/all';

class Network {
  constructor() {
    this.status = null;

    // let dispatch = this.dispatch;
    let handleConnection = this.handleConnection;

    window.addEventListener('offline', handleConnection);
    window.addEventListener('online', handleConnection);
  }

  handleConnection(event) {
    this.status = event.type;

    Event.$emit('network', {
      status: this.status
    });
  }
}

export default Network;