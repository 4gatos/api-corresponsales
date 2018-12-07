function createSlug(string) {
  return string.toLowerCase().split(' ').join('-');
}

module.exports = {
  createSlug
};