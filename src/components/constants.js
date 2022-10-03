export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
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
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__save_inactive'
};
