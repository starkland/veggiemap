class Alert {
  constructor(obj) {
    this.alert = window.swal;

    this.title = obj.title;
    this.text = obj.text;
    this.btnText = obj.btnText;
  }

  success() {
    return this.alert({
      title: this.title,
      text: this.text,
      type: "success",
      confirmButtonText: this.btnText
    })
  }

  error() {
    return this.alert({
      title: this.title,
      text: this.text,
      type: "error",
      confirmButtonText: this.btnText
    })
  }

  info() {
    return this.alert({
      title: this.title,
      text: this.text,
      type: "info",
      confirmButtonText: this.btnText
    })
  }
}

export default Alert;