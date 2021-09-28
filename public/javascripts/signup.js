let signUpCash = localStorage.getItem("person");
if (signUpCash) {
  signUpCash = JSON.parse(signUpCash);
  $("#firstname").val(signUpCash.firstname);
  $("#lastname").val(signUpCash.lastname);
  $("#username").val(signUpCash.username);
  $("#phonenumber").val(signUpCash.phonenumber);
  $("#email").val(signUpCash.email);
  $("#birthdate").val(signUpCash.birthdate);
}

$("#signupForm").submit(function (e) {
  $("#firstNameAlert").addClass("d-none");
  $("#lastNameAlert").addClass("d-none");
  $("#phonenumberAlert").addClass("d-none");
  $("#passwordAlert").addClass("d-none");

  let person = {};
  let firstname = $("#firstname").val();
  let lastname = $("#lastname").val();
  let username = $("#username").val();
  let password = $("#password").val();
  let phonenumber = $("#phonenumber").val();
  let email = $("#email").val();
  let birthdate = $("#birthdate").val();

  person.firstname = firstname;
  person.lastname = lastname;
  person.username = username;
  person.password = password;
  person.phonenumber = phonenumber;
  person.email = email;
  person.birthdate = birthdate;

  localStorage.setItem("person", JSON.stringify(person));

  if (firstname.length < 3 || firstname.length > 20) {
    $("#firstNameAlert").removeClass("d-none");
    e.preventDefault();
  }
  if (lastname.length < 3 || lastname.length > 20) {
    $("#lastNameAlert").removeClass("d-none");
    e.preventDefault();
  }
  if (!phonenumber.match(/^\d{11}$/)) {
    $("#phonenumberAlert").removeClass("d-none");
    e.preventDefault();
  }
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-z A-Z \d]{8,20}$/)) {
    $("#passwordAlert").removeClass("d-none");
    e.preventDefault();
  }

});

