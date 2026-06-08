const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { db } = require('../config/firebase');

const REF = 'conductors';

router.get('/', verifyToken, async (req, res) => {
  try {
    const snap = await db.ref(REF).once('value');
    res.json(snap.val() || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const ref = db.ref(REF).push();
    await ref.set(req.body);
    res.status(201).json({ id: ref.key, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    await db.ref(`${REF}/${req.params.id}`).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.ref(`${REF}/${req.params.id}`).remove();
    res.json({ deleted: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
