const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6 &&
    planet["koi_teq"] > 32 &&
    planet["koi_teq"] < 225
    // 221
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(parse({ comment: "#", columns: true }))
  .on("data", (chunk) => {
    if (isHabitable(chunk)) habitablePlanets.push(chunk);
  })
  .on("error", console.log)
  .on("end", () => {
    console.log("..............................................");
    console.log("scanning complete");
    console.log("..............................................");
    console.log(`${habitablePlanets.length} potential habitable planets found!`);
    console.log(
      habitablePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
  });
