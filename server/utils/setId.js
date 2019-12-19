module.exports = setId = obj => obj.map(el => ({ ...el, id: el._id}));
