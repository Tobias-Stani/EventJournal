var disabilitiesArr = [];
const initialValues = $("#discapacidad");
findDisabilities = findDisabilities.split(",");

findDisabilities.forEach((disabilitie, index) => {
  initialValues.append(
    `<option class="option-select2" value="${index}" data-id="0">${disabilitie.toUpperCase()}</option>`
  );
});

const disabilities = {
  MOTOR: "0",
  PC: "1",
  VISUAL: "2",
  INTELECTIAL: "3",
  SINDROME: "4",
  TEA: "5",
  TALLABAJA: "6",
  AUDITIVO: "7",
};

const updateList = (event) => {
  const backdniList = $(".backdni-list");

  let str;
  let str2;

  if (!event.attributes.id) {
    deleteItem(event.parentElement.innerText, false);

    return;
  }

  let len = event.attributes.id.value.length;

  if (disabilitiesArr.includes(event.innerText)) {
    deleteItem(event.innerText, true);
    return;
  }

  disabilitiesArr.push(event.innerText);
  disabilitiesInfoArr.push(event.attributes.id.value[len - 1]);
  backdniList.append(
    `<li data-id=${event.attributes.id.value[len - 1]}>${event.innerText}</li>`
  );
};

const deleteItem = (str, status) => {
  let str2 = status
    ? str.replace(/ /g, "")
    : str.substring(1).replace(/ /g, "");

  let item = document.querySelector(`li[data-id='${disabilities[str2]}']`);

  document.querySelector(".backdni-list").removeChild(item);

  let indexOf = disabilitiesArr.indexOf(str);
  disabilitiesArr.splice(indexOf, 1);
  return;
};
