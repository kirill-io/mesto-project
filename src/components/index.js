import '../pages/index.css';
import * as constants from './constants.js';
import Api from './Api.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';

let idUser;

const api = new Api(constants.config);

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    idUser = userData._id;

    cards.forEach(el => {
      const cardElement = new Card({
          data: el,
          idUser: idUser,
          putLike: (el) => {
            api.addLikeCard(el)
              .then((res) => {
                cardElement.like(res.likes);
              })
          },
          deleteLike: (el) => {
            api.deleteLikeCard(el)
              .then((res) => {
                cardElement.like(res.likes);
              })
          },
          deleteCard: (el, cardId) => {
            api.deleteCard(cardId)
              .then(() => {
                el.remove();
              })
          }
        },'element');
      const card = cardElement.renderer();
      document.querySelector('.elements__list').append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// api.addNewCard('forest', 'https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg')
//   .then((res) => {
//     console.log(res);
//   })

const fordAddValidator = new FormValidator(constants.validationConfig, constants.formAddProfile);
fordAddValidator.enableValidation();


const popupAvatar = new Popup('popupAvatarEdit');

constants.buttonAvatar.addEventListener('click', () => {
  popupAvatar.opene();
})

const popupEdit = new Popup('popupEdit');

constants.buttonEdit.addEventListener('click', () => {
  popupEdit.opene();
});

const popupCreate = new Popup('popupAdd');

constants.buttonCreate.addEventListener('click', () => {
  popupCreate.opene();
});
