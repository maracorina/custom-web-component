# 📝 custom-web-component
A Web Component allowing you to create editable and expandable lists — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

## 🚀 Technologies

- Javascript
- HTML
- CSS

![image](https://user-images.githubusercontent.com/49560400/123251969-6ebe3500-d4f4-11eb-8d6e-7ac98a7c85c9.png)


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
- *selectItem*
  - triggered when an item from the list is clicked
  - shows sublist
- *unselectItem*
  - triggered when an item from the list is clicked again
  - toggles back the sublist
- *setEditMode*
  - makes list editable or leaves the edit mode
- *addNewItem*
  - triggered when a new item is added to the list
  - must be in edit mode
  - updates list/sublist
- *removeItem*
  - triggered when an item from the list is deleted
  - must be in edit mode
  - updates the list/sublist

## 🌈 Live Preview
https://jsfiddle.net/scj7kd0z/

## 🔑 Approach
It consists of two main technologies, which were used together to create the custom element with encapsulated functionality that can be reused wherever you like without fear of code collisions.
- *Custom elements*: A set of JavaScript APIs that allow you to define custom elements and their behavior, which can then be used as desired in your user interface.
- *Shadow DOM*: A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way, you can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.

The approach for implementing the web component looked something like this:

- Created a class in which the web component functionality was specified, using the ECMAScript 2015 class syntax (see Classes for more information). 
- Attached a shadow DOM to the custom element using Element.attachShadow() method.
- Added child elements, event listeners, etc., to the shadow DOM using regular DOM methods.
- Registered the new custom element using the CustomElementRegistry.define() method, passing it the element name to be defined and the class in which its functionality was specified.

## 💻 Usage
Include the Java script main.js and use the tag <editable-list> in your html with the following properties:

- title - the component title: string
- list-item-0, list-item-1, ... - the initial list entries: each must be a string
- add-item-text - the text input for new entries label: string

Usage Examples
Builder

    <script type="text/javascript" src="main.js" defer></script>
    <editable-list
        title="TODO LIST"
        list-item-0="First item on the list"
        list-item-1="Second item on the list"
        list-item-2="Third item on the list"
        list-item-3="Fourth item on the list"
        list-item-4="Fifth item on the list"
        add-item-text="Add new list item:">
    </editable-list>

## 👤 Author

Mara Corina-Ioana
/ *mara_corina_ioana@yahoo.com*
