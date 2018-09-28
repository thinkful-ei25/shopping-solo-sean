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
      <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
      </button>
    </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item,index) => generateItemElement(item,index));
  return items.join('');
}

//Responsible for rendering the DOM
function renderShoppingList() {
  let filteredItems = Array.from(STORE.items); 

  //FILTER VIA CHECKED ITEMS
  if (STORE.hideCheckedItems){ 
    filteredItems = filteredItems.filter(item => !item.checked); 
  }

  //FILTER VIA SEARCH TERM
  if (STORE.searchTerm !== ''){ 
    filteredItems = filteredItems.filter((item) => item.name.includes(STORE.searchTerm)); 
  }
  
  
  const shoppingListItemString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemString);
  // eslint-disable-next-line no-console
  console.log('`renderShoppingList` ran');
}
  
//Used when a user adds a new list item
function handleNewItemSubmit() {

  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault(); 
    const newItemName = $('.js-shopping-list-entry').val(); 
    $('.js-shopping-list-entry').val(''); 
    setStoreShoppingListItem(newItemName);
    renderShoppingList();    
  }); 

}

//Gets the index of list element
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    const itemIndex = getItemIndexFromElement(event.target);
    setStoreCheckedItemVal(itemIndex);
    renderShoppingList();
  });

}
  
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    const listElement = $(event.target).closest('li');
    deleteStoreItem(listElement);
    renderShoppingList(); 
  });
}

function handleHideCheckedItems(){ 
  $('.js-hide-all-checked-items').on('click', function(event){ 
    setStoreHideAllCheckedItems(event.target); 
    renderShoppingList(); 
  });  
}

function handleEditItems(){ 
  $('.js-shopping-list').on('click', '.js-item-edit', function(event){
    //$(event.currentTarget).closest('li').remove();
    const closestLiElement = $(event.currentTarget).closest('li'); 
    const index = getItemIndexFromElement(closestLiElement); 
    
    let editEntry = $('.js-shopping-search-entry-edit').val(); 
    $('.js-shopping-search-entry-edit').val('');

    updateStoreItemName(index, editEntry); 
    renderShoppingList(); 
  }); 

}

function handleSearchFilterItems(){ 
  $('#js-search-term').submit(function(event) { 
    event.preventDefault(); 
    // console.log('hello'); 
    const searchTerm = $('.js-shopping-search-entry').val(); 
    $('.js-shopping-list-entry').val(''); 

    setStoreSearchTerm(searchTerm);
    renderShoppingList();    
  }); 
}

function updateStoreItemName(index, val){ 
  STORE.items[index].name = val; 
}
function deleteStoreItem(item){
  const index = getItemIndexFromElement(item);
  STORE.items.splice(index,1);
}

function setStoreHideAllCheckedItems(){ 
  STORE.hideCheckedItems = !STORE.hideCheckedItems;
}

function setStoreSearchTerm(searchTerm){ 
  STORE.searchTerm = searchTerm; 
}

function setStoreCheckedItemVal(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked; 
}

function setStoreShoppingListItem(itemName) { 
  STORE.items.push({name : itemName, checked : false}); 
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
  handleEditItems(); 
  
}

$(handleShoppingList);