//Didier
import axios from 'axios';

export function loadContacts(familyId) {
  // bool = true = get family's categories and predefined categories
  // bool = false = get only family's categories
  let request = '/api/contacts/filters?familyId=' + familyId ;
  //let request = '/api/contacts'
  return axios.get(request).then((response) => {
    const contacts = response.data;
    // for (let i = 0; i < contacts.length; i++) {
    //   contacts[i].activeFilter = false;
    //   categories[i].colorPaletteShow = false;
    // }
    return contacts;
  }).catch((err => {
    console.log('failed to get contacts :::', err);
  }))
}

