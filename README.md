# Pilot Project for Linked Open Data for Artists' Books (PLODAB)

Source code for a grant funded project to connect scholars to artists' book through the use of linked open data (LOD).

The data visualization tool uses metadata in an RDF/XML format from the special collections of the library at the University of California, Irvine. The PLODAB tool is built using [D3.js](https://d3js.org/), [AngularJS](https://angularjs.org/), and [rdflib.js](https://github.com/linkeddata/rdflib.js/).

Rdflib parses the RDF/XML data using an angular service, and returns it to three interactive charts, encapsulated into custom directives. These three charts work together to give a hierarchically described tool for exploration of the subjects, materials, techniques, and places of publication within the metadata.

Base RDF/XML linked data file is available here: [2016.04.05_RDF_COMPLETE.xml](../master/lib/data/2016.04.05_RDF_COMPLETE.xml) 

---
Prerequisites
====
[node.js](https://nodejs.org/en/download/) - Linux/Mac OS X/Windows
  * Install via package manager (apt-get, yum, Homebrew) _(recommended)_
  * Build from source
  * Install via Binary or Installer package

_For Mac OS X:_ node.js requires [Xcode](https://developer.apple.com/xcode/)

_For Windows:_ if building from source, you may need to specify which version of Microsoft Visual Studio you have installed to get native dependencies to build correctly

Installation
====

1. Install node.js (above)
2. Clone or download/unzip codebase
3. In terminal, navigate to root directory of codebase and use command `http-server` to serve files
4. Port defaults to 8080. To change, run `http-server -p XXXX` where `XXXX` is the port # you wish to use

Configuration Files
====

* _/lib/data_ -- put RDF/XML data file(s) here
  * Update name/path of RDF/XML data file in _/lib/javascripts/angular/services/data_services.js_
* _/lib/javascripts/angular/directives/_ -- files governing UI of chart components
* _/lib/javascripts/angular/services/_ -- files governing data parsing for bubbles, tree diagram, timeline & artifact
* _/lib/javascripts/charts_ -- files governing look & functionality of bubbles, tree diagram, timeline & artifact

Contact
====
[UCI Libraries' Digital Scholarship Services](mailto:libdss@uci.edu)

Contributors
====
![Claire Woods](https://avatars.githubusercontent.com/adynata?s=100)<br>[Claire Woods](https://github.com/adynata/): [Code](https://github.com/UCI-Libraries/PLODAB/commits?author=adynata) & Design

License
====
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
* This project utilizes libraries which may or may not have additional individual licenses
