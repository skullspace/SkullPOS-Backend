const router = express.Router;
const stockController = require('../controllers/stock');
const { auth } = require('../utils/auth');

router.get('/', auth, stockController.getAllStocks);
router.get('/:id', auth, stockController.getStockById);
router.post('/', auth, stockController.addStock);
router.put('/:id', auth, stockController.updateStock);
router.delete('/:id', auth, stockController.deleteStock);
module.exports = router;
