$(document).ready(function () {
  const item_type = document.querySelectorAll(".item-type");
  const btn_type_contact = document.querySelector("#btn_type_contact");
  const input_desc = $(".input_desc");
  const create_contact_btn = $("#create_contact_btn");
  const container = $("#contactsChilds");
  const input_contact = $(".input_contact").prop("disabled", "true");
  const alertWarning = $(".alert-warning-contact").css("display", "none");
  const alertSuccess = $(".alert-success-contact").css("display", "none");

  const isEmail = (email) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };

  let type = "";
  let index = 0;

  const setTypeContact = (str) => {
    type = str;

    input_contact.prop("name", type);

    btn_type_contact.innerHTML =
      type == "phone"
        ? `Numero de telefono` +
          `<i class="fa fa-angle-down" style="padding-left: 20px;" aria-hidden="true"></i>`
        : `Correo electronico` +
          `<i class="fa fa-angle-down" style="padding-left: 20px;" aria-hidden="true"></i>`;

    if (type == "phone") {
      input_contact.val("");
      input_contact.prop("placeholder", "Ej: 11 1234-6578");
      input_contact.mask("00 0000-0000");
      input_contact.removeAttr("disabled");
    }

    if (type == "email") {
      input_contact.val("");

      input_contact.unmask();

      input_contact.prop("placeholder", "Ej: example12@gmail.com");
      input_contact.removeAttr("disabled");
    }
  };

  const showAlert = (str) => {
    input_contact.val("");
    input_desc.val("");

    if (str == "warning") {
      alertSuccess.css("display", "none");
      alertWarning.addClass("animated");
      alertWarning.addClass("shake");
      alertWarning.css("display", "block");
    }

    if (str == "success") {
      alertWarning.css("display", "none");
      alertSuccess.addClass("animated");
      alertSuccess.addClass("slideInLeft");
      alertSuccess.css("display", "block");
    }
  };

  item_type[0].addEventListener("click", () => setTypeContact("email"));
  item_type[1].addEventListener("click", () => setTypeContact("phone"));

  create_contact_btn.on("click", (e) => {
    e.preventDefault();

    if (input_contact.val().length > 0 && input_desc.val().length > 0) {
      if (type == "email") {
        let res = isEmail(input_contact.val());

        if (!res)
          return swal({
            title: "Email Incorrecto!",
            type: "error",
          });
      }

      let obj = {
        id: index,
        typeContact: type == "email" ? 1 : 2,
        value: input_contact.val(),
        desc: input_desc.val(),
      };

      contactsArr.push(obj);

      container.append(`
      <div id="card" class="cardContactCount animated" style="display: flex; justify-content:left; align-items: center; gap: 5rem; position: relative;" data-id="${index}">
      <div class="tools" style="position: absolute; right: 0; top: 0;gap: 2.5rem; display: flex; flex-direction: row-reverse">
              
      <a class="close-link" id="card_delete" data-id="${index}">
          <i class="fa fa-times" style="color: #1ab394; font-size: 2rem;"></i>
      </a>
      </div>
      <span class="p-xxs">
        <a data-toggle="collapse" href="#domicilio_13169" class="faq-question collapsed" aria-expanded="false">
        ${
          type == "phone"
            ? `<i class="fa fa-phone span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>`
            : `<i class="fa fa-envelope-o span_color_primary" style="font-size: 1.5em" aria-hidden="true"></i>`
        }
          
        </a>
      </span>

      <div>
        <strong>Contacto</strong>
        <p>${input_contact.val()}</p>
      </div>

      <div>
        <strong>Descripcion</strong>
        <p>${input_desc.val()}</p>
      </div>

    </div>

    <legend class="style_legend">&nbsp;</legend>
            `);

      let cards = document.querySelectorAll("#card");

      cards[index].classList.add("fadeInDown");

      index++;

      loadControlls();

      showAlert("success");
    } else {
      showAlert("warning");
    }
  });

  const loadControlls = () => {
    let btns_del = document.querySelectorAll("#card_delete");

    btns_del.forEach((btn_delete, i) => {
      btn_delete.addEventListener("click", (e) => {
        let card_id = parseInt(btns_del[i].getAttribute("data-id"));
        let index = contactsArr.findIndex((i) => i.id === card_id);

        swal(
          {
            title: "¿Quieres borrar a este contacto de la lista?",
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
            contactsArr.splice(index, 1);
            searchAndRemoveCard(card_id);
          }
        );
        // }
      });
    });
  };

  const searchAndRemoveCard = (card_id) => {
    let cards = document.querySelectorAll("#card");
    let legend = document.querySelectorAll(".style_legend");

    let currentCard = 0;

    cards.forEach((card, i) => {
      let dataId = card.getAttribute("data-id");

      if (dataId == card_id) currentCard = i;
    });

    cards[currentCard].classList.remove("fadeInDown");
    cards[currentCard].classList.add("shake");
    index--;

    setTimeout(() => {
      container[0].removeChild(cards[currentCard]);
      container[0].removeChild(legend[currentCard]);
    }, 800);
  };
});
