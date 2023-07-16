const normalizeUser = (userData) => {
  if (!userData.name) {
    userData.name = {};
  }
  userData.name = {
    ...userData.name,
    middleName: userData.name.middleName || "",
  };
  if (!userData.image) {
    userData.image = {};
  }
  userData.image = {
    url:
      userData.image.url ||
      "https://pixabay.com/vectors/bicycle-bike-cycling-drive-profile-2026559/",
    alt: userData.image.alt || "yellow fluffy chickens",
  };
  if (!userData.address) {
    userData.address = {};
  }
  userData.address = {
    ...userData.address,
    state: userData.address.state || "not defined",
  }
  return {
    ...userData,
    /* address: {
      ...userData.address,
      state: userData.address.state || "not defined",
    }, */
  };
};

module.exports = normalizeUser;
