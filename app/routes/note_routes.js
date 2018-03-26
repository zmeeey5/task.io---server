module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;
  var notesCollection = db.collection('notes');

  app.post('/api/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };

    notesCollection.insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    notesCollection.findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.get('/api/notes', (req, res) => {
    notesCollection.find({}).toArray(function (err, result) {
      if(err){
        res.send({'error':'An error has occurred'});
      } else{
        res.send(JSON.stringify(result));
      }
    });
  });

  app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
  
    notesCollection.update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });

  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    notesCollection.remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

};
