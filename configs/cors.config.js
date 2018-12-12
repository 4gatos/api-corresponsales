const originsAllowed = [
  'https://gestor-corresponsales.herokuapp.com/'
];

module.exports = {
  origin: function (origin, cb) {
      const allowed = originsAllowed.indexOf(origin) !== -1;
      cb(null, allowed);
  },
  credentials: true,
}