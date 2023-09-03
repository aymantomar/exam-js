/// <reference types="./@types/jquery" />

const categoryBtn = document.getElementById("categoryBtn");
const searchBtn = document.getElementById("searchBtn");
const areaBtn = document.getElementById("areaBtn");
const ingredientsBtn = document.getElementById("ingredientsBtn");
const contactBtn = document.getElementById("contactBtn");
const dataContainer = document.getElementById("dataContainer");
const searchContainer = document.getElementById("searchBars");
const spinnParent = document.querySelector(".spinnParent");
const otherSpinnParent = document.querySelector(".spinnOuter");
let data = "";
searchContainer.classList.add("d-none");

async function getAll(apiLink, word) {
  try {
    toggleSpin();
    let res = await fetch(apiLink);
    data = await res.json();
    return data[`${word}`];
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpin();
  }
}
function toggleOtherSpin() {
  otherSpinnParent.classList.toggle("d-none");
}
function toggleSpin() {
  spinnParent.classList.toggle("d-none");
}
$(window).on("load", () => {
  $(".navbar-tabs")
    .animate({ width: "toggle" })
    .toggleClass("d-flex")
    .toggleClass("p-4");
});
// side bar animation
$(".showMenu").on("click", () => {
  $(".navbar-tabs")
    .animate({ width: "toggle" })
    .toggleClass("d-flex")
    .toggleClass("p-4");
});

let allNavTabs = document.querySelectorAll(".siteLink li a");

allNavTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    $(".navbar-tabs")
      .animate({ width: "toggle" })
      .toggleClass("d-flex")
      .toggleClass("p-4");
  });
});
// side bar animation

//* meals *//
async function displayMeals() {
  let getMeals = await getAll(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
    "meals"
  );
  getMeals.length = 20;
  let cartona = "";

  for (let i = 0; i < getMeals.length; i++) {
    cartona += `
    <div class="meal  col-md-3  position-relative " name="meals" data-type="startUpDetails">

    <img class="w-100" src="${getMeals[i].strMealThumb}" alt="cook" />

    <div
      class="d-flex align-items-center justify-content-center meal-info position-absolute top-100 start-0 w-100 h-100 whiteColor"
      id="mealInfo"
    >
      <div class="meal-name fs-3 text-start px-3 fw-bold w-100">
    ${getMeals[i].strMeal}
   
      </div>
    </div>
  </div>

    `;
  }
  dataContainer.innerHTML = cartona;

  getDetailsById(getMeals);
}

function displayContact() {
  searchContainer.classList.add("d-none");

  dataContainer.innerHTML = "";
  let cartona = "";
  cartona = `
  <div class="col-md-8 m-auto ">
          <div  class="row g-4">
              <div class="col-md-6">
              <input type="text" class="col-md-12 " id="name" name="inputs" onInput="testInputs()" placeholder="enter your name">
              <div class="alert alert-danger d-none">Special characters and numbers not allowed</div>
  
              </div>

              <div class="col-md-6">
              <input type="email" class="col-md-12 " id="email" name="inputs" onInput="testInputs()" placeholder="enter your email">
              <div class="alert alert-danger d-none">Email not valid *exemple@yyy.zzz</div>
              </div>
            
              <div class="col-md-6">
              <input type="tel" class="col-md-12 phone" id="phone" name="inputs" onInput="testInputs()" placeholder="enter your phone">
              <div class="alert alert-danger d-none">Enter valid Phone Number </div>
             
              </div>
            
              <div class="col-md-6">
              <input type="number" class="col-md-12" id="age" name="inputs" onInput="testInputs()" placeholder="enter your age">
              <div class="alert alert-danger d-none">Enter valid age  </div>
            
              </div>

              <div class="col-md-6">
              <input type="password" class="col-md-12" id="password" name="inputs" onInput="testInputs()" placeholder="enter your password">
              <div class="alert alert-danger d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
              
              </div>

              <div class="col-md-6">
              <input type="password" class="col-md-12 " id="rePassword" name="inputs" onInput="testInputs()" placeholder="enter your re password">
              <div class="alert alert-danger d-none">Enter valid repassword</div>
              
              </div>
           
            <button id="inputsSubmit"  class=" disabled btn btn-outline-danger m-auto mt-3">submit</button>
          </div>
        </div>
  
  `;
  dataContainer.innerHTML = cartona;
  testInputs();
}

