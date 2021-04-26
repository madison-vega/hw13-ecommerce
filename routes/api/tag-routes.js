const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// gets all tags
router.get('/', (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ],
    });
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err);
  }
});
// gets one tag
router.get('/:id', (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    })
    res.status(200).json(oneTag)
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new tag
router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update tag
router.put('/:id', (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);

  };
});
// delete tag
router.delete('/:id', (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
