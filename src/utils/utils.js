import Card from '../components/Card.js';
import PopupDeleteImage from '../components/PopupDeleteImage.js';

export const fillFieldValues = (formSelector, userData) => {
  const form = document.forms[formSelector];
  form.querySelectorAll('input').forEach((input) => {
    const attributeName = input.getAttribute('name');
    input.value = userData[attributeName];
  });
};

export const renderCard = (item, id, api, cardList) => {
  const cardElement = new Card({
    data: item,
    idUser: id,
    putLike: (item) => {
      api.addLikeCard(item)
        .then((res) => {
          cardElement.like(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike: (item) => {
      api.deleteLikeCard(item)
        .then((res) => {
          cardElement.like(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCard: (item, cardId) => {
      const popupDelete = new PopupDeleteImage('popupDeleteImage', {
        hendlerSubmit: () => {
          popupDelete.sumbitTextIsUninstalling();
          api.deleteCard(cardId)
            .then(() => {
              item.remove();
              popupDelete.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupDelete.sumbitTextIsUninstall();
            });
        }
      });
      popupDelete.open();
    }
  },'element');
  const card = cardElement.renderer();
  cardList.addItem(card);
};
