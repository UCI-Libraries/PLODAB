
// var subjects, technique, materials, locations;
var dataSets = {};

(function(){

  // dataSets.timeline = [];
  //
  // dataSets.subjects = [];
  //
  // dataSets.techniques = [];
  //
  // dataSets.materials = [];
  //
  // dataSets.place_of_publication = [];

  // dataSets.colors = {
  //   // "subjects": "rgb(47, 109, 154)",
  //   "techniques": "rgb(0, 104, 147)",
  //   "materials": "rgb(227, 232, 122)",
  //   "subjects": "rgb(243, 111, 35)",
  //   "placeofpublication": "rgb(104, 228, 175)",
  //   "background_color": "rgb(238,242,245)",
  //   "text_color": "rbg(92,86,112)"
  // };
  dataSets.selectedKeys = [];

    dataSets.colors = {
      "subjects": "rgb(118,147,181)",
      "techniques": "rgb(78,184,185)",
      "materials": "rgb(115,214,154)",
      "place_of_publication": "rgb(204,231,116)",
      "background_color": "rgb(238,242,245)",
      "text_color": "rgb(238,242,245)"
    };

    // http://tristen.ca/hcl-picker/#/hlc/4/0.93/7693B5/CCE774

    dataSets.artifacts = [
      { name: "Alphabet tricks",
      publisher: "Scantron Press",
      typeOfWork: "Artist's Book",
      collection: "UCI Libraries. Department of Special Collections and Archives",
      publicationDate: "2000",
      description: 'An alphabet book of sexist language about women. Book consists of 15 printed cards which slide into transparent paper sleeves (bound in accordion fold format) silkscreened with illustrations. Special scalloped magnifying glass attached to front cover. Edition limited to 120 copies, signed and numbered by the artist. "This book was hand-set in Weiss Roman, Weiss Italic, and wooden type. The cards were printed on Stonehenge and the images were silkscreened on Kozo paper"--Colophon. In slipcase, as issued.',
      shape: "rect",
      height: 300,
      width: 750,
      level: "top",
      size: 90,
      children:
        [{name: "Authors",
        size: 60,
        shape: "rect",
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {name: "Jacobs, Diane (Diane E.), 1966-",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last", size: 50}]},
        {name: "Place of Publication",
        size: 60,
        shape: "rect",
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {name: "Portland, OR",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last", size: 50}]},
        {name: "Materials",
        size: 60,
        shape: "rect",
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {name: "Paper",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last",
          size: 50}]},
        {name: "Subjects",
        size: 60,
        shape: "rect",
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {name: "Women",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last",
          size: 50},
          {name: "Alphabet in art",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last",
          size: 50},
          {name: "Sexism in language",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last",
          size: 50}
        ]},
        {name: "Techniques",
        size: 60,
        shape: "rect",
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {name: "Accordion",
          shape: "rect",
          height: 50,
          width: 100,
          level: "last",
          size: 50}]}
        ]
      }
    ];



    // TODO: export to module accessible by dummy chart (angular uses dependency injection)

})();
