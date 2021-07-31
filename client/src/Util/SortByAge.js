// slicing because initial objects are frozen

export let SortByAge = (data) => {
  return data.slice().sort((prevUser, nextUser) => {
    return prevUser?.age - nextUser?.age;
  });
};
export let SortByName = (data) => {
  return data.slice().sort((prevUser, nextUser) => prevUser.name.localeCompare(nextUser.name));
};
