const CATEGORIES = [
  'Action fiction',
  'Adventure',
  'Comic',
  'Crime',
  'Erotic',
  'Fantasy',
  'Gothic',
  'Historical',
  'Horror',
  'Mystery',
  'Philosophical',
  'Romance',
  'Satire',
  'Western',
  'Thriller',
  'Urban',
  'Superhero'
];

function setConstCategories(CONST) {
  CONST.create({ categories: CATEGORIES }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return CATEGORIES;
    }
  });
}

module.exports = { setConstCategories };
