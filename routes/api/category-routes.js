const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    res.status(200).json(oneCat)
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deleteCat);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
