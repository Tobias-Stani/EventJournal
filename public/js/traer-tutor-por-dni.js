$(document).ready(function () {
  const btn_search = $("#search");
  const dni_search = $("#dni_tutor");
  const btn_modal = $("#btn_modal_update");
  const btn_modal_create_tutor = $("#btn_modal_create_tutor");
  const dni_modal_tutor = $("#dni_modal_tutor");
  const name_modal_tutor = $("#name_modal_tutor");
  const surname_modal_tutor = $("#surname_modal_tutor");
  const alertWarning = $(".alert-warning-tutor").css("display", "none");
  const alertSuccess = $(".alert-success-tutor").css("display", "none");
  const container = $("#accordion");

  // .css("max-height", "110px");
  $(".panel-body").css("max-height", "325px");

  let dataId = 0;
  let index = 0;

  btn_search.addClass("disabled");

  const showAlert = (str) => {
    if (str == "warning") {
      alertSuccess.css("display", "none");
      btn_search.addClass("disabled");
      alertWarning.addClass("animated");
      alertWarning.addClass("shake");
      alertWarning.css("display", "block");
    }

    if (str == "success") {
      btn_search.addClass("disabled");
      alertWarning.css("display", "none");
      alertSuccess.addClass("animated");
      alertSuccess.addClass("slideInLeft");
      alertSuccess.css("display", "block");

      // alertSuccess.css("display", "none");

      // setTimeout(() => {

      //   alertSuccess.addClass("slideOutLeft");
      //   setTimeout(() => {
      alertSuccess.css("display", "none");
      //   }, 1000);

      // }, 2000);
    }
  };

  const btnLoader = () => {
    Ladda.bind(".ladda-button", { timeout: 1200 });

    var l = $(".ladda-button-demo").ladda();

    l.click(() => {
      l.ladda("start");
    });
  };

  btnLoader();

  // Validate input DNI TUTOR

  dni_search.on({
    keypress: function (e) {
      if ($(this).val().length == 8) {
        e.preventDefault();
      }
    },

    keyup: function () {
      if ($(this).val().length > 6) {
        btn_search.removeClass("disabled");
      } else {
        btn_search.addClass("disabled");
      }
    },
  });

  // Event ON SUBMIT (btn search)

  btn_search.on("click", (e) => {
    e.preventDefault();
    let dniCurrentValue = $("#dni_tutor").val();

    if (dniCurrentValue.length > 6) {
      $.ajax({
        type: "GET",
        url: apiPersonasAjaxUrl,
        data: {
          dni: dniCurrentValue,
        },
      })
        .done(function (data) {
          dataId = data.id;

          if (!arrIds.includes(data.id)) {
            if (data.code) {
              showAlert("warning");
              dni_modal_tutor.val(dni_search.val());
              dni_search.val(" ");
              dni_modal_tutor.prop("disabled", true);
              return;
            }

            if (currentDni == dniCurrentValue) {
              swal({
                title: "Ya esta registrado!",
                text: "No puedes registrarte a ti mismo.",
                type: "error",
              });

              return;
            }

            showAlert("success");

            container.append(`
                <div id="card" class="animated" style="position: relative; display: flex; justify-content:left; align-items: center; gap: 5rem" data-id="${data.id}">

                <div class="tools" style="position: absolute; right: 0; top: 0;gap: 2.5rem; display: flex; flex-direction: row-reverse">
              
                <a class="close-link" id="card_delete" data-id="${data.id}">
                    <i class="fa fa-times" style="color: #1ab394; font-size: 2rem;"></i>
                </a>
                <a class="close-link" id="card_update" data-id="${data.id}"  data-toggle="modal" href="#modal-update" onclick="getCardId(event);">
                <i class="fa fa-pencil" style="color: #1ab394; font-size: 2rem" data_id="${data.id}"></i>
                
            </a>
              
                </div>
               
                <span class="p-xxs">
                    <a data-toggle="collapse" href="#domicilio_13169" class="faq-question collapsed" aria-expanded="false">
                        <i class="fas fa-user span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>
                    </a>
                </span>

                <div>
                    <strong>Nombre</strong>
                    <p class='nombre'>${data.nombres}</p>
                </div>

                <div>
                    <strong>Apellido</strong>
                    <p class='apellido'>${data.apellidos}</p>
                </div>

                <div>
                    <strong>DNI</strong>
                    <p>${data.dni}</p>
                </div>

            </div>

            <legend class="style_legend">&nbsp;</legend>

            `);

            let cards = document.querySelectorAll("#card");
            cards[index].classList.add("fadeInDown");

            index++;
            loadControlls();

            dni_search.val("");
            arrIds.push(data.id);
          } else {
            swal({
              title: "Ya esta registrado!",
              text: "El Tutor ya esta asociado a esta persona.",
              type: "error",
            });
          } // fin if
        })
        .fail(function (err) {
          dni_search.val("");
          showAlert("warning");
        });
    }
  });


  // Search and Remove Card User

  const searchAndUpdateCard = (card_id) => {
    // TODO UPDATE CARD
  };

  const searchAndRemoveCard = (card_id) => {
    let cards = document.querySelectorAll("#card");
    let legend = document.querySelectorAll(".style_legend");

    let currentCard;

    cards.forEach((card, index) => {
      let dataId = card.getAttribute("data-id");

      if (dataId == card_id) {
        currentCard = index;
      }
    });

    cards[currentCard].classList.remove("fadeInDown");
    cards[currentCard].classList.add("shake");

    setTimeout(() => {
      container[0].removeChild(cards[currentCard]);
      container[0].removeChild(legend[currentCard]);
    }, 800);
  };

  // Controls User Card (delete and update)

  const loadControlls = () => {
    let c = 0;

    let btns_del = document.querySelectorAll("#card_delete");

    btns_del.forEach((btn_delete, i) => {
      btn_delete.addEventListener("click", (e) => {
        let card_id = parseInt(btns_del[i].getAttribute("data-id"));
        let index = arrIds.indexOf(card_id);

        if (index != -1) {
          // c++;

          swal(
            {
              title: "¿Quieres borrar a este tutor de la lista?",
              text: "No podrás revertir esto!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#1ab394",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, Confirmar!",
              cancelButtonText: "Cancelar",
              closeOnConfirm: true,
            },
            () => {
              arrIds.splice(index, 1);
              searchAndRemoveCard(card_id);
            }
          );
        }
      });
    });
  };

  // Submit Modal Tutor

  btn_modal_create_tutor.on("click", (e) => {
    //
    e.preventDefault();

    showAlert("success");

    const body = {
      dni: dni_modal_tutor.val(),
      apellidos: surname_modal_tutor.val(),
      nombres: name_modal_tutor.val(),
      //fechaNacimiento: formatDate,
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
        
        container.append(`
        <div id="card" class="animated" style="position: relative; display: flex; justify-content:left; align-items: center; gap: 5rem" data-id="${data.id}">

        <div class="tools" style="position: absolute; right: 0; top: 0;gap: 2.5rem; display: flex; flex-direction: row-reverse">
      
        <a class="close-link" id="card_delete" data-id="${data.id}">
            <i class="fa fa-times" style="color: #1ab394; font-size: 2rem;"></i>
        </a>
        <a class="close-link" id="card_update" data-id="${data.id}"  data-toggle="modal" href="#modal-update" onclick="getCardId(event);">
        <i class="fa fa-pencil" style="color: #1ab394; font-size: 2rem" data_id="${data.id}"></i>
        
    </a>
      
        </div>
       
        <span class="p-xxs">
            <a data-toggle="collapse" href="#domicilio_13169" class="faq-question collapsed" aria-expanded="false">
                <i class="fas fa-user span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>
            </a>
        </span>

        <div>
            <strong>Nombre</strong>
            <p class='nombre'>${data.nombres}</p>
        </div>

        <div>
            <strong>Apellido</strong>
            <p class='apellido'>${data.apellidos}</p>
        </div>

        <div>
            <strong>DNI</strong>
            <p>${data.dni}</p>
        </div>

    </div>

    <legend class="style_legend">&nbsp;</legend>

    `);

    let cards = document.querySelectorAll("#card");
    cards[index].classList.add("fadeInDown");

    index++;
    loadControlls();

    dni_search.val("");
    arrIds.push(data.id);
    $('#modal-form').modal('hide');
    return;

      });
  });

  btn_modal.on("click", (e) => {
    e.preventDefault();

    let name_modal = $("#name_modal_update");
    let surname_modal = $("#surname_modal_update");

    let body = {
      nombres: name_modal.val(),
      apellidos: surname_modal.val(),
    };

    $.ajax({
      type: "POST",
      url: apiModificarPersonasAjaxUrl,
      data: {
        id: dataId,
        data: body,
      },
    })
      .done((res) => {

        if(name_modal.val().length > 0) cardEditTutor.children[2].children[1].innerHTML = name_modal.val();

        if(surname_modal.val().length > 0) cardEditTutor.children[3].children[1].innerHTML = surname_modal.val();

        $('#modal-update').modal('hide');

        // TODO CREAR ALERTA EXITOSAMENTE
      })
      .fail((err) => {
        // TODO ERROR
      });
  });

  $(document).on('click', '.fa-pencil', function(e) {

    var nombre = $(e.target).parents('div#card').find('.nombre');
		var apellido = $(e.target).parents('div#card').find('.apellido');

    $('#name_modal_update').val(nombre.html());
    $('#surname_modal_update').val(apellido.html());

    console.log(nombre.html());
    console.log(apellido.html());
  });

});


