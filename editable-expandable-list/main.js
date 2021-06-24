'use strict';

(function() {
  class EditableList extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      const editableListContainer = document.createElement('div');

      // get attribute values from getters
      const title = this.title;
      const addItemText = this.addItemText;
      const listItems = this.items;

      // adding a class to our container for the sake of clarity
      editableListContainer.classList.add('editable-list');

      // creating the inner HTML of the editable list element
      editableListContainer.innerHTML = `
        <head>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
        <h3>${title}</h3>
        <label class="switch"><input type="checkbox" id="togBtn" class="togBtn"><div class="slider round"><span class="on">EDIT ON</span><span class="off">EDIT OFF</span><!--END--></div></label>
        <ul class="item-list" is="expanding-list">
            <div class="add-input">
              <label>${addItemText}</label>
              <input class="add-new-list-item-input" type="text"></input>
              <button class="editable-list-add-item icon">&oplus;</button>
            </div>
          ${listItems.map(item => `
            <li>${item}
              <button class="editable-list-remove-item icon">&ominus;</button>
                <ul>
                    <div class="add-input">
                      <label>${addItemText}</label>
                      <input class="add-new-list-item-input" type="text"></input>
                      <button class="editable-list-add-item icon">&oplus;</button>
                    </div>
                </ul>
            </li>
          `).join('')}
        </ul>
      `;

      // binding methods
      this.addListItem = this.addListItem.bind(this);
      this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
      this.removeListItem = this.removeListItem.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(editableListContainer);
        
      //initializing the new-item-inputs display values
      const divs1 = Array.from(shadow.querySelectorAll('.add-input'));
      divs1.forEach(div1 => {
                div1.style.display = 'none';
      });
      //initializing the remove buttons display values
      const buttons = Array.from(shadow.querySelectorAll('.editable-list-remove-item'));
      buttons.forEach(button => {
                button.style.display = 'none';
      });
        
      //binding the onchange event for the checkbox to the corresponding function
      const checkbox = shadow.querySelector(".togBtn");
      checkbox.addEventListener('change', function() {
      const divs = Array.from(shadow.querySelectorAll('.add-input'));
      divs.forEach(div => {
        if(div.style.display == 'block'){
            div.style.display = 'none';
        } else {
             div.style.display = 'block';
        }
      });
      const removeButtons = Array.from(shadow.querySelectorAll('.editable-list-remove-item'));
      removeButtons.forEach(removeButton => {
        if(removeButton.style.display == 'inline-block'){
            removeButton.style.display = 'none';
        } else {
            removeButton.style.display = 'inline-block';
        }
      });
      }, false);

      this.makeListExpandable();
    }

    // add items to the list
    addListItem(e) {
      // Finding the corresponding text input
      const textInput = e.target.parentElement.querySelector('.add-new-list-item-input');

      if (textInput.value) {
        // Creating the new item li
        const li = document.createElement('li');
        li.textContent = textInput.value;
          
        // Creating the remove button and appending it to the list item
        const button = document.createElement('button');
        button.classList.add('editable-list-remove-item', 'icon');
        button.innerHTML = '&ominus;';
        li.appendChild(button);
        
        // Creating the sublist and appending it to the list item
        const ul = document.createElement('ul');
        ul.style.display = 'none';
        // Creating the new-item-input and appending it to the list item
        const div = document.createElement('div');
        div.className = "add-input";
        const label = document.createElement('label');
        label.textContent = this.addItemText;
        const input = document.createElement('input');
        input.className = 'add-new-list-item-input';
        input.type = 'text';
        // Creating the add button and appending it to the new-item-input
        const addButton = document.createElement('button');
        addButton.classList.add('editable-list-add-item', 'icon');
        addButton.innerHTML = '&oplus;';
        addButton.addEventListener('click', this.addListItem, false);
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(addButton);
        ul.appendChild(div);
        li.appendChild(ul);
          
        // Add an attribute which can be used  by the style to show an open or closed icon
        li.setAttribute('class', 'closed');

        // Wrap the li element's text in a new span element
        // so we can assign style and event handlers to the span
        const childText = li.childNodes[0];
        const newSpan = document.createElement('span');

        // Copy text from li to span, set cursor style
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = 'pointer';

        // Add click handler to this span
        newSpan.onclick = this.showul;

        // Add the span and remove the bare text node from the li
        childText.parentNode.insertBefore(newSpan, childText);
        childText.parentNode.removeChild(childText);
          
        // Add li to the list
        const parentUl = e.target.parentElement.parentElement;
        parentUl.appendChild(li);

        // Add remove button to the new li
        this.handleRemoveItemListeners([button]);

        // Clean input text
        textInput.value = '';
      }
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      const removeElementButtons = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')];
      this.handleRemoveItemListeners(removeElementButtons);
        
      const addElementButtons = [...this.shadowRoot.querySelectorAll('.editable-list-add-item')];
      this.handleAddItemListeners(addElementButtons);
    
      /* Get all elements with class="close" */
      const closebtns = [...document.getElementsByClassName("close")];
      closebtns.forEach(element => {
        element.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
      });
    }

    // gathering data from element attributes
    get title() {
      return this.getAttribute('title') || '';
    }

    get items() {
      const items = [];

      [...this.attributes].forEach(attr => {
        if (attr.name.includes('list-item')) {
          items.push(attr.value);
        }
      });

      return items;
    }

    get addItemText() {
      return this.getAttribute('add-item-text') || '';
    }

    handleRemoveItemListeners(arrayOfElements) {
      arrayOfElements.forEach(element => {
        element.addEventListener('click', this.removeListItem, false);
      });
    }

    handleAddItemListeners(arrayOfElements) {
      arrayOfElements.forEach(element => {
        element.addEventListener('click', this.addListItem, false);
      });
    }

    removeListItem(e) {
      e.target.parentNode.remove();
    }
      
    makeListExpandable() {
        // Get ul and li elements that are a child of this custom element
        // li elements can be containers if they have uls within them
        const uls = Array.from(this.shadowRoot.querySelectorAll('ul'));
        const lis = Array.from(this.shadowRoot.querySelectorAll('li'));

        // Hide all child uls
        // These lists will be shown when the user clicks a higher level container
        uls.forEach(ul => {
            if(ul.className != 'item-list'){
                ul.style.display = 'none';
            }
        });

        // Look through each li element in the ul
        lis.forEach(li => {
          // If this li has a ul as a child, decorate it and add a click handler
          if (li.querySelectorAll('ul').length > 0) {
            // Add an attribute which can be used  by the style
            // to show an open or closed icon
            li.setAttribute('class', 'closed');

            // Wrap the li element's text in a new span element
            // so we can assign style and event handlers to the span
            const childText = li.childNodes[0];
            const newSpan = document.createElement('span');

            // Copy text from li to span, set cursor style
            newSpan.textContent = childText.textContent;
            newSpan.style.cursor = 'pointer';

            // Add click handler to this span
            newSpan.onclick = this.showul;

            // Add the span and remove the bare text node from the li
            childText.parentNode.insertBefore(newSpan, childText);
            childText.parentNode.removeChild(childText);
            }
        });
    }
    
    
    // li click handler
    showul = function (e) {
        // next sibling to the span should be the ul
        const nextul = e.target.nextElementSibling.nextElementSibling;

        // Toggle visible state and update class attribute on ul
        if (nextul.style.display == 'block') {
          nextul.style.display = 'none';
          nextul.parentNode.setAttribute('class', 'closed');
        } else {
          nextul.style.display = 'block';
          nextul.parentNode.setAttribute('class', 'open');
        }
    };
}

// let the browser know about the custom element
customElements.define('editable-list', EditableList);
})();
