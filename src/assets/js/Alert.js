class Alert {
  constructor() {
    this.alert = window.swal;
  }

  success(obj) {
    let { title, text, btnText } = obj;

    return this.alert({
      title: title,
      text: text,
      type: "success",
      confirmButtonText: btnText
    })
  }

  error(obj) {
    let { title, text, btnText } = obj;

    return this.alert({
      title: title,
      text: text,
      type: "error",
      confirmButtonText: btnText
    })
  }
}

export default Alert;