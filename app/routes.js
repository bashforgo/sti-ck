var Order = require('./models/order');
var fs    = require('fs');

module.exports = function(app, passport) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  // route to handle all angular requests
  app.post('/signinup', passport.authenticate('local-signup-in',{
    successRedirect : '/0', // redirect to the secure profile section
    failureRedirect : '/1'}));

  app.get('/0', function (req, res) {
    res.writeHead(200);
    res.end(JSON.stringify(req.user));
  });

  app.get('/1', function (req, res) {
    res.writeHead(401);
    res.end("1");
  });

  app.get('/issignedin', function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/0');
    } else {
      res.redirect('/1');
    }
  });

  app.get('/signout', function (req, res) {
    res.redirect('/');
    req.logout();
  });

  app.post('/image', function (req, res) {
    res.writeHead(200);
    res.end(req.files.image.path);
  });

  app.post('/sticker', function (req,res) {
    console.log(req.body);
    res.writeHead(200);
    res.end();
  })

  app.post('/order', function (req, res) {
    console.log(req.form)
    Order.create(req.body.form, function (err, order) {
      if (err) {
          res.writeHead(500);
          res.end("DB error" + err)
        } else {
          console.log(req.body);
          console.log(order);
          fs.writeFile('./public/images/stickers/' + order._id + '.png',
            new Buffer(req.body.sticker.replace(/^data:image\/\w+;base64,/, ""), 'base64'), function (err) {
              if (err) throw err;
              console.log('It\'s saved!');}
              );
          res.writeHead(200);
          res.end(JSON.stringify(order));
        }
    });
  });

  app.get('/order', function (req, res) {
    Order.find({'username': req.user.local.username }).exec(function (err, result) {
      if (err) {
        res.writeHead(500);
        res.end("DB error" + err);
      } else {
        console.log(JSON.stringify(result))
        res.end(JSON.stringify(result));
      }
    })
  });

  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });

};