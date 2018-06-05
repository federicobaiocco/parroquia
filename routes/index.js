var express = require('express');
var router = express.Router();
var cantidad = require('../cantidadSchema').Cantidad;

/* GET home page. */
router.get('/', async function(req, res, next) {
  total = await getTotal();
  res.render('index', { cant: total });
});

router.post('/submit', async function(req, res, next) {
    c = new cantidad();
    c.cantidad = req.body.cantidad;
    c.fecha = Date.now();
    c.save()
        .then(async (r) => {
            total = await getTotal();
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });


});

async function getTotal(){
  return new Promise((result) => {
      cantidad.aggregate(
          [
              {$group:
                      { _id:{},
                          total: {$sum:'$cantidad'}
                      }
              }
          ]
      ).then((r) => {
          console.log(r[0].total);
          result(r[0].total);
      })
  })
}

module.exports = router;
