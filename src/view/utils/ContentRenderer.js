// This file use for render content of main data, beside contains some function handle split page, view detail of data...

import renderAllUser from './RenderUser';
import {
  viewInfoHandle,
  addCheckboxEventListener,
} from '@/helpers/eventHandlers';

export async function renderContent(view) {
  const main = view.container.querySelector('.main');
  if (!main) return;

  const usersElement =
    main.querySelector('.user') || document.createElement('div');
  usersElement.className = 'user';

  const filteredAndSortedUsers = view.userController.applyFiltersAndSort();

  view.currentUsers = filteredAndSortedUsers;

  const paginatedUsers = view.pagination.getCurrentPageItems(view.currentUsers);

  try {
    const userHTML = renderAllUser.renderUsers(paginatedUsers);
    usersElement.innerHTML = userHTML;
  } catch (error) {
    console.error('Error when render user:', error);
    usersElement.innerHTML = 'Not found';
  }

  if (!main.contains(usersElement)) {
    main.appendChild(usersElement);
  }

  updatePagination(view);

  applyViewMoreListeners(view);
  viewInfoHandle();
  addCheckboxEventListener();
}

function updatePagination(view) {
  const currentRange = view.container.querySelector('.current-range');
  const totalItems = view.container.querySelector('.total-items');
  const prevButton = view.container.querySelector('.prev-page');
  const nextButton = view.container.querySelector('.next-page');

  if (currentRange && totalItems && prevButton && nextButton) {
    const pageInfo = view.pagination.getPageInfo();
    currentRange.textContent = pageInfo.currentRange;
    totalItems.textContent = pageInfo.totalItems;

    prevButton.disabled = pageInfo.currentPage === 1;
    nextButton.disabled = pageInfo.currentPage === pageInfo.totalPages;
  }
}

function applyViewMoreListeners(view) {
  const viewMoreButtons = view.container.querySelectorAll('.viewmore');
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      const additionElement = event.target.closest('.addition');
      if (additionElement) {
        view.additionOption.displayOption(additionElement);
      }
    });
  });

  document.addEventListener('click', event => {
    if (
      !event.target.closest('.addition') &&
      view.additionOption.currentOpenForm
    ) {
      view.additionOption.currentOpenForm.classList.add('hidden');
      view.additionOption.currentOpenForm = null;
    }
  });
}
