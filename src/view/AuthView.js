import { validateUsername, validatePassword, validateEmail } from "@/services/RegexInput";

export default class AuthView {
   constructor(authController) {
      this.authController = authController;
   }

   async LoginForm() {
      const container = document.createElement('div');
      container.className = 'login-container';
      container.innerHTML = `
        <h2>LOGIN</h2>
        <form id="login-form">
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
        <p>I don't have account? <a href="/register">Register</a></p>
      `;

      container.querySelector('#login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const success = await this.authController.login(username, password);
        if (success) {
          window.location.pathname = '/';
        } else {
          alert('Login failed. Please try again!');
        }
      });

      return container;
   }

   async RegisterForm() {
      const container = document.createElement('div');
      container.className = 'register-container';
      container.innerHTML = `
        <h2>REGISTER</h2>
        <form id="register-form">
          <input type="text" id="username" placeholder="Username" required>
          <p id="username-error" class="error-message"></p>
          <input type="password" id="password" placeholder="Password" required>
          <p id="password-error" class="error-message"></p>
          <input type="email" id="email" placeholder="Email" required>
          <p id="email-error" class="error-message"></p>
          <button type="submit">Register</button>
        </form>
        <p>I have an account <a href="/login">Login</a></p>
      `;

      const form = container.querySelector('#register-form');
      const usernameInput = form.querySelector('#username');
      const passwordInput = form.querySelector('#password');
      const emailInput = form.querySelector('#email');
      const usernameError = form.querySelector('#username-error');
      const passwordError = form.querySelector('#password-error');
      const emailError = form.querySelector('#email-error');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const email = emailInput.value;

        let isValid = true;

        if (!validateUsername(username)) {
          usernameError.textContent = 'Username contains number and letter';
          isValid = false;
        } else {
          usernameError.textContent = '';
        }

        if (!validatePassword(password)) {
          passwordError.textContent = 'Password at least 6 character, special symbols, uppercase letters';
          isValid = false;
        } else {
          passwordError.textContent = '';
        }

        if (!validateEmail(email)) {
          emailError.textContent = 'Incorrect email';
          isValid = false;
        } else {
          emailError.textContent = '';
        }

        if (isValid) {
          const success = await this.authController.register(username, password, email);
          if (success) {
            alert('Register succesfully!');
            window.location.pathname = '/login';
          } else {
            alert('Register failed!');
          }
        }
      });

      return container;
   }
}