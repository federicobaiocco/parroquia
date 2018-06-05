var express = require('express');
var router = express.Router();
var cantidad = require('../cantidadSchema').Cantidad;

/* GET home page. */
router.get('/', async function(req, res, next) {
    total = await getTotal();
    totalHoy = await getTotalHoy();
    res.render('index', { cant: total, cantHoy: totalHoy });
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


async function getTotalHoy(){
    var d1 = new Date();
    d1.setHours(0,0,0,0);
    var d2 = d1.addDays(1);
    return new Promise((result) => {
        cantidad.aggregate(
            [
                {$match:
                        {
                            fecha:{ $gte : d1,
                                $lt: d2}
                        }
                },
                {$group:
                        { _id:{},
                            totalHoy: {$sum:'$cantidad'}
                        }
                }
            ]
        ).then((r) => {
            result(r[0].totalHoy);
        })
    })
}


Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
module.exports = router;
