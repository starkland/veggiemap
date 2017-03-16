import Events from '../../events/all';

class Auth {
  constructor() {
    this.facebook = this.facebookLogin;
    this.google = this.googleLogin;

    this.fb_provider = new firebase.auth.FacebookAuthProvider();
    this.gl_provider = new firebase.auth.GoogleAuthProvider();
  }

  facebookLogin() {
    firebase.auth().signInWithRedirect(this.fb_provider).then((result) => {
      this.sendEvent(result);
    }).catch(err => this.handleError(err));
  }

  googleLogin() {
    firebase.auth().signInWithRedirect(this.gl_provider).then((result) => {
      this.sendEvent(result);
    }).catch(err => this.handleError(err));
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.sendEvent(null);
    }).catch(err => console.warn(err));
  }

  sendEvent(obj) {
    if (obj === null) {
      Events.$emit('user_logout');
    } else {
      Events.$emit('user_logged', obj);
    }
  }

  handleError(err) {
    Events.$emit('auth_error', err);
  }
}

export default Auth;