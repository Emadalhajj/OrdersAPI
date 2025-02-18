// import './App.css';

// function App() {
//   return (
//    <>
//    test
//    </>
//   )
// }

// export default App;
const fs = require("fs")

fs.writeFileSync("data01" , "eng.emad")

fs.appendFileSync("data01","taleen")
console.log(fs.readFileSync("data01").toString());
