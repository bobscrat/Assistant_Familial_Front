//Olga
import axios from 'axios';

export function loadMembers(familyId) {
  // const request = '/api/users/filters?familyId='+familyId;
  const request = '/api/users';
  return axios.get(request).then((response) => {
    const members = response.data;
    for (let i = 0; i < members.length; i++) {
      members[i].activeFilter = false;
    }
    return members;
  }).catch((err => {
    console.log('failed to get members :::', err);
  }))
}

export function saveMember(member) {
  return axios.post('/api/users', member).then((response) => {
    const newMember = response.data;
    newMember.activeFilter = false;
    return newMember;
  }).catch((err) => {
  console.log('Failed to add project : ', err);
  })
}

export function updateMember(member) {
  // need to keep the filter boolean
  const bool = member.activeFilter;
  return axios.put('/api/users', member).then((response) => {
    const newMember = response.data;
    newMember.activeFilter = bool;
    return newMember;
  }).catch((err) => {
    console.log('Failed to update project : ', err);
  })
}
