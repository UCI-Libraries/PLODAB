var dataSets = {};

(function(){
    dataSets.selectedKeys = [];

    // http://tristen.ca/hcl-picker/#/hlc/4/0.93/7693B5/CCE774

    dataSets.artifacts = [
      { nodeName: "Alphabet tricks",
      publisher: "Scantron Press",
      typeOfWork: "Artist's Book",
      collection: "UCI Libraries. Department of Special Collections and Archives",
      dateCreated: "2000",
      description: 'An alphabet book of sexist language about women. Book consists of 15 printed cards which slide into transparent paper sleeves (bound in accordion fold format) silkscreened with illustrations. Special scalloped magnifying glass attached to front cover. Edition limited to 120 copies, signed and numbered by the artist. "This book was hand-set in Weiss Roman, Weiss Italic, and wooden type. The cards were printed on Stonehenge and the images were silkscreened on Kozo paper"--Colophon. In slipcase, as issued.',

      height: 300,
      width: 750,
      level: "top",
      size: 90,
      children:
        [{nodeName: "Authors",
        size: 60,
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {nodeName: "Jacobs, Diane (Diane E.), 1966-",
          height: 50,
          width: 100,
          level: "last", size: 50}]},
        {nodeName: "Place of Publication",
        size: 60,
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {nodeName: "Portland, OR",
          height: 50,
          width: 100,
          level: "last", size: 50}]},
        {nodeName: "Materials",
        size: 60,
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {nodeName: "Paper",
          height: 50,
          width: 100,
          level: "last",
          size: 50}]},
        {nodeName: "Subjects",
        size: 60,
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {nodeName: "Women",
          height: 50,
          width: 100,
          level: "last",
          size: 50},
          {nodeName: "Alphabet in art",
          height: 50,
          width: 100,
          level: "last",
          size: 50},
          {nodeName: "Sexism in language",
          height: 50,
          width: 100,
          level: "last",
          size: 50}
        ]},
        {nodeName: "Techniques",
        size: 60,
        height: 100,
        width: 100,
        level: "mid",
        children: [
          {nodeName: "Accordion",
          height: 50,
          width: 100,
          level: "last",
          size: 50}]}
        ]
      }
    ];
})();
