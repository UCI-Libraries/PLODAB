
var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var VRA = $rdf.Namespace("http://purl.org/vra/");
var RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
// var FOAF = Namespace("http://xmlns.com/foaf/0.1/");
// var XSD = Namespace("http://www.w3.org/2001/XMLSchema#");


var filePath = "/lib/data/2016.03.14_RDF_COMPLETE_MM_v2.xml";
var uri = "";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    theNewFunction(xhttp);
    }
};
xhttp.open("GET", filePath, true);
xhttp.send();

function theNewFunction(xml) {
  var body = xml.responseText;
  var mimeType = 'application/rdf+xml';
  var store = $rdf.graph();

  try {
      $rdf.parse(body, store, uri, mimeType);
  } catch (err) {
      // console.log(err);
  }

  // console.log(store);

  var books = store.statementsMatching(undefined, undefined, VRA("CreativeWork"));
  // console.log(books);
  for (var i=0; i < books.length; i++) {
      book = books[i];
      // console.log(book);
      // console.log(book.subject.uri);
  }

  var resource = store.each(undefined, VRA("name"), undefined);
  // console.log(resource);

}
