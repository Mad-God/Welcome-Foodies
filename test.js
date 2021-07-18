function validateHTMlform() {
  let form = document.StudenSignupForm;
  if (form.textnames.value == "" && !isAlpha(form.textnames.value)) {
    alert("Enter Your First Name!");
    form.textnames.focus();
    return;
  }
  if (
    form.mobileno.value == "" ||
    isNaN(form.mobileno.value) ||
    form.mobileno.value.length != 10 ||
    !isNumeric(form.mobileno.value.length)
  ) {
    alert("Enter your Mobile No. in the format 123.");
    form.mobileno.focus();
    return;
  }

  return true;
}
