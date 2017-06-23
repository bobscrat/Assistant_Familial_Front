//Olga
import axios from 'axios';

// *********************************
//           EVENTS
// *********************************

export function loadEvents(familyId, memberId, categoryId, projectId) {
  let request = '/api/events/filters?familyId=' + familyId;
  if (memberId > 0) {request += '&memberId=' + memberId}
  if (categoryId > 0) {request += '&categoryId=' + categoryId}
  if (projectId > 0) {request += '&projectId=' + projectId}
  return axios.get(request).then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get events :::', err);
  }))
}

export function saveEvent(event) {
  return axios.post('/api/events', event).then((response) => {
    return response.data;
  }).catch((err) => {
  console.log('Failed to add event : ', err);
  })
}

export function updateEvent(event) {
  return axios.put('/api/events', event).then((response) => {
    return response.data;
  }).catch((err) => {
    console.log('Failed to update event : ', err);
  })
}



// *********************************
//           PRIORITIES
// *********************************

export function loadPriorities() {
  return axios.get('/api/priorities').then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get priorities :::', err);
  }))
}

// *********************************
//           PERIODICITIES
// *********************************

export function loadPeriodicities() {
  return axios.get('/api/periodicities').then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get periodicities :::', err);
  }))
}

// *********************************
//           CONTACTS
// *********************************

export function loadContacts() {
  return axios.get('/api/contacts').then((response) => {
    return response.data;
  }).catch((err => {
    console.log('failed to get contacts :::', err);
  }))
}
