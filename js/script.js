/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/**
 * Declares global variables
 */
const pageHeader = document.querySelector('.page-header');
const pageSelector = document.querySelector('.page');
const pageSize = 10;
let totalStudentNumber = 0;

/**
 * Shows student list and filters user search
 * all students will be displayed in case
 * there is no text to search
 * otherwise it will filter only the text
 * that contains in name and email
 * 
 * @param {number} page 
 * @param {Object} event 
 */
const showPage = (page, event) => {
   if (event && event.which === 91) {
      return;
   }
   page = page || 1;

   const studentItem = document.getElementsByClassName('student-item');
   const studentNumber = studentItem.length;
   const lastPageNumber = pageSize * page;
   const startPageNumber = lastPageNumber - 10;
   const searchInput = pageHeader.querySelector('.search-text');
   let searchText = searchInput.value;

   searchText = searchText.toLowerCase();
   for (let i = 0; i < studentNumber; i++) {
      let email = studentItem[i].querySelector('.email').textContent.toLowerCase();
      let name = studentItem[i].querySelector('h3').textContent.toLowerCase();

      if (!searchText || email.includes(searchText) || name.includes(searchText)) {
         studentItem[i].setAttribute('display-data', true);
         studentItem[i].style.display = 'list-item';
      } else {
         studentItem[i].setAttribute('display-data', false);
         studentItem[i].style.display = 'none';
      }
   }

   const filterDisplayStudents = document.querySelectorAll('.student-item[display-data=true]');
   totalStudentNumber = filterDisplayStudents.length;

   let messageSelector = pageSelector.querySelector('.message');
   if (messageSelector) {
      pageSelector.removeChild(messageSelector);
   }

   if (totalStudentNumber > pageSize) {
      filterDisplayStudents.forEach((item, index) => {
         if (index >= startPageNumber && index <= (lastPageNumber - 1)) {
            item.style.display = 'list-item';
         } else {
            item.style.display = 'none';
         }
      });
   } else if (!totalStudentNumber) {
      const message = document.createElement('p');

      message.className = 'message';
      message.innerHTML = 'No result';
      pageSelector.append(message);
   }

   appendPageLinks(page);
};

/**
 * Appends search component
 */
const appendSearch = () => {
   const searchContainer = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchButton = document.createElement('button');

   searchInput.className = 'search-text';
   searchInput.setAttribute('placeholder', 'Search for students...');

   searchButton.id = 'search';
   searchButton.innerHTML = 'Search';

   searchContainer.className = 'student-search';
   searchContainer.append(searchInput);
   searchContainer.append(searchButton);
   pageHeader.append(searchContainer);

   searchButton.addEventListener('click', showPage, false);
   searchInput.addEventListener('keyup', showPage.bind(null, 1), false);
};

/**
 * Appends and generate pagination for list
 * 
 * @param {number} page 
 */
const appendPageLinks = (page) => {
   const totalPages = Math.ceil(totalStudentNumber / pageSize);
   const paginationList = pageSelector.querySelector('.pagination');
   const newPaginationList = document.createElement('ul');

   newPaginationList.className = 'pagination';
   page = page || 1;

   for (let i = 1; i <= totalPages; i++) {
      const paginationItem = document.createElement('li');
      const paginationButton = document.createElement('a');

      if (i === page) {
         paginationButton.className = 'active';
      }

      paginationButton.innerHTML = i;
      paginationButton.setAttribute('page-number', i);
      paginationItem.append(paginationButton);
      newPaginationList.append(paginationItem);

      paginationButton.addEventListener('click', () => {
         let pageNumber = paginationButton.getAttribute('page-number');
         pageNumber = parseInt(pageNumber);

         showPage(pageNumber);
      }, false);
   }

   if (paginationList) {
      pageSelector.removeChild(paginationList);
   }

   pageSelector.append(newPaginationList);
};

appendSearch();
showPage();