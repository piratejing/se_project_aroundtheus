export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };

    return userData;
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.name;
    this._userJobElement.textContent = userInfo.job;
  }
}
