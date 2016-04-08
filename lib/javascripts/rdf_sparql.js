/**
 * rdflib.js with node.js -- basic SPARQL example.
 * @author ckristo
 */
 console.log("in here");

// var $rdf = require('rdflib');

// - create an empty store
var kb = new $rdf.IndexedFormula();

// - load remote RDF document
var fetch = $rdf.fetcher(kb, 1000);
fetch.nowOrWhenFetched('http://dig.csail.mit.edu/2008/webdav/timbl/foaf.rdf', undefined, function(ok) {
    if (!ok) { /* error handling */ }

    var sparqlQuery = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/> \
                       SELECT ?person ?name \
                       WHERE { \
                         <http://www.w3.org/People/Berners-Lee/card#i> foaf:knows ?person . \
                         OPTIONAL { ?person foaf:name ?name . } \
                       }';

    // - create query instance from SPARQL query string
    var query = $rdf.SPARQLToQuery(sparqlQuery, true /* disables resource fetching */, kb);
    // NOTE: we disable resource fetching here to overcome a bug, see
    // https://github.com/linkeddata/rdflib.js/issues/70

    kb.fetcher = null; /* disables resource fetching */
    // NOTE: rdflib.js will fetch all resources by default it seems
    // which will issue errors when a resource cannot be parsed

    // - execute SPARQL query and obtain result set
    kb.query(query, function(result) {
        var name = (result['?name']) ? result['?name'].value : '?';
        var person = result['?person'].value;
        console.log(name + " <" + person + ">");
    });

});
