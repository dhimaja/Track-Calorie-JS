// Storage Controller

// Item Controller
const ItemCtrl = (function(){
    // Iten Constructor

    const Item = function(id, name, calories){
        this.id =id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State 
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name:'Cookie', calories: 400},
            // {id: 2, name:'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // public methods
    return {
        getItems:function(){
            return data.items;
        },

        addItem: function(name, calories){
           let ID;
           if(data.items.length > 0){
               ID = data.items[data.items.length - 1].id +1;
           } else {
               ID = 0;
        }

        // Calories to number 
        calories = parseInt(calories);
        newItem = new Item(ID, name, calories);
        // Add to items array 
        data.items.push(newItem);

        return newItem;
        }, 
  
        getItemById: function(id){
           let found = null;
           data.items.forEach(function(item){
               if(item.id ===  id){
                   found = item;
               }
           });
           return found;
        },

        // Update item function
        updateItem: function(name, calories){
        calories = parseInt(calories);
        let found = null;
        data.items.forEach(function(item){
            if(item.id === data.currentItem.id){
                item.name = name;
                item.calories = calories;
                found = item;
            }
        });
        return found;
        },

        deleteItem: function(id){
        // Get ids
        ids = data.items.map(function(item){
            return item.id
        });

        // Get index
        const index = idx.indexOf(id);

        // remove item 
        data.item.splice(index, 1);
        },

        // clear all items
        clearAllItems: function(){
          data.items =[];
        },
        
        
         // Loop through items and add cals
        getTotalCalories: function(){
            let total = 0;
            data.items.forEach(function(item){
                total += item.calories;                        
            });
            // Set total cal in data structures
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
        },
        setCurrentItem: function(item){
            data.currentItem = item;

           },

        getCurrentItem: function(){
        return data.currentItem;
        },

       

        
        logData: function(){
            return data;
        }
    }
 
})();

// UI Controller
const UICtrl = (function(){
  const UISelectors ={
      itemList: '#item-list',
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn:'.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearbtn: '.clear-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
  }

    return{
 populateItemList: function(items){
    let html= '';

    items.forEach(function(item){
       html += `<li class="collection-item" id="item-${item.id}">
       <strong>${item.name}: </strong><em>${item.calories} Calories</em>
       <a href="#" class="secondary-content">
       <i class=" edit-item fa fa-pencil"></i>
       </a>
       </li>
       
       `;
    });

 
    // Insert list item 
    document.querySelector(UISelectors.itemList).innerHTML = html;
    // Public methods
},

getItemInput: function(){
  return{
      name:document.querySelector(UISelectors.itemNameInput).value,
      calories: document.querySelector(UISelectors.itemCaloriesInput).value
  }
},

addListItem: function(item){
// Show list
document.querySelector(UISelectors.itemList).style.display ='block';

// Create li element 

const li = document.createElement('li');

// Add class 
li.className = 'collection-item';
// Add ID
li.id = `item-${item.id}`;
// Add HTML
li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
<a href="#" class="secondary-content">
<i class=" edit-item fa fa-pencil"></i>
</a>`;
// Insert item
document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
},

updateListItem: function(item){
 let listItems = document.querySelectorAll(UISelectors.listItems);
 
 // Turn Node list into array 
 listItems = Array.from(listItems);

 listItems.forEach(function(listItem){
    const itemID = listItem.getAttribute('id');

    if(itemID === `item-${item.id}`){
        document.querySelector(`#${itemID}`).innerHTML= `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
        <i class=" edit-item fa fa-pencil"></i>
        </a>`;
    }
 });
},

deleteListItem: function(id){
 const itemID = `#item-${id}`;
 const item = document.querySelector(itemID);
 item.remove();
},
  
clearInput:function(){
    document.querySelector(UISelectors.itemNameInput).value ='';
    document.querySelector(UISelectors.itemCaloriesInput).value ='';
},

hideList: function()
{
document.querySelector(UISelectors.itemList).style.display = 'none';
},

showTotalCalories: function(totalCalories){
document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
},
clearEditState: function(){
UICtrl.clearInput();
document.querySelector(UISelectors.updateBtn).style.display = 'none';
document.querySelector(UISelectors.deleteBtn).style.display = 'none';
document.querySelector(UISelectors.backBtn).style.display = 'none';
document.querySelector(UISelectors.addBtn).style.display = 'inline';

},

addItemToForm: function(){
document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
UICtrl.showEditState();
},

showEditState: function(){
    document.querySelector(UISelectors.updateBtn).style.display = 'inline';
    document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
    document.querySelector(UISelectors.backBtn).style.display = 'inline';
    document.querySelector(UISelectors.addBtn).style.display = 'none';
    
    },

    removeItems: function(){
 let listitems =document.querySelector(UISelectors.listItems);

 // Turn Node list into array 
 listItems = Array.from(listItems);

 listItems.forEach(function(item){
     item.remove();
 });
    },
getSelectors: function(){
    return UISelectors;
}
    }

 
})();




