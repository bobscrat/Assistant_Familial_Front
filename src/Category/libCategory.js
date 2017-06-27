//Olga
import axios from 'axios';

export function loadCategories(familyId, bool) {
  // bool = true = get family's categories and predefined categories
  // bool = false = get only family's categories
  let request = '/api/categories/filters?familyId=' + familyId + '&getPredefined=' + bool;
  return axios.get(request).then((response) => {
    const categories = response.data;
    for (let i = 0; i < categories.length; i++) {
      categories[i].activeFilter = false;
      categories[i].colorPaletteShow = false;
    }
    return categories;
  })
}

export function saveCategory(category) {
  return axios.post('/api/categories', category).then((response) => {
    const newCategory = response.data;
    newCategory.activeFilter = false;
    return newCategory;
  })
}

export function updateCategory(category) {
  // need to keep the filter boolean
  const bool = category.activeFilter;
  return axios.put('/api/categories', category).then((response) => {
    const newCategory = response.data;
    newCategory.activeFilter = bool;
    return newCategory;
  })
}
