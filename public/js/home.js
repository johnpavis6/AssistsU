$("#signup").on("submit", function () {
    var data = {};
    data['first_name'] = $("#first_name").val();
    data['last_name'] = $("#last_name").val();
    data['email'] = $("#up-email").val();
    data['password'] = $("#up-password").val();
    data['dob'] = $("#dob").val();
    data['mobile_no'] = $("#mobile_no").val();
    $.ajax({
        type: "POST",
        data: data,
        url: "/signup",
        headers: {
            'CSRF-Token': $('[name="csrf_token"]').attr('content'),
        },
    }).done(function (res) {
        console.log(res.code);
        if (res.code == 0) {
            $("#alert").attr("class", "alert alert-success");
        } else {
            $("#alert").attr("class", "alert alert-danger");
        }
        $("#alert").html(res.message);
        $("#alert").show();
    });
    return false;
});