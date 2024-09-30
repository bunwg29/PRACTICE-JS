// AuthController.js
import AuthUserService from '@/api/AuthUserServices.js';
import AuthUserModel from '@/model/AuthUserModel.js';

export default class AuthController {
  constructor() {
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  async login(username, password) {
    try {
      const users = await AuthUserService.getAllAuthUsers();
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error!', error);
      return false;
    }
  }

  async register(username, password, email) {
    try {
      const users = await AuthUserService.getAllAuthUsers();
      const existingUser = users.find(u => u.username === username || u.email === email);

      if (existingUser) {
        return false;
      }

      const newId = Math.max(...users.map(u => u.id)) + 1;
      const newUser = new AuthUserModel(newId, username, password, email);

      const addedUser = await AuthUserService.addUser(newUser);

      if (addedUser) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Register error!', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }
}