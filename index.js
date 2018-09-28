'use strict';
/*eslint-env jquery*/

const STORE = {
  items : [
    {name:'Orange',checked:true},
    {name:'Apple', checked:false},
    {name:'Kiwi',checked:true}], 

  hideCheckedItems : false, 
  searchTerm : '' 

};
//let hideAll = false; 


function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 
    'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item,index) => generateItemElement(item,index));
  return items.join('');
}

function renderShoppingList() {
  let filteredItems = Array.from(STORE.items); 
  if (STORE.hideCheckedItems){ 
    filteredItems = filteredItems.filter(item => !item.checked); 
  }

  if (STORE.searchTerm !== ''){ 
    filteredItems = filteredItems.filter((item) => item.name.includes(STORE.searchTerm)); 

  }
  // this function will be responsible for rendering the shopping list in
  // the DOM
  const shoppingListItemString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemString);
  // eslint-disable-next-line no-console
  console.log('`renderShoppingList` ran');
}
  
function addItemToShoppingList(itemName) { 
  STORE.items.push({name : itemName, checked : false}); 
} 

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault(); 
    const newItemName = $('.js-shopping-list-entry').val(); 
    $('.js-shopping-list-entry').val(''); 
    addItemToShoppingList(newItemName);
    renderShoppingList();    
  }); 

  
  // this function will be responsible for when users add a new shopping list item
  // eslint-disable-next-line no-console
  console.log('`handleNewItemSubmit` ran');
}
  
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked; 
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.

  //eslint-disable-next-line no-console
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    const itemIndex = getItemIndexFromElement(event.target);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });

  //eslint-disable-next-line no-console
  console.log('`handleItemCheckClicked` ran');
}

function renderDelete(item) {
  $(item).remove();
}

function deleteStoreItem(item){
  const index = getItemIndexFromElement(item);
  STORE.items.splice(index,1);
}
  
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  // eslint-disable-next-line no-console
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    //$(event.currentTarget).closest('li').remove();
    const listElement = $(event.target).closest('li');
    deleteStoreItem(listElement);
    renderDelete(listElement);
  
  });

  //eslint-disable-next-line no-console
  console.log('`handleDeleteItemClicked` ran');
}

function updateStoreHideCheckedItems(item){ 
  STORE.hideCheckedItems = !STORE.hideCheckedItems;
}

function handleHideCheckedItems(){ 
  console.log('yo'); 
  $('.js-hide-all-checked-items').on('click', function(event){ 
    updateStoreHideCheckedItems(event.target); 
    renderShoppingList(); 
    
  });  
}
  
function updateStoreSearchTerm(searchTerm){ 
  STORE.searchTerm = searchTerm; 
}

function handleSearchFilterItems(){ 
  $('#js-search-term').submit(function(event) { 
    event.preventDefault(); 
    // console.log('hello'); 
    const searchTerm = $('.js-shopping-search-entry').val(); 
    $('.js-shopping-list-entry').val(''); 

    updateStoreSearchTerm(searchTerm);
    renderShoppingList();    
  }); 
}
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCheckedItems(); 
  handleSearchFilterItems(); 
  
}

$(handleShoppingList);