function testInputs() {
  let namePattern = /^[A-Za-z\s]+$/g;
  let passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
  let phonePattern = /^\d{10,11}$/gi;

  // let nameInput = document.querySelector(".name");
  // let nameAlert = document.querySelector(".name +div");
  let allInputs = document.getElementsByName("inputs");
  let allAlerts = document.querySelectorAll(".alert");
  allAlerts.forEach((alert) => {
    if (alert.classList.contains("d-block")) {
      document.getElementById("inputsSubmit").classList.remove("disabled");
    } else {
      document.getElementById("inputsSubmit").classList.add("disabled");
    }
  });

  allInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (input.id == "name") {
        // console.log(`${input.id}Pattern`);
        if (namePattern.test(e.target.value)) {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-block", "d-none");
          // console.log(document.querySelector(`#${input.id} +div`));
        } else {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-none", "d-block");
        }
      }
      if (input.id == "email") {
        // console.log(`${input.id}Pattern`);
        if (emailPattern.test(e.target.value)) {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-block", "d-none");
          // console.log(document.querySelector(`#${input.id} +div`));
        } else {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-none", "d-block");
        }
      }
      if (input.id == "password") {
        console.log(`${input.id}`);
        if (passwordPattern.test(e.target.value)) {
          console.log("iam after test");
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-block", "d-none");
          // console.log(document.querySelector(`#${input.id} +div`));
        } else {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-none", "d-block");
        }
      }
      if (input.id == "rePassword") {
        let originalPassword = document.getElementById("password").value;
        if (e.target.value == originalPassword) {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-block", "d-none");
        } else {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-none", "d-block");
        }
      }
      if (input.id == "phone") {
        // console.log(`${input.id}Pattern`);
        if (phonePattern.test(e.target.value)) {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-block", "d-none");
          // console.log(document.querySelector(`#${input.id} +div`));
        } else {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-none", "d-block");
        }
      }
      if (input.id == "age") {
        // console.log(`${input.id}Pattern`);

        if (e.target.value < "150") {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-block", "d-none");
          // console.log(document.querySelector(`#${input.id} +div`));
        } else {
          document
            .querySelector(`#${input.id} +div`)
            .classList.replace("d-none", "d-block");
        }
      }
    });
  });
}

