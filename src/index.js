const express = require("express");
const app = express();

app.use(express.json());
let port = 3000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`server is running on port ${port}`);
  } else {
    console.log("some error encountered");
  }
});
