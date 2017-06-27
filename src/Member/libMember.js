//Olga
import axios from 'axios';

export function loadMembers(familyId, bool) {
  // bool = true : get only family's active members
  // bool = false : get all family's members
  let request = '/api/users/filters?familyId=' + familyId + '&isActive=' + bool;
  return axios.get(request).then((response) => {
    const members = response.data;
    for (let i = 0; i < members.length; i++) {
      members[i].activeFilter = false;
    }
    return members;
  })
}

export function saveMember(member) {
  return axios.post('/api/users', member).then((response) => {
    const newMember = response.data;
    newMember.activeFilter = false;
    return newMember;
  })
}

export function updateMember(member) {
  // need to keep the filter boolean
  const bool = member.activeFilter;
  return axios.put('/api/users', member).then((response) => {
    const newMember = response.data;
    newMember.activeFilter = bool;
    return newMember;
  })
}
