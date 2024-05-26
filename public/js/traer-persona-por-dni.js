$(document).ready(function () {
  const name = $("#name");
  const surname = $("#surname");
  const dni = $("#dni");
  const birthDate = $("#birthDate");
  const dni_modal = $("#dni_modal_person");
  const name_modal = $("#name_modal_person");
  const surname_modal = $("#surname_modal_person");
  const birthDate_modal = $("#birthDate_modal_person");
  const submit_modal = $("#btn_modal_person");

  // DNI

  const result_dni = $(".result-dni");
  const result_name = $(".result-name");
  const result_surname = $(".result-surname");
  const result_date = $(".result-date");

  const alertWarning = $(".alert-warning-person").css("display", "none");

  const insertInfoCardDni = (data) => {
    result_name.text(data.nombres);
    result_surname.text(data.apellidos);

    if (data.fecha_nacimiento) {
      birthDate.val(data.fecha_nacimiento);
      result_date.text(data.fecha_nacimiento);
    } else {
      birthDate.val("");
    }
  };

  const showAlert = (str) => {
    if (str == "warning") {
      alertWarning.addClass("animated");
      alertWarning.addClass("shake");
      alertWarning.css("display", "block");
      dni_modal.val(dni.val());
      name.val("");
      surname.val("");
    }

    if (str == "success") {
      alertWarning.css("display", "none");
      dni.val();
    }
  };

  const cleanInputs = () => {
    name.val("");
    surname.val("");
  }

  dni.on({
    keypress: function (e) {
      if ($(this).val().length == 8) {
        e.preventDefault();
      }
    },

    keyup: function () {
      result_dni.text($(this).val());
      $("#ibox1").children(".ibox-content").add("sk-loading");

      if ($(this).val().length > 6) {
        setTimeout(() => {
          $.ajax({
            type: "GET",
            url: apiFindDuplicatedPersons,
            data: {
              dni: dni.val(),
            },
          })
            .done(function (data) {
              if (data.status == 3) {
                swal({
                  title: "Ya esta registrado!",
                  text: "Esta Persona Ya Existe.",
                  type: "error",
                });
                location.replace(data.url);
              }
                

              if (data.status == 1) {
                if (dni.val() == "") return;
                cleanInputs();
                showAlert("warning");
              }
              if (data.nombres) {
                currentDni = dni.val();
                showAlert("success");
                dni.attr("dataId", data.id);
                name.val(data.nombres);
                surname.val(data.apellidos);

                // DNI Square

                insertInfoCardDni(data);
              }
            })
            .fail(function () {
            });
        }, 800);
      }
    },
  });

  // SUBMIT MODAL

  submit_modal.on("click", (e) => {
    //
    e.preventDefault();

    let formatDate = birthDate_modal.val().split("-").reverse().join("-");

    const body = {
      dni: dni.val(),
      apellidos: surname_modal.val(),
      nombres: name_modal.val(),
      fechaNacimiento: formatDate,
      sexo: 3,
    };

    $.ajax({
      type: "POST",
      url: apiCrearPersonasAjaxUrl,
      data: {
        data: body,
      },
    })
      .done((data) => {
        dni.val(data.dni);
        name.val(data.nombres);
        surname.val(data.apellidos);
        birthDate.val(birthDate_modal.val());

        if (data.errors) {
          alert("error");
          return;
        }

        showAlert("success");

        $("#modal-form-person").modal("hide");
        name_modal.val("");
        surname_modal.val("");
        birthDate_modal.val("");

        insertInfoCardDni(data);
      })
      .fail((err) => {
        // TODO ERROR
      });
  });
});
