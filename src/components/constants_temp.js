export const rootElement = document.querySelector('.root');
export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
export const profileAvatarImage = document.querySelector('.profile__avatar-image');
export const formEditProfile = document.forms.editForm;
export const inputName = formEditProfile.elements.inputName;
export const inputDesc = formEditProfile.elements.inputDescription;
export const formAddProfile = document.forms.addForm;
export const inputPlace = formAddProfile.elements.inputPlace;
export const inputLink = formAddProfile.elements.inputLink;
export const buttonPopupAddSave = formAddProfile.elements.popupSave;
export const popupPicture = popupImage.querySelector('.popup__image');
export const popupPictureText = popupImage.querySelector('.popup__image-text');
export const elementTemplate = document.querySelector('#elementTemplate').content;
export const elementsList = document.querySelector('.elements__list');
export const popupDeleteImage = document.querySelector('#popupDeleteImage');
export const popupAdd = document.querySelector('#popupAdd');
export const popupEdit = document.querySelector('#popupEdit');
export const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
export const buttonPopupEditSave = popupEdit.querySelector('.popup__save');
export const formAvatarEdit = document.forms.avatarEditForm;
export const buttonAvatarEditSave = formAvatarEdit.elements.popupSave;
export const popupAvatarEdit = document.querySelector('#popupAvatarEdit');
export const buttonPopupAvatarEditClose = popupAvatarEdit.querySelector('.popup__close');
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__save_inactive'
};
export let userData = {};


export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '901b5f54-a3c1-49a6-b698-d1aa30508c91',
    'Content-Type': 'application/json'
  }
}
