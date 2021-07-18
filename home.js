let data = [
  "burrito",
  "chutney",
  "fried chicken",
  "hamburger",
  "naan",
  "pasta",
  "pizza",
  "soup",
  "spring rolls",
  "sundae",
];

const renderData = function (recipe, rcpLst) {
  console.log("\nInside renederData()\n");
  console.log(typeof recipe);

  // for (const [k, v] of Object.entries(recipe)) {
  //   console.log("k: ", k, " ", typeof k, ", v", v);
  // }
  console.log(recipe["strMeal"], "  ", recipe["strMealThumb"]);
  // recipe.forEach(function (k, v) {
  //   console.log("k: ", k, ", v", v);
  // });

  var tempDiv = document.createElement("div");

  const ele = `<div class="polaroid" id="${recipe["strMeal"]}">
                  <img src=${recipe["strMealThumb"]} alt="5 Terre" style="width: 100%"
                /></a>
                <div class="container">
                  <p>${recipe["strMeal"]}</p>
                </div>
              </div>`;
  console.log("type of ele: ", typeof ele);

  rcpLst.insertAdjacentHTML("afterbegin", ele);

  const element = document.getElementById(recipe["strMeal"]);

  // element.addEventListener("onClick", function )

  // console.log("func()ed\n", object(ele));
};

const func = function (recipe = "naan") {
  console.log(recipe);
  let rcpLst = document.getElementById("recipeList");

  let ele = document.getElementById(recipe);
  rcpLst.insertAdjacentElement("afterbegin", ele);
  console.log("type of ele: ", typeof ele);
  console.log("func()ed\n", ele);
};

function dat() {
  let input = document.getElementById("search");
  console.log("input value: ", input.value);
  let c = 0;

  // search in the present data
  for (let i = 0; i < data.length; i++) {
    // console.log("Fo  und in the code\n");

    if (String(input.value.trim()) == String(data[i]).trim()) {
      console.log("FOUND");
      c = 1;
      console.log(data[input.value]);
      func(input.value);
      // let newpage = String(input.value) + ".html";
      // window.location.href = newpage;
      break;
    }
  }

  if (c == 0) {
    window.alert("Recipe Not Found, looking thorugh the API now...\n");
    console.log(`www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`);

    const reqRecipe = function () {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value.trim()}`
      )
        .then(function (res) {
          console.log("the raw result\n", res);
          return res.json();
        })
        .then(function (data) {
          const d = data["meals"];
          console.log("\nParsed the json\n");

          // for (const [k, v] of Object.entries(d)) {
          //   console.log("k: ", k, " ", typeof k, ", v", v);
          // }
          console.log(d);
          if (!d) {
            // console.log(d[0]);
            window.alert("Dish was NOT found online either :(");
          } else {
            // console.log("asdasd", typeof d);
            // console.log(d[0]["strInstructions"]);
            let rcpLst = document.getElementById("recipeList");
            rcpLst.innerHTML = "";
            for (let i = 0; i < d.length && i < 9; i++)
              renderData(d[i], rcpLst);
          }
        });
    };
    reqRecipe();
  }
}

function check_db() {
  if (localStorage.getItem("NameOfRecipe") in data) {
    return NaN;
  } else {
    data[localStorage.getItem("NameOfRecipe")] = [
      localStorage.getItem("Steps"),
      localStorage.getItem("Image"),
    ];
    console.log(data);
    localStorage.clear();
  }
}

// var fs = require("fs");
// fs.writeFile("new_file.txt", "Hello content!", function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

// let input = document.querySelector('input');
// let textarea = document.querySelector('textarea');

// input.addEventListener('change', () => {
//     let files = input.files;

//     if(files.length == 0) return;

//     const file = files[0];

//     let reader = new FileReader();

//     reader.onload = (e) => {
//         const file = e.target.result;
//         const lines = file.split(/\r\n|\n/);
//         textarea.value = lines.join('\n');
//     };

//     reader.onerror = (e) => alert(e.target.error.name);

//     reader.readAsText(file);

// });
