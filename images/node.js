const request = require("request");
const fs = require("fs");
const imgs = require("./ntsc-u.json");

var recursiveDownload = function (urlArray, nameArray, i) {
  if (i < urlArray.length) {
    if (urlArray[i]) {
      request
        .get(urlArray[i])
        .on("error", function (err) {
          console.log(err);
        })
        .pipe(fs.createWriteStream(nameArray[i]))
        .on("close", function () {
          recursiveDownload(urlArray, nameArray, i + 1);
        });
    }
  }
};
const imgsToGet = imgs.filter((a) => a.cover).map((a) => a.cover);
console.log(imgsToGet.length);
recursiveDownload(
  imgsToGet,
  imgsToGet.map((a) => a.split("/")[a.split("/").length - 1]),
  0
);
