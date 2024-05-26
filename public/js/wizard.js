var form = $("#contact");
var isRepeatAnimation = false;
const test1 = $(".panel_card").css("height", "fit-content");
const test2 = $(".scroll_content").css("overflow", "visible");
const test3 = $(".slimScrollDiv").css("height", "fit-content");
const arrTypesPanels = ["person", "address", "tutors", "contacts"];

test2.css("height", "fit-content");

form.validate({
  errorPlacement: function errorPlacement(error, element) {
    element.before(error);
  },
  rules: {
    email: {
      required: true,
      email: true,
    },
  },
  messages: {
    dni: "Ingresar DNI",
    name: "Ingresar Nombre",
    surname: "Ingresar Apellido",
    date: "Ingresar Fecha",
    email: "Email Incorrecto",
  },
});
form.children("div").steps({
  labels: {
    finish: "Enviar",
    next: "Siguiente",
    previous: "Anterior",
  },
  headerTag: "h3",
  bodyTag: "section",
  transitionEffect: "slideLeft",
  onStepChanging: function (event, currentIndex, newIndex) {
    // discapacidades_input
    $(".input_contact").prop("name", "null");
    let cards = document.querySelectorAll(".cardContactCount");

    if (currentIndex == 3 && cards.length < 2) {
      return swal({
        title: "Mínimo 2 contactos!",
        text: "La cantidad minima para registrar a una persona son 2 contactos.",
        type: "error",
      });
    }

    if (currentIndex == 3) {
      if (!isRepeatAnimation) {
        arrTypesPanels.forEach((type) => {
          const div = document.createElement("div");
          const img = document.createElement("img");

          img.setAttribute("src", "/images/logo-merlo.png");

          div.classList.add(`loaderContainer`);
          div.classList.add(`loaderContainer-${type}`);
          div.append(img);
          document.querySelector(`#panel-body-loader-${type}`).append(div);
        });
        isRepeatAnimation = true;
      }
      document.querySelector("#number-of-contacts").textContent =
        contactsArr.length;
      $("#contact-section-finish").empty();
      contactsArr.forEach((contact) => {
        let template = `
        <div class="animated" style="display: flex; justify-content:left; align-items: center; gap: 5rem; position: relative;">
								<span class="p-xxs">
									<a data-toggle="collapse" href="#domicilio_13169" class="faq-question collapsed" aria-expanded="false">
                  ${
                    contact.typeContact == 2
                      ? `<i class="fa fa-phone span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>`
                      : `<i class="fa fa-envelope-o span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>`
                  }
									</a>
								</span>

								<div>
									<strong>Contacto</strong>
									<p>${contact.value}</p>
								</div>

								<div>
									<strong>Descripcion</strong>
									<p>${contact.desc}</p>
								</div>

							</div>

							<legend class="style_legend">&nbsp;</legend>
              `;

        $("#contact-section-finish").append(template);
        document.querySelector(".loaderContainer-contacts").style.display =
          "none";
      });

      let inputs = document.querySelectorAll(".request_inputs");
      let locationId = inputs[4][0].value;
      let streetId = inputs[5][0].value;
      let number = inputs[6].value;

      $.ajax({
        type: "GET",
        url: apiPersonasAjaxUrl,
        data: {
          dni: currentDni,
        },
      }).done((res) => {
        document.querySelector("#dni-finish").textContent = res.dni;
        document.querySelector("#name-finish").textContent = res.nombres;
        document.querySelector("#surname-finish").textContent = res.apellidos;
        document.querySelector("#birthdate-finish").textContent =
          res.fecha_nacimiento ? res.fecha_nacimiento : isUpdateBirthDate;
        document.querySelector(".loaderContainer-person").style.display =
          "none";
      });

      $.ajax({
        type: "GET",
        url: apiLocalidadesIdAjax,
        data: {
          id: locationId,
        },
      }).done((res) => {
        document.querySelector("#location-finish").textContent = res.nombre;
        document.querySelector("#location-cardFinish").textContent = res.nombre;
        document.querySelector(".loaderContainer-address").style.display =
          "none";
      });

      $.ajax({
        type: "GET",
        url: apiCallesIdAjax,
        data: {
          id: streetId,
        },
      }).done((res) => {
        document.querySelector("#street-finish").textContent = res.nombre;
        document.querySelector("#street-cardFinish").textContent = res.nombre;
      });

      document.querySelector("#number-cardFinish").textContent = number;

      if (!activeTutors) {
        let iboxTutor = document.querySelector(".ibox_tutor");
        iboxTutor.style.display = "none";
      } else {
        let countTutors = 0;
        $("#tutors-panel").empty();
        arrIds.forEach((tutorId) => {
          $.ajax({
            type: "GET",
            url: apiPersonasIdAjaxUrl,
            data: {
              id: tutorId,
            },
          }).done((res) => {
            countTutors++;
            let template = `
            <div id="card" class="animated" style="position: relative; display: flex; justify-content:left; align-items: center; gap: 5rem" data-id="1">

            <span class="p-xxs">
              <a data-toggle="collapse" href="#domicilio_13169" class="faq-question collapsed" aria-expanded="false">
                <i class="fas fa-user span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>
              </a>
            </span>

            <div>
              <strong>Nombre</strong>
              <p>${res.nombres}</p>
            </div>

            <div>
              <strong>Apellido</strong>
              <p>${res.apellidos}</p>
            </div>

            <div>
              <strong>DNI</strong>
              <p>${res.dni}</p>
            </div>

          </div>

          <legend class="style_legend">&nbsp;</legend>
          `;

            $("#tutors-panel").append(template);

            document.querySelector("#number-of-tutors").textContent =
              countTutors;
            document.querySelector(".loaderContainer-tutors").style.display =
              "none";
          });
        });
      }
    }

    form.validate().settings.ignore = ":disabled,:hidden";
    return form.valid();
  },
  onFinished: function (event, currentIndex) {
    let inputs = document.querySelectorAll(".request_inputs");

    let idPerson = inputs[0].getAttribute("dataId");
    let locationId = inputs[4][0].value;
    let streetId = inputs[5][0].value;
    let number = inputs[6].value;

    let birthDateCurrent = isUpdateBirthDate ? isUpdateBirthDate : "";

    const obj = {
      idPerson,
      updateBirthdate: {
        fechaNacimiento: birthDateCurrent,
      },
      streetId,
      number,
      locationId,
      tutoresIds: arrIds,
      contacts: contactsArr,
      discapacidades_input: disabilitiesInfoArr,
    };

    $.ajax({
      type: "POST",
      url: apiPersonsNew,
      data: {
        data: obj,
      },
    })
      .done((res) => {
        if (!res.statusCode) {
          return swal({
            title: "ERROR",
            text: res.message,
            type: "error",
          });
        }

        return swal({
          title: "Persona Creada Correctamente",
          text: res.message,
          type: "success",
        },function(){
          location.replace(res.url);
        });
      })
      .fail((err) => {
        // TODO ERROR
      });
  },
});

const content = document.querySelector(".content");
const formContainer = document.querySelector("#steps-uid-0-p-0");

formContainer.style.display = "flex";
formContainer.style.flexDirection = "column";
// formContainer.style.justifyContent = "center";
// formContainer.style.alignItems = "center";
formContainer.style.height = "fit-content";

// content.style.background = "blue";
content.style.minHeight = "70vh";
content.style.overflowY = "scroll";
content.style.display = "flex";
content.style.alignItems = "center";
content.style.justifyContent = "center";
