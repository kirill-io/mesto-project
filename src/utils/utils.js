import Card from '../components/Card.js';
import PopupDeleteImage from '../components/PopupDeleteImage.js';

export const renderCard = (item, id, api, cardList, popupImage) => {
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
        hendleSubmit: () => {
          popupDelete.renderLoading(true);
          api.deleteCard(cardId)
            .then(() => {
              item.remove();
              popupDelete.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupDelete.renderLoading(false);
            });
        }
      });
      popupDelete.open();
    },
    handleCardClick: (image) => {
      popupImage.open(image);
    }
  },'element');
  const card = cardElement.renderer();
  cardList.addItem(card);
};
