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

let recipe_no;

function pop1() {
  document.getElementById("rec_1").innerHTML = localStorage.getItem("data");
  document.getElementById("img1").src = localStorage.getItem("Img");
}

function pop2(e) {
  //   localStorage.setItem("data", recipe["strInstructions"]);
  //   localStorage.setItem("Img", recipe["strMealThumb"]);
  console.log(e);
}

const showRecipePage = function (recipe) {
  const instructions = recipe["strInstructions"].split(".");
  console.log(instructions);
  let htmlCode = `<div class="content">
                      <br>
                      <br>

                      <p><b>
                              <img src="${recipe["strMealThumb"]}" alt="logo.png" srcset="" id="img1">
                              <h1 class = "text2">${recipe["strMeal"]}</h1>
                              <div class="text2" id="text2">
                                <Table>
                                  <tr>
                                    <th>Ingredients</th>
                                      <th>Qty</th>
                                        </tr>`;

  for (let i = 1; i < 300; i++) {
    if (
      recipe["strIngredient" + i] == "" ||
      recipe["strIngredient" + i] == undefined
    )
      break;
    const li = `<tr >
                  <td>${recipe["strIngredient" + i]}</td>
                  <td>${recipe["strMeasure" + i]}</td>
                </tr>`;
    htmlCode += li;
  }

  htmlCode += `</Table><ol>`;

  // adding the steps in a list
  for (let i = 0; i < instructions.length - 1; i++) {
    const li = `<li>${instructions[i]}</li>`;
    htmlCode += li;
  }

  htmlCode += `</ol>
                   </div>
                      </b>
                        </p>
                        <a href="${recipe["strYoutube"]}" >
                              <img
                                src="https://lh3.googleusercontent.com/proxy/Q_yUbjRR7EvwgP1G5L9Y6lGxdt0aLySDGXN8Sbz5wNAYgebLRqp9RoNXTjbLtddsNnBRnpQpsV2qgqPBHL5NQp8e_ONp-jkcASLB-WgzkjhrFcmAXV3AIv9WDpmZWjKf0EeV9GQWkg"
                                alt="YouTube"
                                id="mail1"
                              />
                            </a>
                          </div>
                          
                          
                          
                          
                          
                          
                          `;
  console.log(htmlCode);
  const contentsPage = document.getElementById("recipeList");
  contentsPage.innerHTML = "";
  contentsPage.insertAdjacentHTML("afterbegin", htmlCode);
};

//working upto here just fineeeee

let rcp;

const addListeners = function (recipe) {
  const elem = document.getElementById(recipe["strMeal"]);
  console.log(elem);
  document.getElementById(recipe["strMeal"]).addEventListener("click", () => {
    console.log("Clicked on: ", recipe["strMeal"]);
    showRecipePage(recipe);
  });
};

const renderData = function (rcpLst, recipe = rcp) {
  // console.log("\nInside renederData()\n");
  // console.log(typeof recipe);

  const ele = `<div class="polaroid" >
                <a id="${recipe["strMeal"]}">
                  <img src=${recipe["strMealThumb"]} alt="5 Terre" style="width: 100%  "
                /></a>
                <div class="container">
                  <p>${recipe["strMeal"]}</p>
                </div>
              </div>`;

  rcpLst.insertAdjacentHTML("afterbegin", ele);

  // const elem = document.getElementById(recipe["strMeal"]);
  // console.log(elem);
  // elem.addEventListener("onClick", function (e) {
  //   console.log(e);
  // pop2(recipe);
  // });
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
    //    window.alert("Recipe Not Found, looking thorugh the API now...\n");
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

          rcp = d;

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
            for (let i = 0; i < d.length && i < 9; i++) {
              renderData(rcpLst, d[i]);
              // localStorage.setItem("data" + i, d[i]["strInstructions"]);
              // localStorage.setItem("Img" + i, d[i]["strMealThumb"]);
            }

            // adding event listeners on the polaroids
            for (let i = 0; i < d.length && i < 9; i++) {
              addListeners(d[i]);
              // renderData(rcpLst, d[i]);
              // localStorage.setItem("data" + i, d[i]["strInstructions"]);
              // localStorage.setItem("Img" + i, d[i]["strMealThumb"]);
            }
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
