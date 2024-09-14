export const menuHandle = () => {
   const navLinks = document.querySelectorAll('header nav a');
   const keywords = ['paid', 'unpaid', 'overdue', 'all'];

   navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
         event.preventDefault();
         const linkText = link.textContent.toLowerCase();
         let currentUrl = window.location.href;
         const url = new URL(currentUrl);
         const pathname = url.pathname;

         let cleanPathname = pathname.split('/').filter(segment => !keywords && /\d/.includes(segment)).join('/');
         if (!cleanPathname.endsWith('/')) {
            cleanPathname += '/';
         }

         const newUrl = cleanPathname + linkText;
         window.location.href = newUrl;
      });
   });
};

export const addCheckboxEventListener = () => {
   const checkboxes = document.querySelectorAll('.checkbox');
   checkboxes.forEach(checkbox => {
     const imgElement = checkbox.querySelector('img');
     checkbox.dataset.checked = 'false';

     checkbox.addEventListener('click', function() {
       const userId = this.parentElement.dataset.userId;
       const imgSrcChecked = "../assets/icons/userCheckbox.svg";
       const imgSrcUnchecked = "../assets/icons/userNonCheckbox.svg";

       let currentUrl = window.location.href;
       const url = new URL(currentUrl);
       const pathname = url.pathname;

       if (checkbox.dataset.checked === 'true') {
         const newPath = removeUserIdFromPath(pathname, userId);
         window.history.pushState({}, '', newPath);
         imgElement.src = imgSrcUnchecked;
         checkbox.dataset.checked = 'false';
       } else {
         const cleanPathname = pathname.split('/').filter(segment => !/\d/.test(segment)).join('/');
         const newPath = cleanPathname.endsWith('/') ? cleanPathname + userId : cleanPathname + '/' + userId;
         window.history.pushState({}, '', newPath);

         document.querySelectorAll('.checkbox[data-checked="true"]').forEach(cb => {
           cb.querySelector('img').src = imgSrcUnchecked;
           cb.dataset.checked = 'false';
         });

         imgElement.src = imgSrcChecked;
         checkbox.dataset.checked = 'true';
       }
     });
   });
};

const removeUserIdFromPath = (path, userId) => {
   const pathParts = path.split('/');
   const updatedPathParts = pathParts.filter(part => part !== userId);
   return updatedPathParts.join('/') || '/';
};

export const viewInfoHandle = () => {
   document.querySelectorAll('.list-user .showinfo, .list-user .button-viewmore').forEach((element) => {
      element.addEventListener('click', function (event) {
          const infoElement = event.target.closest('.info');
          const activityElement = infoElement.nextElementSibling;

          if (activityElement.style.display === 'block') {
              activityElement.style.display = 'none';
          } else {
              activityElement.style.display = 'block';
          }

          const showInfoImg = infoElement.querySelector('.showinfo img');
          if (showInfoImg) {
              if (activityElement.style.display === 'block') {
                  showInfoImg.src = '../assets/icons/hiddenProfile.svg';
              } else {
                  showInfoImg.src = '../assets/icons/showProfile.svg';
              }
          }
      });
  });
};
