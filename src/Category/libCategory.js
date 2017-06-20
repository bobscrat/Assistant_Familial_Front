//Olga
import axios from 'axios';

// export function loadCategories(familyId, bool) {
export function loadCategories(familyId) {
  // bool = true = get family's categories and predefined categories
  // bool = false = get only family's categories
  // const request = '/api/categories/filters?familyId=' + familyId + '&getPredefined=' + bool;
  const request = '/api/categories';
  //const request = '/api/categories/filters?familyId='+familyId;
  return axios.get(request).then((response) => {
    const categories = response.data;
    for (let i = 0; i < categories.length; i++) {
      categories[i].activeFilter = false;
      categories[i].colorPaletteShow = false;
    }
    return categories;
  }).catch((err => {
    console.log('failed to get categories :::', err);
  }))
}

export function saveCategory(category) {
  return axios.post('/api/categories', category).then((response) => {
    const newCategory = response.data;
    newCategory.activeFilter = false;
    return newCategory;
  }).catch((err) => {
  console.log('Failed to add category : ', err);
  })
}

export function updateCategory(category) {
  // need to keep the filter boolean
  const bool = category.activeFilter;
  return axios.put('/api/categories', category).then((response) => {
    const newCategory = response.data;
    newCategory.activeFilter = bool;
    return newCategory;
  }).catch((err) => {
    console.log('Failed to update category : ', err);
  })
}
