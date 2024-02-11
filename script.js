// let's bring some of the elements form the html file 

const elContactForm = document.querySelector(".js-contact-form");
const elContactUserName = elContactForm.querySelector(".js-contact-input");
const elContactUserStatus = elContactForm.querySelector(".js-contact-relationship-list");
const elContactUserNumber = elContactForm.querySelector(".js-contact-number");
const elContactList = document.querySelector(".js-contact-list");
const elContactTemplate = document.querySelector(".js-contact-template").content;

const contacts = []


function showContactList (arr, node) {
    
    node.innerHTML = ""
    
    arr.forEach(function(contact, index) {
        
        const templateCloneNodes = elContactTemplate.cloneNode(true);
        templateCloneNodes.querySelector(".user-name").textContent = contact.username;
        templateCloneNodes.querySelector(".user-name-status").textContent = contact.relationshipStatus;
        templateCloneNodes.querySelector(".user-phone-number").textContent = contact.userNumber;
        templateCloneNodes.querySelector(".user-phone-number").href = `tel: ${contact.userNumber}`;
        
        templateCloneNodes.querySelector(".js-delete-button").dataset.indexOfContact = index
        
        node.appendChild(templateCloneNodes)
        
    });
    
};

function AddToContactList (name, relationship, number) {
    
    let object = {
        username: name,
        relationshipStatus: relationship,
        userNumber: number
    }
    
    contacts.push(object)
    
};

const phoneNumbersArr = []

elContactForm.addEventListener("submit", function(evt) {
    
    evt.preventDefault();
    
    const inputNameVal = elContactUserName.value.trim();
    const inputPhoneNumberVal = elContactUserNumber.value.trim();
    const inputUserStatusVal = elContactUserStatus.value.trim();

    const isDuplicate = phoneNumbersArr.includes(inputPhoneNumberVal);

    elContactUserName.value = "";
    elContactUserStatus.value = "";
    elContactUserNumber.value = "";

    if(isDuplicate) {
        elContactUserNumber.classList.add("is-invalid")
        return
    } else {
        elContactUserNumber.classList.remove("is-invalid")
    }

    phoneNumbersArr.push(inputPhoneNumberVal)
    
    AddToContactList(inputNameVal, inputUserStatusVal, inputPhoneNumberVal)
    
    showContactList(contacts, elContactList)

    
});

function deleteContact (item) {

    contacts.splice(item, 1);
  
    showContactList(contacts, elContactList);
  
  }
  
  elContactList.addEventListener("click", function(evt){
  
    if(evt.target.matches(".js-delete-button")){
  
      const deleteItem = Number(evt.target.dataset.indexOfContact);
  
      deleteContact(deleteItem);
  
    };
  
  })