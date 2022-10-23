import '../pages/index.css';
import * as constants from './constants.js';
import Api from './Api.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';

let idUser;

const api = new Api(constants.config);


Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    idUser = userData._id;
    const cardList = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = new Card({
          data: item,
          idUser: idUser,
          putLike: (item) => {
            api.addLikeCard(item)
              .then((res) => {
                cardElement.like(res.likes);
              })
          },
          deleteLike: (item) => {
            api.deleteLikeCard(item)
              .then((res) => {
                cardElement.like(res.likes);
              })
          },
          deleteCard: (item, cardId) => {
            api.deleteCard(cardId)
              .then(() => {
                item.remove();
              })
          }
        },'element');
        const card = cardElement.renderer();
        cardList.addItem(card);
      }
    }, '.elements__list');
    cardList.renderItems();
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
  popupAvatar.open();
})

const popupEdit = new Popup('popupEdit');

constants.buttonEdit.addEventListener('click', () => {
  popupEdit.open();
});

const popupCreate = new Popup('popupAdd');

constants.buttonCreate.addEventListener('click', () => {
  popupCreate.open();
});

const popupImage = new PopupWithImage('popupImage');
document.querySelector('.elements__list').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    popupImage.open(evt.target);
  }
});
