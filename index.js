// include libraries
const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");

// delcares schema of converted json file
const schema = {
  shop_code: {
    prop: "shopCode",
    type: String,
  },
  des_id: {
    prop: "desID",
    type: String,
  },
  description: {
    prop: "description",
    type: String,
  },
  vintage: {
    prop: "vintage",
    type: String,
  },
  rating: {
    prop: "rating",
    type: Number,
  },
  flavour_x: {
    prop: "flavourX",
    type: Number,
  },
  flavour_y: {
    prop: "flavourY",
    type: Number,
  },
  rgb: {
    prop: "rgb",
    type: String,
  },
  wine_type: {
    prop: "wineType",
    type: String,
  },
  foodpair0: {
    prop: "foodpair0",
    type: String,
  },
  foodpair1: {
    prop: "foodpair1",
    type: String,
  },
  foodpair2: {
    prop: "foodpair2",
    type: String,
  },
  foodpair3: {
    prop: "foodpair3",
    type: String,
  },
  foodpair4: {
    prop: "foodpair4",
    type: String,
  },
  foodpair5: {
    prop: "foodpair5",
    type: String,
  },
  foodpair6: {
    prop: "foodpair6",
    type: String,
  },
  collection: {
    prop: "collection",
    type: String,
  },
  subcollection: {
    prop: "subcollection",
    type: String,
  },
  region: {
    prop: "region",
    type: String,
  },
  subregion: {
    prop: "subregion",
    type: String,
  },
  occasion: {
    prop: "occasion",
    type: String,
  },
  ribbon: {
    prop: "ribbon",
    type: String,
  },
  alternative_wine: {
    prop: "alternativeWine",
    type: String,
  },
  vinvalue: {
    prop: "vinValue",
    type: Number,
  },
  color: {
    prop: "color",
    type: String,
  },
  tastingnote: {
    prop: "tastingNote",
    type: String,
  },
  price_sale: {
    prop: "priceSale",
    type: Number,
  },
  vinvaluestore: {
    prop: "vinValueStore",
    type: String,
  },
  pricecompstore: {
    prop: "priceCompStore",
    type: String,
  },
  ratingcompstore: {
    prop: "ratingCompStore",
    type: String,
  },
  flag_onsale: {
    prop: "flagOnSale",
    type: Number,
  },
  flavour_profile: {
    prop: "flavourProfile",
    type: String,
  },
  flavour_description: {
    prop: "flavourDescription",
    type: String,
  },
  flavour_taste1: {
    prop: "flavourTaste1",
    type: String,
  },
  flavour_taste2: {
    prop: "flavourTaste2",
    type: String,
  },
  expand_palate: {
    prop: "expandPalate",
    type: String,
  },
};

// database fields explanation
const fields = [
  {
    name: "shopCode",
    explanation:
      "The tag that says the store name. When people search for wines, we want to only return wines at the right store.",
  },
  {
    name: "desID",
    explanation: "This is the unique product identifier.",
  },
  {
    name: "vintage",
    explanation:
      "This is the unique wine year. All data is at the name and year level. So Tyrrells Vat 1 Semillon 2013 should be viewed independently from Tyrrells Vat 1 Semillon 2017.",
  },
  {
    name: "rating",
    explanation: "This is the 'score' that the wine received.",
  },
  {
    name: "flavourX",
    explanation:
      "This metric shows how sweet or dry a wine is. Positive values mean the wine is dry. Negative values mean the wine is sweet.",
  },
  {
    name: "flavourY",
    explanation:
      "This metric shows how light or bold a wine is. Positive values mean the wine is bold. Negative values mean the wine is light.",
  },
  {
    name: "rgb",
    explanation: "This value shows the approximate colour of the wine.",
  },
  {
    name: "wineType",
    explanation: "This value tells what type of wine it is at a high level.",
  },
  {
    name: "foodpair",
    explanation: "This value tells what food goes well with the wine.",
  },
  {
    name: "collection",
    explanation:
      "This value gives a high level categorisation of the wine type.",
  },
  {
    name: "subCollection",
    explanation:
      "This value gives a lower level categorisation of the wine type.",
  },
  {
    name: "region",
    explanation: "This value gives the region that the wine is from.",
  },
  {
    name: "subregion",
    explanation: "This value gives the subregion that the wine is from.",
  },
  {
    name: "occasion",
    explanation:
      "This value gives an example of an occasion to drink a wine. For example, if someone wants a celebration wine, they would use this field to search.",
  },
  {
    name: "ribbon",
    explanation:
      "This value says if the wine is listed as a 'best value' or 'best quality' wine",
  },
  {
    name: "alternativeWine",
    explanation: "This value gives other wines to try that are similar to it.",
  },
  {
    name: "vinvalue",
    explanation:
      "This value is a metric that compares how good the wine scored (rating) based on its price",
  },
  {
    name: "tastingNote",
    explanation:
      "This value describes some of the wine flavour in text. This should be the top priority descriptor.",
  },
  {
    name: "priceSale",
    explanation: "This value gives the price of the wine.",
  },
  {
    name: "vinValueStore",
    explanation:
      "This value ranks how good the wine scored in 'VinValue' compared to other wines at that store.",
  },
  {
    name: "priceCompStore",
    explanation:
      "This value ranks how good the wine scored in 'Price' compared to other wines at that store.",
  },
  {
    name: "ratingCompStore",
    explanation:
      "This value ranks how good the wine scored in 'Rating' compared to other wines at that store.",
  },
  {
    name: "flagOnsale",
    explanation: "This value indicates whether the wine is on sale currently.",
  },
  {
    name: "flavourProfile",
    explanation:
      "This value describes some of the wine flavour in text. This should be the third priority descriptor.",
  },
  {
    name: "flavourDescription",
    explanation:
      "This value describes some of the wine flavour in text. This should be the second priority descriptor.",
  },
  {
    name: "flavourTaste1",
    explanation:
      "This value describes some of the wine flavour in text. This should be the 4th priority descriptor.",
  },
  {
    name: "flavourTaste2",
    explanation:
      "This value describes some of the wine flavour in text. This should be the 5th priority descriptor.",
  },
];

