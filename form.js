class logic {
  getting_data() {
    localStorage.setItem("NameOfRecipe", document.forms["data"]["rec"].value);
    localStorage.setItem("Image", document.forms["data"]["img"].value);
    localStorage.setItem("Steps", document.forms["data"]["Recipe_steps"].value);
    if (localStorage.getItem("NameOfRecipe") == "") {
      alert("Pls State the Name Of recipe");
      return false;
    } else if (localStorage.getItem("Image") == "") {
      alert("Image Of Recipe Is Required");
      return false;
    } else if (localStorage.getItem("Steps") == "     ") {
      alert("Pls Share The recipe");
      return false;
    }

    window.location.href = "home.html";
  }
}

function dat() {
  let obj = new logic();
  obj.getting_data();
  console.log(localStorage);
}

const addRecipe = function () {};
