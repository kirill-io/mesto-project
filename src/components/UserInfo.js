export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      inputName: this._userName.textContent,
      inputAbout: this._userAbout.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this._userId = _id;
  }

  getUserId() {
    return this._userId;
  }
}
