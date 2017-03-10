import Events from '../../events/all';

class Auth {
  constructor() {
    this.facebook = this.facebookLogin;
    this.google = this.googleLogin;

    this.fb_provider = new firebase.auth.FacebookAuthProvider();
    this.gl_provider = new firebase.auth.GoogleAuthProvider();
  }

  facebookLogin() {
    firebase.auth().signInWithPopup(this.fb_provider).then((result) => {
      this.sendEvent(result);
    }).catch(err => console.warn(err));
  }

  googleLogin() {
    firebase.auth().signInWithPopup(this.gl_provider).then((result) => {
      this.sendEvent(result);
    }).catch(err => console.warn(err));
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.sendEvent(null);
    }).catch(err => console.warn(err));
  }

  sendEvent(obj) {
    if (obj === null) {
      Events.$emit('user_logout');
    }

    Events.$emit('user_logged', {
      credential: obj.credential,
      user: obj.user
    });
  }
}

export default Auth;