// read excel file & prepare dataset
readXlsxFile("./given.xlsx", { schema }).then(({ rows, errors }) => {
  const dataset = [];

  // Question & Answer form of prompt / completion which defines fields
  fields.forEach((field) =>
    dataset.push({
      prompt: `What is ${field.name}?`,
      completion: field.explanation,
    })
  );

  // prompt as possible customer requirement, completion as wine name reply
  rows.forEach((row) => {
    const prompt = `The wine has vintage year of ${row.vintage}. It has ${
      row.raiting > 90 ? "high" : "normal"
    } rating. It is kind of ${row.flavourX > 0 ? "dry" : "sweet"} ${
      row.flavourY > 0 ? "bold" : "light"
    } wine. It has ${
      row.rgb > "#999999" ? "bright" : "dark"
    } color. Type of wine is ${row.wineType}. Foods go well with this wine is ${
      row.foodpair1
    }, ${row.foodpair2}, ${row.foodpair3}, ${row.foodpair4} and ${
      row.foodpair5
    }. Its foodpair in detail is "${
      row.foodpair0
    }". Its high level categorisation of this wine type is ${row.collection.split(
      "|"
    )}. Simply this belongs to ${row.subcollection} wine. ${
      row.region !== undefined
        ? "It comes from " + row.subregion + " in " + row.region + "."
        : "The region it comes from is not specified."
    } ${
      row.occasion !== undefined
        ? ' People can drink this wine on the occasion of "' +
          row.occasion.split("|").filter((value) => value !== "") +
          '".'
        : ""
    }${
      row.ribbon !== undefined
        ? " This wine is listed as " + row.ribbon + "."
        : " "
    }${
      row.alternativeWine !== undefined
        ? row.alternativeWine + " Wine can be used instead of this wine."
        : ""
    } This wine is ${
      row.vinvalue < 0 ? "not " : ""
    }scored as good based on its price. It shows ${row.color.toLowerCase()} color. Its tasting note is "${
      row.tastingNote
    }". It costs ${row.priceSale}$. It is scored as ${
      row.vinValueStore > 0.5 ? "better" : "worse"
    } than others based on price. It costs ${
      row.priceCompStore < 0.5 ? "more expensive" : "cheaper"
    } than average price. It has ${
      row.raitingCompStore > 0.5 ? "better" : "worse"
    } rating than normal ones. It is currently${
      row.flagOnSale === 1 ? "" : "not"
    } on sale. Flavour description of this wine is "${
      row.flavourDescription
    }. It tastes like ${row.flavourTaste1} and ${row.flavourTaste2}. "`;

    const completion = `Wine Name: ${row.description} ${
      row.vintage
    }. It costs ${row.priceSale}$. Its color is ${row.color}. It is rated as ${
      row.rating
    }. ${
      row.ribbon !== undefined ? "It is listed as " + row.ribbon + ". " : ""
    }des_id is ${row.desID}.`;

    dataset.push({ prompt, completion });
  });

  rows.forEach((row) => {
    const prompt = `Exact information of ${row.description} ${row.vintage}.`;
    let completion = "";
    Object.keys(row).forEach(
      (key) => (completion += key + " is " + row[key] + ". ")
    );

    dataset.push({ prompt, completion });
  });

  dataset.forEach((data) => {
    const writeData = JSON.stringify(data) + "\n";
    try {
      fs.appendFileSync(
        "wineinfo.jsonl",
        JSON.stringify(data) + "\n",
        (err) => {
          if (err) throw err;
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
});
