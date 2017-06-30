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
    const events = response.data;
    for (let i = 0; i < events.length; i++) {
      // JavaScript counts months from 0 to 11 : it's the reason why I write events[i].deadline[1]-1
      events[i].convertedDate = new Date(events[i].deadline[0], events[i].deadline[1]-1, events[i].deadline[2],events[i].deadline[3],events[i].deadline[4]);
  }
    return events;
  })
}

export function saveEvent(event) {
  return axios.post('/api/events', event).then((response) => {
    return response.data;
  })
}

export function updateEvent(event) {
  return axios.put('/api/events', event).then((response) => {
    return response.data;
  })
}

// *********************************
//           PRIORITIES
// *********************************

export function loadPriorities() {
  return axios.get('/api/priorities').then((response) => {
    return response.data;
  })
}

// *********************************
//           PERIODICITIES
// *********************************

export function loadPeriodicities() {
  return axios.get('/api/periodicities').then((response) => {
    return response.data;
  })
}

// *********************************
//           CONTACTS
// *********************************

export function loadContacts() {
  return axios.get('/api/contacts').then((response) => {
    return response.data;
  })
}
