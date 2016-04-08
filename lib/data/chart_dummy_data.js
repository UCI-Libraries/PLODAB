
// var subjects, technique, materials, locations;
var dataSets = {};

(function(){

  dataSets.timeline = [];

  dataSets.dummy_timeline = [
    {year: "1955",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      },
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1956",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      },
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      },
    book3:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1957",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1958",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1959",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1960",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1961"
    },
    {year: "1962",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1963",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "true"
      }
    },
    {year: "1964",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1965",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1966",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1967"
    },
    {year: "1968",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "true"
    },
    book3:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1969",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1970",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1971"
    },
    {year: "1972",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1973"
    },
    {year: "1974",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
    },
    book3:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "true"
    },
    book4:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
    },
    book5:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1975"
    },
    {year: "1976",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"}
    },
    {year: "1977",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1978",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"}
    },
    {year: "1979",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1980",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"},
    book2:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "true"
    },
    book3:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
      selected: "false"
      }
    },
    {year: "1981",
    book1:
      {name: "Are you a boy or a girl? conversations about gender in elementary classrooms",
      img: "",
      key: "",
    selected: "false"}
    }];

  dataSets.dummysubjects = [
          {topic: "Subjects", name: "Feminism", count: 12},
          {topic: "Subjects", name: "Emigration and Immigration", count: 5},
          {topic: "Subjects", name: "Latin America", count: 10},
          {topic: "Subjects", name: "Identity", count: 10},
          {topic: "Subjects", name: "Gender Studies", count: 8},
          {topic: "Subjects", name: "Public Opinion", count: 1},
          {topic: "Subjects", name: "Music in Art", count: 3},
          {topic: "Subjects", name: "Race in America", count: 2},
  ];

  dataSets.subjects = [];

  dataSets.techniques = [
          {topic: "Techniques", name: "Digital Imaging", count: 20},
          {topic: "Techniques", name: "Screen Printing", count: 5},
          {topic: "Techniques", name: "Relief", count: 1},
          {topic: "Techniques", name: "Xerography", count: 3},
          {topic: "Techniques", name: "Intaglio", count: 3},
          {topic: "Techniques", name: "Illustration", count: 3},
          {topic: "Techniques", name: "Letterpress", count: 3}
  ];

  dataSets.materials = [
          {topic: "Materials", name: "Rice Paper", count: 10},
          {topic: "Materials", name: "Cloth", count: 2},
          {topic: "Materials", name: "Found Objects", count: 4},
          {topic: "Materials", name: "Cardboard", count: 5},
          {topic: "Materials", name: "Paper", count: 12}
  ];

  dataSets.bindings = [
          {name: "Accordion", count: 5},
          {name: "Codex", count: 39},
          {name: "Scroll", count: 1},
          {name: "Pop-up Book", count: 1},
          {name: "Other", count: 5}
  ];

  dataSets.place_of_publication = [];

  dataSets.dummy_place_of_publication = [
          {topic: "Place of Publication", name: "Fort Lauderdale, FL", count: 1},
          {topic: "Place of Publication", name: "Los Angeles, CA", count: 1},
          {topic: "Place of Publication", name: "Santa Cruz, CA", count: 1},
          {topic: "Place of Publication", name: "Burlington, VT", count: 1},
          {topic: "Place of Publication", name: "Rosendale, NY", count: 1},
          {topic: "Place of Publication", name: "Mexico, DF", count: 1},
          {topic: "Place of Publication", name: "Illinois", count: 1},
          {topic: "Place of Publication", name: "Brooklyn, NY", count: 1},
          {topic: "Place of Publication", name: "New Haven, CT", count: 1},
          {topic: "Place of Publication", name: "Washington D.C.", count: 1},
          {topic: "Place of Publication", name: "Pittsburgh, PA", count: 1},
          {topic: "Place of Publication", name: "Wilmington, DE", count: 1},
          {topic: "Place of Publication", name: "El Cerrito, CA", count: 1},
          {topic: "Place of Publication", name: "North Bay, ON", count: 1},
          {topic: "Place of Publication", name: "CA", count: 1}
    ];

    // dataSets.colors = {
    //   // "subjects": "rgb(47, 109, 154)",
    //   "techniques": "rgb(0, 104, 147)",
    //   "materials": "rgb(227, 232, 122)",
    //   "subjects": "rgb(243, 111, 35)",
    //   "placeofpublication": "rgb(104, 228, 175)",
    //   "background_color": "rgb(238,242,245)",
    //   "text_color": "rbg(92,86,112)"
    // };

    dataSets.colors = {
      "subjects": "rgb(118,147,181)",
      "techniques": "rgb(78,184,185)",
      "materials": "rgb(115,214,154)",
      "placeofpublication": "rgb(204,231,116)",
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
