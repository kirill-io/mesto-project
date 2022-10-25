export const fillFieldValues = (formSelector, userData) => {
  const form = document.forms[formSelector];
  form.querySelectorAll('input').forEach((input) => {
    const attributeName = input.getAttribute('name');
    input.value = userData[attributeName];
  });
};
