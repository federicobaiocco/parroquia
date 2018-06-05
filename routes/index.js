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
            res.redirect('/');
        })
        .catch(async (err) => {
            res.locals.message = err.errors.cantidad.message;
            // res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            var total = await getTotal();
            res.render('error',{cant: total});
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
