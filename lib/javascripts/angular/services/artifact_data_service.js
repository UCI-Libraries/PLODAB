(function() {
  angular.module('plodab')
    .service('artifactDataService', function() {

    this.getArtifactData = function(callback, data) {
      var artifactStore = {};
      var agentsStore = {};
      var imgArkStore = {
        "ark:/87280/t0qn64nc":	"3e7f91025c3bb908646f21c01a7567d6",
        "ark:/87280/t08g8hmg":	"c4f40edd63f04547ded92a51c7fc83c0",
        "ark:/87280/t06q1v5x":	"1b62ca101108e3efeff51ebe4bc03967",
        "ark:/87280/t03x84kd":	"d556851767e60d9a2bde21660ad9e7c4",
        "ark:/87280/t0h41pb1":	"3be056026ffe30f42b0175d503d92664",
        "ark:/87280/t0jw8bs8":	"c8de33370e1c6d2357fe30dee57c2def",
        "ark:/87280/t0000019":	"04f6e610355af880d00e3d27ae32cc4d",
        "ark:/87280/t04q7rwr":	"00adaa5af2d066d8cea6232431451db4",
        "ark:/87280/t0mw2f2f":	"919265740e2b0d2277b768a4da2c3a1f",
        "ark:/87280/t0h12zx9":	"5c0fac5864f6a2d3b248d4970be0fd61",
        "ark:/87280/t0kw5cxn":	"014fce19224b4e7662c3bfeda77afdf4",
        "ark:/87280/t07h1ggn":	"e1528404fd512c5d793834b68649be49",
        "ark:/87280/t09g5jrv":	"35643e6fc97567ac5d003999e447c7c1",
        "ark:/87280/t0x63jtt":	"32cb737f0c123af7924c2898d52ad6e9",
        "ark:/87280/t03r0qrx":	"3263bb63c9858430f8bd52a96e6622fe",
        "ark:/87280/t0d798b6":	"9575551d5e04f72fa8ac2fe363a8f746",
        "ark:/87280/t0z60kz6":	"b38e44ddb3035ef7f7350a46bab758e2",
        "ark:/87280/t0pn93h0":	"84bf2eab71f32fa8f21fa909dff3c483",
        "ark:/87280/t0rf5rzq":	"de10b9ffe11a9dafe3ad309f00a092a0",
        "ark:/87280/t05q4t1j":	"2a6521a779224b2d92d168c465afef45",
        "ark:/87280/t0td9v7b":	"3c6e298e4622f24fae637848374b00bf",
        "ark:/87280/t0wd3xh3":	"1a3a5713a760f2d0620abb8f49aafaa8",
        "ark:/87280/t0v985zc":	"549ba809cbcafba8f0d95d3497ba5395",
        "ark:/87280/t0w66hpf":	"76403f9a39dbb5686d57f84df3ba3574",
        "ark:/87280/t0c8276c":	"cc244dcc6b7e9c847336306df5fde2f0",
        "ark:/87280/t0rn35sr":	"58498d5dc118a6da893d13096580bd3c",
        "ark:/87280/t0bg2kw7":	"a948e7b7d597051b4f671068e5e5f31d",
        "ark:/87280/t00z715t":	"597bac08745df14c6356cbf92d7d59c7",
        "ark:/87280/t0j1012g":	"45fffff47fa9769d5e155a85cb3be6a1",
        "ark:/87280/t01z4296":	"66eaeac0d6aa29ad3cecc45740037ddb",
        "ark:/87280/t0sf2t3h":	"92e7919b71307cea5f8c597751e51dd7",
        "ark:/87280/t0cc0xm9":	"3ebcb7192b0ad34562f865b9f402e06e",
        "ark:/87280/t0f769gk":	"19662ad7863ffbdda69de5dbfdb3817b",
        "ark:/87280/t0154f0s":	"e9aff3c4fa149356f1a22413ec9a26a7",
        "ark:/87280/t0057cv0":	"0cbdebdfe8f5710c888555ab1da82179",
        "ark:/87280/t0vd6wcq":	"22942337bed42c664d182fa4cd7b3b07",
        "ark:/87280/t07p8w9r":	"42bc5175d5dd1285b904708e4dd6b37d",
        "ark:/87280/t0np22c5":	"c180c423db93def0d0fac0669ba42702",
        "ark:/87280/t0ms3qnq":	"5ba088d3cd0e93f841097eacd502bc36",
        "ark:/87280/t0g44n6n":	"98077ddfa416ce11d48ada332c5f9bec",
        "ark:/87280/t02z13fk":	"92a8aeb110ea606f057dc581a7662372"
      };

      var calisphereUriPath = "https://thumbnails.calisphere.org/clip/250x250/";

      var promise = new Promise(
        function(resolve, reject) {
          makeArtifactData(data);
          resolve(artifactStore);
        }
      );
      callback(promise);


      function makeArtifactData(data) {
        var keys = Object.keys(data);
        keys.forEach( function(key) {
          artifactStore[key] = {};
          artifactStore[key].key = key;
          artifactStore[key].artifactKey = data[key].artifactKey;
          artifactStore[key].collection = "UCI Libraries. Department of Special Collections and Archives";
          artifactStore[key].dateCreated = data[key].dateCreated;
          artifactStore[key].description = data[key].descriptions[0];
          artifactStore[key].nodeName = parseTitle(data[key]);
          artifactStore[key].typeOfWork = "typeofwork";
          artifactStore[key].imageURI = calisphereUriPath + imgArkStore[data[key].imageURI];
          artifactStore[key].height = 300;
          artifactStore[key].width = 750;
          artifactStore[key].level = "top";
          artifactStore[key].size = 90;
          artifactStore[key].children =
            [{ nodeName: "Authors",
              size: 60,
              height: 100,
              width: 100,
              level: "mid",
              children: sourceAgents(data[key])
            },
            { nodeName: "Subjects",
              size: 60,
              height: 100,
              width: 100,
              level: "mid",
              children: sourceSubjects(data[key])
            },
            { nodeName: "Materials",
              size: 60,
              height: 100,
              width: 100,
              level: "mid",
              children: sourceMaterials(data[key])
            },
            { nodeName: "Techniques",
              size: 60,
              height: 100,
              width: 100,
              level: "mid",
              children: sourceTechniques(data[key])
            },
            { nodeName: "Place of Publication",
              size: 60,
              height: 100,
              width: 100,
              level: "mid",
              children: sourcePlaceofPublication(data[key])
            }];
        });
      }

      function parseTitle(book) {
        return book.titles[0];
      }

      function parseRoles(agentTypes) {
        var roleArr = [];
        agentTypes.forEach( function(role) {
          if (role.length > 0) {
            if (role === "artists (visual artists)") {
              roleArr.push("artist");
            } else if (role === "printers (people)") {
              roleArr.push("printer");
            } else if (role === "activists") {
              roleArr.push(role);
            } else if (role[role.length - 1] === "s") {
              roleArr.push(role.slice(0,role.length-1));
            } else {
              roleArr.push(role);
            }
          }
        });
        var rolePhrase = roleArr.join(', ');
        return rolePhrase;
      }

      function sourceAgents(book) {
        var agentsArr = [];
        var keys = Object.keys(book.agents);
        keys.forEach(function(key) {
          var roles = parseRoles(book.agents[key].agentType);
          var name = book.agents[key].agent;
          var agentObj = {
            nodeName: name,
            role: roles,
            height: 50,
            width: 100,
            level: "last",
            siblingCount: keys.length,
            siblingOrder: agentsArr.length + 1};
          agentsArr.push(agentObj);
          if (agentsStore[name]) {
            agentsStore[name].count = agentsStore[name].count + 1;
          } else {
            agentsStore[name] = agentObj;
            agentsStore[name].count = 1;
          }
        });
        return agentsArr;
      }

      function sourceMaterials(book) {
        materialsArr = [];
        book.materials.forEach( function(material) {
          var materialObj = {
            nodeName: material,
            height: 50,
            width: 100,
            level: "last",
            siblingCount: book.materials.length,
            siblingOrder: materialsArr.length + 1};
          materialsArr.push(materialObj);
        });
        return materialsArr;
      }

      function sourcePlaceofPublication(book) {
        placeOfPublicationArr = [];
        book.place_of_publication.forEach( function(placeOfPublication) {
          var placeOfPublicationObj = {
            nodeName: placeOfPublication,
            height: 50,
            width: 100,
            level: "last",
            siblingCount: book.place_of_publication.length,
            siblingOrder: placeOfPublicationArr.length + 1};
          placeOfPublicationArr.push(placeOfPublicationObj);
        });
        return placeOfPublicationArr;
      }

      function sourceSubjects(book) {
        subjectsArr = [];
        book.subjects.forEach( function(subj) {
          var subjObj = {
            nodeName: subj,
            height: 50,
            width: 100,
            level: "last",
            siblingCount: book.subjects.length,
            siblingOrder: subjectsArr.length + 1
          };
          subjectsArr.push(subjObj);
        });

        return subjectsArr;
      }

      function sourceTechniques(book) {
        techniquesArr = [];
        book.techniques.forEach( function(technique) {
          var techniquesObj = {
            nodeName: technique,
            height: 50,
            width: 100,
            level: "last",
            siblingCount: book.techniques.length,
            siblingOrder: techniquesArr.length + 1};
          techniquesArr.push(techniquesObj);
        });
        return techniquesArr;
      }

    };

  });


})();
