export const checkPlaceName = (namePlace) => {
  return namePlace[0].toUpperCase() + namePlace.slice(1).toLowerCase();
};

export const saveData = (dataFromTheServer, userData) => {
  let key;
  for (key in dataFromTheServer) {
    userData[key] = dataFromTheServer[key];
  }
};

export const fillInUserData = (userData, name, about, avatar) => {
  name.textContent = userData.name;
  about.textContent = userData.about;
  avatar.src = userData.avatar;
};

export const setAttribute = (element, attributeName, attributeValue) => {
  element.setAttribute(attributeName, attributeValue);
};