async function displayCatergory() {
  searchContainer.classList.add("d-none");

  let getCategory = await getAll(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    "categories"
  );

  dataContainer.innerHTML = "";
  let cartona = "";
  for (let i = 0; i < getCategory.length; i++) {
    cartona += `
    <div class="meal categoryContainer col-md-3  position-relative " name="meals" onclick="filterData('https://www.themealdb.com/api/json/v1/1/filter.php?c=','${
      getCategory[i].strCategory
    }')">
     
    
    <img class="w-100" src="${
      getCategory[i].strCategoryThumb
    }" alt="category" />

    <div
      class="d-flex align-items-center justify-content-center meal-info position-absolute top-100 start-0 w-100 h-100 whiteColor"
      id="mealInfo"
    >
      <div class="meal-name fs-3 text-center px-3 fw-bold w-100">
    ${getCategory[i].strCategory}
    <div class= "fs-small  text-center">
    ${getCategory[i].strCategoryDescription.slice(0, 130)}
   
    </div>
      </div>
    </div>
  </div>

    `;
  }
  dataContainer.innerHTML = cartona;
}
async function displayArea() {
  searchContainer.classList.add("d-none");

  let getArea = await getAll(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
    "meals"
  );
  let cartona = "";
  dataContainer.innerHTML = "";

  for (let i = 0; i < getArea.length; i++) {
    cartona += `
    <div class="area col-md-3 text-center" name="meals" onclick="filterData('https://www.themealdb.com/api/json/v1/1/filter.php?a=','${getArea[i].strArea}')">
    <i class="fs-1 text-white fa-solid fa-house-laptop"></i>
      <h4 class="text-white py-3">${getArea[i].strArea}</h4>
    
  </div> 
    `;
    dataContainer.innerHTML = cartona;
  }
}
async function displayIngrediants() {
  searchContainer.classList.add("d-none");
  let getIngrediants = await getAll(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list
    `,
    "meals"
  );
  dataContainer.innerHTML = "";
  let cartona = "";
  getIngrediants.length = 20;

  for (let i = 0; i < getIngrediants.length; i++) {
    cartona += `
    <div class="ingrediant col-md-3 text-center " name="meals" onclick="filterData('https://www.themealdb.com/api/json/v1/1/filter.php?i=','${
      getIngrediants[i].strIngredient
    }')">
    
    <i class="text-white fs-1 fa-solid fa-drumstick-bite"></i>

      <h4 class="text-white py-3">${getIngrediants[i].strIngredient}</h4>
      <p class="text-white">${getIngrediants[i].strDescription.slice(
        0,
        120
      )} </p>
    </div>
  </div> 
    
    `;
  }
  dataContainer.innerHTML = cartona;
}

async function displaySearch() {
  searchContainer.classList.remove("d-none");

  let cartona = `
 <div class="row g-4 py-4">
 <div class="col-md-5 offset-1">
            <div class="serachbyName">
              <input
                oninput="searchName()"
                type="text"
                class="form-control inputs btn-outline-light bg-transparent text-light"
                placeholder="Search By Name"
                id="searchbyName"
                
              />
            </div>
          </div>
          <div class="col-md-5 ">
            <div class="serachbyFirst">
              <input
                oninput="searchLetter()"
                
                type="text"
                class="inputs form-control btn-outline-light bg-transparent text-light"
                placeholder="Search By First Letter"
                id="searchbyLetter"
              />
            </div>
          </div>
  </div>
 `;
  searchContainer.innerHTML = cartona;

  displayMeals();
}

function searchName() {
  let searchNameINput = document.getElementById("searchbyName");
  searchNameINput.addEventListener("input", (e) => {
    filterData(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=",
      `${e.target.value}`
    );
  });
}
function searchLetter() {
  let searchLetterINput = document.getElementById("searchbyLetter");
  searchLetterINput.setAttribute("maxlength", "1");

  searchLetterINput.addEventListener("input", function (e) {
    filterData(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=",
      `${e.target.value}`
    );
  });
}

async function filterData(apiLink, strArea) {
  console.log(strArea);
  let getData = await getAll(
    `${apiLink}${strArea == "" ? "m" : strArea}`,
    "meals"
  );

  if (getData == null || getData == undefined) {
    dataContainer.innerHTML = "";
    return;
  }

  let cartona = "";
  dataContainer.innerHTML = "";

  for (let i = 0; i < getData.length; i++) {
    cartona += `
    <div class="meal  col-md-3  position-relative " name="meals" data-type="otherDetails">

    <img class="w-100" src="${getData[i].strMealThumb}" alt="cook" />

    <div
      class="d-flex align-items-center justify-content-center meal-info position-absolute top-100 start-0 w-100 h-100 whiteColor"
      id="mealInfo"
    >
      <div class="meal-name fs-3 text-start px-3 fw-bold w-100">
    ${getData[i].strMeal}
   
      </div>
    </div>
  </div>
    
    `;
  }

  dataContainer.innerHTML = cartona;
  getDetailsById(getData);
}

async function searchById(getData, i) {
  let data = await getAll(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getData[i].idMeal}`,
    "meals"
  );

  return data[0];
}

