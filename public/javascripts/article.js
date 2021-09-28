function deleteArticle(articleId) {
  let modalBody = `<div class="form-group">
    <h4>are you sure delete this article?</h4>
    </div>`;
  $("#warningModal  .modal-body").html(modalBody);
  let modalFooter = `<button type="button" class="btn btn-secondary" data-dismiss="modal">
    Cancel
  </button>
  <button type="button" class="btn btn-danger deleteBtn">Delete</button>
`;
  $("#warningModal  .modal-footer").html(modalFooter);

  $(".deleteBtn").on("click", function () {
    $.ajax({
      type: "delete",
      url: "/article/deleteArticle/" + articleId,
      success: function (response) {
        if (response === "success") {
          modalBody = `<div class="form-group alert alert-success">
            <h4>successfully deleted article</h4>
            </div>`;
          $("#warningModal  .modal-body").html(modalBody);
          setTimeout(() => {
            location.href = "/user/dashboard";
          }, 500);
        }
      },
    });
  });
}

function editArticle(articleId) {
  $.ajax({
    type: "GET",
    url: "/article/getSingleArticle/" + articleId,
    success: function (article) {
      let html = `<form action="/article/editArticle/${articleId}"
            method="POST"
            enctype="multipart/form-data"
          ><div class="form-group">
            <input type="text" placeholder="${article[0].title}" name="title" />
            <input type="text" placeholder="${article[0].description}" name="description" />
            <textarea placeholder="${article[0].body}" name="body"></textarea>
            <input type="file" name="articleImage" />
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cancel
            </button>
            <button type="submit" class="btn btn-success">Update</button>
            </div></form>`;
      $("#updateArticle .modal-body").html(html);

      

    },
  });
}
