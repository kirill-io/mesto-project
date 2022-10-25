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

export const userSelectorsConfig = {
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__avatar-image'
}

export const buttonEdit = document.querySelector('.profile__edit');
export const buttonAvatar = document.querySelector('.profile__avatar-image-edit');
export const buttonCreate = document.querySelector('.profile__add');
