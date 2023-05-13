export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.name;
    this._userJobElement.textContent = userInfo.job;
  }
}
