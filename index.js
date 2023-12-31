const core = require("@actions/core");
const initializeApp = require("firebase/app").initializeApp;
const { getFirestore, getDoc, doc } = require('firebase/firestore/lite');


// most @actions toolkit packages have async methods
async function run() {
  const firebaseConfig = {
    apiKey: core.getInput("apiKey"),
    authDomain: core.getInput("authDomain"),
    projectId: core.getInput("projectId"),
    appId: core.getInput("appId")
  };

  let app;
  try {
    app = initializeApp(firebaseConfig);
    console.log("app initialized")
  } catch (error) {
    console.log(error);
    console.log("cannot initialize app")
  }

  const db = getFirestore(app);

  console.log("Used collection name " + core.getInput("collectionName"));
  console.log("Used doc name " + core.getInput("docName"));

  const docValueSnapshot = await getDoc(doc(db, core.getInput("collectionName"), core.getInput("docName")));
  const docValue = docValueSnapshot.data()
  console.log("Received data: " + JSON.stringify(docValue));
  core.setOutput("firestoreValue", JSON.stringify(docValue))
}

run();
