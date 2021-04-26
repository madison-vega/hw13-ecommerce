const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
});
// get one category by id
router.get('/:id', async (req, res) => {
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    res.status(200).json(oneCat)
  } catch (err) {
    res.status(500).json(err);
  }

});
// creates new category
router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});
// updates category
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json(err);

  };
});
// delete category by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
