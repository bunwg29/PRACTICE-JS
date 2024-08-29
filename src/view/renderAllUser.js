import { getAllUser } from '../services/processApi.js';
import headingTable from './components/headingTable.js';
const renderUser = async () => {

   try {

      const users = await getAllUser();

      const userElement = users.map(user => `
         <tr class="list-user">
            <td class="list-user__checkbox"><img src="../assets/icons/userNonCheckbox.svg" alt="checkbox"></td>
            <td class="list-user__viewinfo"><img src="../assets/icons/showProfile.svg" alt=""></td>
            <td class="list-user__name">
               <div class="list-user__name-full">${user.firstname} ${user.lastname}</div>
               <div class="list-user__name-email">${user.email}</div>
            </td>
            <td class="list-user__active">
               <p class="list-user__active-status">${user.active_status}</p>
               <p class="list-user__active-login">Last login: ${user.last_login}</p>
            </td>
            <td class="list-user__payment">
               <p class="list-user__payment-status">${user.paid_status}</p>
               <p class="list-user__payment-day">${user.paid_day}</p>
            </td>
            <td class="list-user__amount">
               <p class="list-user__amount-money">${user.amount}</p>
               <p class="list-user__amount-currency">USD</p>
            </td>
            <td class="list-user__viewmore">
               <button class="list-user__viewmore-b">View More</button>
            </td>
            <td class="list-user__addOp"><img src="../assets/icons/viewMoreOption.svg" alt="Addtional option"></td>
         </tr>
      `,
      );

      return userElement.join("");

   } catch (error) {

   console.error('Error when get data', error);
   return 'Get error';

   }
};

export default { renderUser };