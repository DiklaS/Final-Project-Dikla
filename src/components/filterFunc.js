// filterUtils.js
export const filterData = (data, filterString) => {
  if (!filterString) {
    return data;
  }
  return data.filter(
    (item) =>
      item.title.toLowerCase().startsWith(filterString) ||
      item.bizNumber.toLowerCase().startsWith(filterString)
  );
};

