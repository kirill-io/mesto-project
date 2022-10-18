import * as constants from './constants.js';
import {profileName, profileDesc, inputName, inputDesc} from './constants.js';
import {changeUserData, updateAvatar} from './Api.js';
import {resetForm, clearFields} from './validate.js';
import {setAttribute} from './utils.js';


export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscPress);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscPress);
};

const closeByEscPress = (e) => {
  if (e.key === 'Escape') {
    closePopup(document.querySelector(`#${document.querySelector(`[data-type-popup="${e.target.dataset.typePopup}"`).dataset.typePopup}`));
  }
};

export const fillInFormInputs = (name, description, nameField, descriptionField) => {
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
};

export const editProfileFormSubmitHandler = (e) => {
  e.preventDefault();
  changeUserData(inputName.value, inputDesc.value)
    .then(() => {
      profileName.textContent = inputName.value;
      profileDesc.textContent = inputDesc.value;
      closePopup(constants.popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeSaveButton(constants.buttonPopupEditSave, false);
    });
  changeSaveButton(constants.buttonPopupEditSave, true);
};

export const addPopupCloseHandlerOnClickOnOverlay = (popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(window[e.target.id]);
    }
  });
};

export const changeSaveButton = (buttonSave, isSaving) => {
  if (isSaving) {
    buttonSave.textContent = 'Сохранение...';
    buttonSave.classList.add('popup__save_saving');
  } else {
    buttonSave.textContent = 'Сохранить';
    buttonSave.classList.remove('popup__save_saving');
  }
}

export const updateAvatarFormSubmitHandler = (e) => {
  e.preventDefault();
  updateAvatar(e.target[0].value)
    .then((result) => {
      constants.profileAvatarImage.src = result.avatar;
      closePopup(constants.popupAvatarEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      changeSaveButton(constants.buttonAvatarEditSave, false);
    });
  changeSaveButton(constants.buttonAvatarEditSave, true);
};

export const profileAvatarEditHandler = () => {
  clearFields(constants.formAvatarEdit);
  resetForm (constants.formAvatarEdit, constants.buttonAvatarEditSave, constants.validationConfig.inactiveButtonClass, constants.validationConfig.inputSelector, constants.validationConfig.inputErrorClass, constants.validationConfig.errorClass);
  setAttribute(constants.rootElement, 'data-type-popup', 'popupAvatarEdit');
  openPopup(constants.popupAvatarEdit);
};