//ونظهر الداتا الجديده idفبنضطر نبحث من خلال ال  mealsDetails لان الاوبجكت مش بيبقى فيه الداتا المطلوب ل
function getDetailsById(getMeals) {
  let meals = document.getElementsByName("meals");

  if (meals[0].dataset.type == "otherDetails") {
    for (let i = 0; i < meals.length; i++) {
      meals[i].addEventListener("click", async () => {
        dataContainer.innerHTML = "";

        let x = await searchById(getMeals, i);
        mealsDetails(x);
        createOtherRecipes(x); //the diffrence
      });
    }
  } else {
    for (let i = 0; i < meals.length; i++) {
      meals[i].addEventListener("click", async () => {
        dataContainer.innerHTML = "";

        let x = await searchById(getMeals, i);
        mealsDetails(x);
        createRecipes(x); ///the diffrence
      });
    }
  }
}

function mealsDetails(currentMeal) {
  let cartona = `
  
  <div
            class="col-md-10 pt-5 d-flex m-auto position-relative text-light meal-Desription"
            id="mealDescription"
          >
            <div id="closeBtn" class="d-flex align-items-center justify-content-center fs-5 text-light position-absolute top-0 end-0"><i class="fa-solid fa-x"></i></div>

            <div class="meal-img col-md-4">
              <img
                class="w-100"
                src="${currentMeal.strMealThumb}"
                alt="meal image"
              />
              <div class="meal-Tile fs-2 fw-bold mt-2">${currentMeal.strMeal}</div>
            </div>
            <div class="description col-md-8 offset-1">
              <h2>instructions</h2>
              <p>
                ${currentMeal.strInstructions}
              </p>
              <div class="area fs-3">
                <span class="fs-2 fw-bold me-2">area:</span>${currentMeal.strArea}
              </div>
              <div class="category fs-3">
                <span class="fs-2 fw-bold me-2">category:</span>${currentMeal.strCategory}
              </div>
              <div class="recipes">
                <h3>Recipes :</h3>

                <ul class="recipesItems d-flex align-items-center flex-wrap">
                  
                  
                </ul>
              </div>
              <div class="tags">
                <h3 class="mb-3">tags:</h3>
                <a href="${currentMeal.strSource}" target="_blank" class="btn btn-success">source</a>
                <a href="${currentMeal.strYoutube}" target="_blank" class="btn btn-danger">youtube</a>
              </div>
            </div>
          </div>
  `;

  dataContainer.innerHTML = cartona;

  createRecipes(currentMeal);

  document.getElementById("closeBtn").addEventListener("click", () => {
    document.getElementById("mealDescription").innerHTML = "";
    dataContainer.classList.remove("d-none");
    displayMeals();
  });
}

// وصفات الاكل
function createRecipes(currentMeal) {
  let cartona = "";
  let obj = Object.keys(currentMeal);
  for (let i = 0; i < obj.length; i++) {
    if (
      typeof currentMeal[`strIngredient${i}`] != "undefined" &&
      currentMeal[`strIngredient${i}`] != "" &&
      currentMeal[`strIngredient${i}`] != " " &&
      currentMeal[`strIngredient${i}`] != null
    ) {
      cartona += `
    <li class="alert alert-info">${currentMeal[`strIngredient${i}`]}</li>
    `;
    }
  }

  document.querySelector(".recipesItems").innerHTML = cartona;
}
function createOtherRecipes(currentMeal) {
  let cartona = "";
  let obj = Object.keys(currentMeal);
  console.log(obj.length);
  for (let i = 0; i < obj.length; i++) {
    if (
      typeof currentMeal[`strMeasure${i}`] != "undefined" &&
      currentMeal[`strMeasure${i}`] != "" &&
      currentMeal[`strMeasure${i}`] != " " &&
      currentMeal[`strMeasure${i}`] != null
    ) {
      console.log(currentMeal[`strMeasure${i}`]);
      cartona += `
    <li class="alert alert-info">${currentMeal[`strMeasure${i}`]}</li>
    `;
    }
  }

  document.querySelector(".recipesItems").innerHTML = cartona;
}

// وصفات الاكل

categoryBtn.addEventListener("click", displayCatergory);
areaBtn.addEventListener("click", displayArea);
ingredientsBtn.addEventListener("click", displayIngrediants);
searchBtn.addEventListener("click", displaySearch);
contactBtn.addEventListener("click", displayContact);

displayMeals();
// displaySearch();
// displayCatergory();
