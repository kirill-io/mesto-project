export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '901b5f54-a3c1-49a6-b698-d1aa30508c91',
    'Content-Type': 'application/json'
  }
};

export const formAddProfile = document.forms.addForm;
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__save_inactive'
};
