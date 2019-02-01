const originsAllowed = [
  'https://gestor-corresponsales.herokuapp.com/',
  'https://gestor-corresponsales.herokuapp.com',
  'http://gestor-corresponsales.herokuapp.com',
  'http://app.corresponsalesdeguerra.com',
  'http://app.corresponsalesdeguerra.com/',
  'http://localhost:3006'
];

module.exports = {
  origin: function (origin, cb) {
      const allowed = originsAllowed.indexOf(origin) !== -1;
      cb(null, allowed);
  },
  credentials: true,
}