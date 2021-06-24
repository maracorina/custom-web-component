# 📝 custom-web-component
A Web Component allowing you to create editable and expandable lists — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

## 🚀 Technologies

- Javascript
- HTML
- CSS

## ✨ Features

This component creates a custom list with a given set of items.

Takes as input an array of elements with type `string`, a title and a given message for the new items text input label.

The user can perform the following actions:
- view list and sublists
- edit list and sublist
  - add a new item/subitem
  - delete an item/subitem

Can be used to represent lists as : To do lists, Shopping lists, Task list, Step by step plans etc.

Events:
- *addNewItem*
  - triggered when a new item is added to the list
  - must be in editmode
  - updates list/sublist
- *selectedItem*
  - triggered when an item from the list is clicked
  - shows sublist
- *unselectItem*
  - triggered when an item from the list is clicked again
  - toggles back the sublist
- *removeItem*
  - triggered when an item from the list is deleted
  - updates the list/sublist

## 🌈 Live Preview
https://jsfiddle.net/10fgvLua/

## 🔑 Approach
It consists of two main technologies, which were used together to create the custom element with encapsulated functionality that can be reused wherever you like without fear of code collisions.
- *Custom elements*: A set of JavaScript APIs that allow you to define custom elements and their behavior, which can then be used as desired in your user interface.
- *Shadow DOM*: A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way, you can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.

The approach for implementing the web component looked something like this:

- Created a class in which the web component functionality was specified, using the ECMAScript 2015 class syntax (see Classes for more information). 
- Attached a shadow DOM to the custom element using Element.attachShadow() method.
- Added child elements, event listeners, etc., to the shadow DOM using regular DOM methods.
- Registered the new custom element using the CustomElementRegistry.define() method, passing it the element name to be defined and the class in which its functionality was specified.


## 👤 Author

Mara Corina-Ioana
/ *mara_corina_ioana@yahoo.com*
