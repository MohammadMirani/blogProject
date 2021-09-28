$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $("#addProject").toggleClass("hidden-xs");
  });
});

function viewProfile(username) {
  $.ajax({
    type: "GET",
    url: "/user/getSingleUser/" + username,
    success: function (user) {
      renderProfile(user);
    },
  });
}

function renderProfile(user) {
  let html = "";
  html = `<div class="modal-header login-header">
  <button type="button" class="close" data-dismiss="modal">×</button>
  <h4 class="modal-title">Profile</h4>
  </div>
 <div class="modal-body">
  <table class="table table-striped">
    <tr>
      <td class="" style="align-items: center"><b>firstname</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="firstname"
          type="text"
          value="${user.firstname}"
          disabled
          required
        />
      </td>
    </tr>

    <tr>
      <td style="align-items: center"><b>lastname</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="lastname"
          type="text"
          value="${user.lastname}"
          disabled
          required
        />
      </td>
    </tr>
    <tr>
      <td style="align-items: center"><b>username</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="username"
          type="text"
          value="${user.username}"
          disabled
          required
        />
      </td>
    </tr>
    <tr>
      <td style="align-items: center"><b>email</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="email"
          type="email"
          value="${user.email}"
          disabled
          required
        />
      </td>
    </tr>
    <tr>
      <td style="align-items: center"><b>phonenumber</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="phonenumber"
          type="text"
          value="${user.phonenumber}"
          disabled
          required
        />
      </td>
    </tr>
    <tr>
      <td style="align-items: center"><b>birth date</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="birthdate"
          type="date"
          value="${user.birthdate}"
          disabled
          required
        />
      </td>
    </tr>
    <tr>
      <td style="align-items: center"><b>sex</b></td>
      <td>
        <input
          style="padding: 2px; margin: 0"
          id="sex"
          type="text"
          value="${user.sex}"
          disabled
          required
        />
        <select
          class="form-select form-select-sm hidden"
          aria-label=".form-select-sm example"
        >
          <option value="male" selected>male</option>
          <option value="female">female</option>
          <option value="none">none</option>
        </select>
      </td>
    </tr>
  </table>
</div>
<div class="alertMessage"> </div>

<div class="modal-footer">
      <button type="button" class="btn btn-warning" onclick="editProfile()">
      Edit 
      </button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">
      Close
      </button>

</div>
`;

  $(".modal-content-profile").html(html);
}

function editProfile() {
  $("#firstname").prop("disabled", false);
  $("#lastname").prop("disabled", false);
  $("#email").prop("disabled", false);
  $("#phonenumber	").prop("disabled", false);
  $("#birthdate").prop("disabled", false);
  $("#sex").addClass("hidden");
  $(".form-select").removeClass("hidden");

  let html = "";
  html = `<button type="button" class="btn btn-success" onclick="saveEditedProfile()">
                Save 
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
            </button>`;
  $(".modal-footer").html(html);
}

function saveEditedProfile() {
  let user = {};
  user.firstname = $("#firstname").val();
  user.lastname = $("#lastname").val();
  user.username = $("#username").val();
  user.email = $("#email").val();
  user.phonenumber = $("#phonenumber").val();
  user.birthdate = $("#birthdate").val();
  user.sex = $(".form-select").val();

  $.ajax({
    type: "POST",
    url: "/user/editProfile",
    data: user,
    success: function (response) {


      if (response === "success") {
        let html = "";
         html = `<div class="alert alert-success">welcome to our website</div>`;
        $(".alertMessage").html(html);
        setTimeout(() => {
          location.href = "/user/dashboard";
        }, 500);
      } else {
         html = `<div class="alert alert-danger">some error occurred</div>`;
         $(".alertMessage").html(html);
        }
    },
    err: function (err) {
       html = `<div class="alert alert-danger">some error occurred</div>`;
       $(".alertMessage").html(html);
      },
  });
}