// App controller
const App = (function(ItemCtrl, UICtrl){
    // Load event listeners
     const loadEventListeners = function(){
     const UISelectors = UICtrl.getSelectors();

     // Add item event
     document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

     // Edit icon click event 
     document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

     // Update item event
     document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

     // Back button event 
     document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

     // Delete button event 
     document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear items event 
     document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

     // Disable submit on enter
     document.addEventListener('keypress', function(e){
         if(EvalError.keyCode === 13 || e.which === 13){
             e.preventDefault();
             return false;
         }
     });

     }

     // Add item submit 
     const itemAddSubmit = function(e){
        // Get form input from UICtrl
        const input = UICtrl.getItemInput();

        // Check for name and calorie input 
        if(input.name!==''&& input.calories !== ''){
            // Add item 
        const newItem = ItemCtrl.addItem(input.name, input.calories);
        // Add item to UI list
        UICtrl.addListItem(newItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Clear fields
        UICtrl.clearInput();
        }
        
         e.preventDefault();
     }

     // Click edit item
     const itemEditClick = function(e){
     if(e.target.classList.contains('edit-item')){
        // Get list item id (item-0, item-1)
        const listId = e.target.parentNode.parentNode.id;

        // Break into arrey 
        const listIdArr = listId.split('-');
        
        // Get the actual id 
        const id = parseInt(listIdArr[1]);

        // Get item 
        const itemToEdit = ItemCtrl.getItemById(id);
       
        // Set ciurrent item 
        ItemCtrl.setCurrentItem(itemToEdit);

         // Add item to form 
         UICtrl.addItemToForm();
     }
      e.preventDefault();
     }

     // Update item submit
     const itemUpdateSubmit = function(e){
      const input = UICtrl.getItemInput(); 
      // Update item 
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
      //Update UI
      UICtrl.updateListItem(updatedItem);

       // Get total calories
       const totalCalories = ItemCtrl.getTotalCalories();

       // Add total calories to UI
       UICtrl.showTotalCalories(totalCalories);

       UICtrl.clearEditState();
      e.preventDefault();
     }

     // Delete button event
     const itemDeleteSubmit = function(e){
       // Get current item 
       const currentItem = ItemCtrl.getCurrentItem();
       // Delete from data structure 
       ItemCtrl.deleteItem(currentItem.id);

       // Delete from UI
       UICtrl.deleteListItem(currentItem.id);

       // Get total calories
       const totalCalories = ItemCtrl.getTotalCalories();

       // Add total calories to UI
       UICtrl.showTotalCalories(totalCalories);

       UICtrl.clearEditState();
       
        e.preventDefault();
     }

     // Clear items event

     const clearAllItemsClick = function(){
         // delete all items from data structures
         ItemCtrl.clearAllItems();

         // Get total calories
       const totalCalories = ItemCtrl.getTotalCalories();

       // Add total calories to UI
       UICtrl.showTotalCalories(totalCalories);

       UICtrl.hideList();

         // Remove from UI
         UICtrl.removeItems();
     }

    // Public methods
    return {
        init: function(){
            // clear edit state/ set initial set
            UICtrl.clearEditState();

            // fetch ittems from data structures
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length == 0){
                UICtrl.hideList();
            } else {
                 // Populate list with items
            UICtrl.populateItemList(items);

            }

            // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);


           

            // Load event Listeners
            loadEventListeners();

           
        }
    }
 
})(ItemCtrl, UICtrl);

App.init();
