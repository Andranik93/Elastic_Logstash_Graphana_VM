const elasticsearch = require('elasticsearch');
const express = require( 'express' );
const bodyParser = require('body-parser')
const path = require( 'path' );

const client = new elasticsearch.Client({
   hosts: [ 'http://192.168.36.136:9200/'] //192.168.36.136:9200
});

const app = express();

client.ping({
     requestTimeout: 30000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });

 
app.use(bodyParser.json())
app.set( 'port', process.env.PORT || 3001 );
app.use( express.static( path.join( __dirname, 'public' )));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile('template.html', {
     root: path.join( __dirname, 'views' )
   });
})

app.get('/v2', function(req, res){
  res.sendFile('template2.html', {
     root: path.join( __dirname, 'views' )
   });
})

app.get('/search', function (req, res){
  
  let body = {
    size: 200,
    from: 0, 
    query: {
      match: {
          name: req.query['q']
      }
    }
  }

  client.search({index:'scotch.io-tutorial',  body:body, type:'cities_list'})
  .then(results => {
    res.send(results.hits.hits);
  })
  .catch(err=>{
    console.log(err)
    res.send([]);
  });
  
})


app .listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );
