/**
 *
 * @param fechaInicio
 * @param fechaFin
 * @returns {boolean}
 */
function validEndDate(fechaInicio, fechaFin){

    if (
        new Date(fechaFin)
        <=
        new Date(fechaInicio)
    ){
        return true;
    }

    return false;
}

/**
 *
 * @param text
 * @param separador
 * @returns {string}
 */
function capitalize(text, separador =' ') {

    let inputText = text.toLowerCase();
    let arrayCadenas = inputText.split(separador);
    let textResult = '';

    for (let i=0; i < arrayCadenas.length; i++) {

        textResult =
            textResult +
            ' ' +
            arrayCadenas[i]
                .substr(0,1)
                .toUpperCase()
                .concat(arrayCadenas[i]
                    .substr(1)
                );
    }

    return textResult.trim();
}

/**
 *
 * @param text
 * @param count
 * @param character
 * @returns {string}
 */
function completeLeftCharacter(text, count, character) {

    let textResult = text.padStart(
        count,
        character
    );

    return textResult;
}

/**
 *
 * @param fechaInicio
 * @param fechaFin
 * @returns {{status: boolean, msg: *}}
 */
function valid1Month(fechaInicio, fechaFin){

    let msg = null;
    let status = false;
    let fechaActual = new Date();
    let fInicioMonthPrev = new Date();
    let fInicioMonthNext = new Date();

    fInicioMonthPrev.setMonth(
        fInicioMonthPrev.getMonth() - 2
    );

    fInicioMonthNext.setMonth(
        fInicioMonthNext.getMonth() + 2
    );

    if (
        (
            new Date(fechaInicio)
            <=
            fInicioMonthPrev
        )
        ||
        (
            new Date(fechaInicio)
            >=
            fInicioMonthNext
        )
    ) {
        status = true;
        msg = 'Fecha de inicio fuera del rango permitido.';
    }

    if (
        (new Date(fechaFin)).getFullYear()
        >
        fechaActual.getFullYear()
    ){
        status = true;
        msg = 'Fecha de fin fuera del rango permitido.';
    }

    return {
        'status': status,
        'msg': msg
    };
}

/**
 * @param title
 * @param text
 * @param type
 * @param href
 */
function alert_sweet(title, text, type, href= null){
    swal({
        title: title,
        text: text,
        type: type,
        confirmButtonColor: "#1ab394",
        confirmButtonText: "Aceptar",
    },
    function(){
        if(href != null){
            window.location.href = href;
        }
    });
}

/**
 *
 * @param object
 * @param numberType
 */
function validateNumber(object,numberType) {

    switch (numberType) {
        /**
         * Nros enteros
         */
        case 'E':
            object.value = (object.value + '').replace(/[^0-9]/g, '');
            break;

        /**
         * Nros flotantes
         */
        case 'F':
            object.value = (object.value + '').replace(/[^0-9.]/g, '');
            break;
    }
}