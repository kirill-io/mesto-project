import '../pages/index.css';
import * as constants from './constants.js';
import Api from './Api.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

let idUser;

const api = new Api(constants.config);


Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    idUser = userData._id;
    const cardList = new Section({
      items: cards.reverse(),
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


const popupAvatar = new PopupWithForm('popupAvatarEdit', {
  hendlerSubmit: (element) => {
    popupAvatar.sumbitTextIsSaving();
    api.updateAvatar(element.inputLink)
      .then((res) => {
        document.querySelector('.profile__avatar-image').src = res.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.sumbitTextIsSave();
      });
  }
});

constants.buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

const popupEdit = new PopupWithForm('popupEdit', {
  hendlerSubmit: (element) => {
    popupEdit.sumbitTextIsSaving();
    api.changeUserData(element.inputName, element.inputDescription)
      .then((res) => {
        document.querySelector('.profile__name').textContent = res.name;
        document.querySelector('.profile__description').textContent = res.about;
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.sumbitTextIsSave();
      });
  }
});

constants.buttonEdit.addEventListener('click', () => {
  popupEdit.open();
});

const popupCreate = new PopupWithForm('popupAdd', {
  hendlerSubmit: (element) => {
    popupCreate.sumbitTextIsSaving();
    api.addNewCard(element.inputPlace, element.inputLink)
      .then((cards) => {
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
        popupCreate.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCreate.sumbitTextIsSave();
      });
  }
});

constants.buttonCreate.addEventListener('click', () => {
  popupCreate.open();


});

const popupImage = new PopupWithImage('popupImage');
document.querySelector('.elements__list').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    popupImage.open(evt.target);
  }
});
