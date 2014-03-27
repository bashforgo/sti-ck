var Order = require('./models/order');
var fs    = require('fs');

module.exports = function(app, passport) {

  //node routes

  app.post('/signinup', passport.authenticate('local-signin-up',{
    //success: redirect to /0 (as in error = false)
    //fail: redirect to /1
    successRedirect : '/0',
    failureRedirect : '/1'}));

  //everything seems good, send user
  app.get('/0', function (req, res) {
    res.writeHead(200);
    res.end(JSON.stringify(req.user));
  });

  //send unauthorized header
  app.get('/1', function (req, res) {
    res.writeHead(401);
    res.end("1");
  });

  //check sign in, if yes send username
  app.get('/issignedin', function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/0');
    } else {
      res.redirect('/1');
    }
  });

  //sign out
  app.get('/signout', function (req, res) {
    res.redirect('/');
    req.logout();
  });

  //image upload
  app.post('/image', function (req, res) {
    res.writeHead(200);
    res.end(req.files.image.path);
  });

  //save order ro db
  app.post('/order', function (req, res) {
    Order.create(req.body.form, function (err, order) {
      if (err) {
          res.writeHead(500);
          res.end("DB error" + err)
        } else {
          //create new file from base64 png image; name it based on order id
          fs.writeFile('./public/images/stickers/' + order._id + '.png',
            new Buffer(req.body.sticker.replace(/^data:image\/\w+;base64,/, ""), 'base64'), function (err) {
              if (err) throw err});
          res.writeHead(200);
          res.end(JSON.stringify(order));
        }
    });
  });

  //send orders
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

  //everything else: send index
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });

};