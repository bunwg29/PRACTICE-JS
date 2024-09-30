// AuthUserService.js
import { getAccount } from './getUserAPI.js/index.js';
import { authUsersApi } from '@/api/apiUserConfig.js';
import AuthUserModel from '@/model/AuthUserModel.js';

export default class AuthUserService {
  static async getAllAuthUsers() {
    try {
      const userData = await getAccount();
      return userData.map(user => new AuthUserModel(user.id, user.username, user.password, user.email));
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      const response = await authUsersApi.post('', newUser);
      return new AuthUserModel(response.data.id, response.data.username, response.data.password, response.data.email);
    } catch (error) {
      console.error('Error adding new user:', error);
      throw error;
    }
  }
}