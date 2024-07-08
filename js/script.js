//variables
var searchByNameData;
var searchByFirstLetterData;


////////////////////////////////// main funtions:  //////////////////////////////////////////



// it is a general function to get all data (meals) 
async function getMealData(api) {

    let data = await fetch(api)
    let result = await data.json()
    console.log(result.meals)
    return result.meals

}



// it is a general function to get all data (categories)
async function getCategoryData(api) {
    let data = await fetch(api)
    let result = await data.json()
    console.log(result.categories)
    return result.categories

}



// it takes parameters and display searched list that matches these parameters 
async function Displayer(val, loc, mode, type) {
    let searchData = await getMealData(`https://www.themealdb.com/api/json/v1/1/${mode}.php?${type}=${val}`)

    console.log(searchData)
    let box = ``

    InnerLoading()
    for (let i = 0; i < searchData.length; i++) {
        box += `
        <div class="col-12 col-md-3 clicker" onclick="SearchAndDisplayByID(${searchData[i].idMeal},'${loc}')">
        <div class="food-container my-2 position-relative overflow-hidden rounded-2 cursor-pointer">
            <div>
                <img class="w-100" src="${searchData[i].strMealThumb}" alt="placeholder image">
            </div>
            <div class="overlay w-100 h-100 text-center">
                <h4>${searchData[i].strMeal}</h4>
            </div>
        </div>
    </div>


    `
    }
    $(`${loc}`).html(box);

}



// it takes an id and display a meal that  matches that id 
async function SearchAndDisplayByID(id, loc) {

    let my_Data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let finalData = await my_Data.json()
    console.log(finalData.meals)
    let meal = finalData.meals[0]
    console.log(meal);
    var box = ``
    var box2 = ``
    var box3 = ``
    InnerLoading()
    box += `
        <div class="container py-5">
        <div class="row py-5 g-4 ">
            <div class="col-md-4 clicker">
                <img class="w-100  rounded-4"
                    src="${meal.strMealThumb}"
                    alt="">
                <h3>"${meal.strMeal}"</h3>
            </div>

            <div class="col-md-8 ">
                <h2>Instructions</h2>
                <p>'${meal.strInstructions}'</p>
                <h3>Area : '${meal.strArea}'</h3>
                <h3>Category : '${meal.strCategory}'</h3>
                <h3 >Recipes : </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap" id="recipesId">
                </ul>
                <h3>Tags : </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap" id="tagsId">
                </ul>
                <h3>Links : </h3>
                
                <a target="_blank" href="'${meal.strSource}'"
                    class="btn btn-success">Source</a>

                <a target="_blank" href="${meal.strYoutube}"
                    class="btn btn-danger">Youtube</a>
            </div>
        </div>
    </div>
    `
    $(`${loc}`).html(box);


    // recipes :  
    for (let i = 1; i <= 20; i++) {
        const key = `strMeasure${i}`;
        const key2 = `strIngredient${i}`
        // if (meal[key] === '' || meal[key2] === '') { break; }

        if (meal[key] != '' && meal[key2] != '') {
            // console.log(meal[key], meal[key2])
            box2 += `<li class="alert alert-info m-2 p-1">${meal[key]} ${meal[key2]} </li>`
            console.log(meal[key], meal[key2])
        }
        // console.log(box2)
    }
    $('#recipesId').html(box2);


    // tagsId
    if (meal.strTags != null) {
        let strTagsArray = meal.strTags.split(',');
        console.log(strTagsArray)
        for (let i = 0; i <= strTagsArray.length - 1; i++) {
            box3 += `  <li class="alert alert-danger m-2 p-1">${strTagsArray[i]}</li> `
            console.log(strTagsArray[i])

        }
    }


    $('#tagsId').html(box3);



}







//////////////////////////////////// API part : //////////////////////////////////////////// 


// is fetches all categories and display it on category page
async function categoryDisplay() {

    let searchData = await getCategoryData(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    console.log(searchData)
    var box3 = ``

    for (let i = 0; i < searchData.length; i++) {

        let string =
            box3 += `
        <div class="col-12 col-md-3 clicker" onclick="Displayer('${searchData[i].strCategory}','#category-inner','filter','c')">
            <div class="food-container my-2 position-relative overflow-hidden rounded-2 cursor-pointer">
                <div>
                    <img class="w-100" src="${searchData[i].strCategoryThumb}" alt="placeholder image">
                </div>
                <div class="overlay  text-center d-flex flex-column">
                    <h4>${searchData[i].strCategory}</h4>
                    <p>${searchData[i].strCategoryDescription.substring(0, 25)}</p>
                </div>
            </div>
        </div>   
        `

    }
    $('#category-inner').html(box3);
    console.log("enddd");


}



//  disblay all ingredients list in ingredients page
async function IngredientsDisplay() {

    let IngredientsData = await getMealData("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    IngredientsData = IngredientsData.splice(0, 20)
    let box = ``
    for (let i = 0; i < IngredientsData.length; i++) {
        box += `
        
        <div class="col-3">
            <div class="text-center clicker" onclick=" Displayer('${IngredientsData[i].strIngredient}','#ingredient-inner','filter','i')">
                <i class="fa-solid fa-bowl-food fa-5x"></i>
                <h3>${IngredientsData[i].strIngredient}</h3>
                <p>${IngredientsData[i].strDescription.substring(0, 95)}</p>
            </div>

        </div>

        `
    }
    $('#ingredient-inner').html(box);

    console.log(IngredientsData)
}

//display the area list if area page 
async function areaDisplay() {

    let Data = await getMealData("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let box = ``
    console.log(Data[0].strArea)
    for (let i = 0; i < Data.length; i++) {

        box += `
        
        <div class="col-3">
            <div class="text-center clicker" onclick=" Displayer('${Data[i].strArea}','#area-inner','filter','a')">

                <i class="fa-solid fa-flag fa-4x"></i>
                <h3>${Data[i].strArea}</h3>
            </div>

        </div>

        `

    }
    $('#area-inner').html(box);

}





//display searched list when page opens the first time : 
async function firstTimeDisplay() {
    // let my_Data = await getMealData("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    // console.log(my_Data.splice(0, 20))

    Displayer(' ', '#first-inner', 'search', 's')

}

firstTimeDisplay()


////////////////////////////////////////  SideBar :  //////////////////////////////////////////



$("#inner-items").hide(1); //it initially hide the sidebar


// close sidebar function
function closeSideBar() {

    let innerSidebarWidth = $("#inner").innerWidth();
    $("#sidebar").animate({ left: - innerSidebarWidth }, 600)
    $('#open').css('visibility', ' visible');
    $('#close').css('visibility', 'hidden');
    $("#inner-items").hide(600);


}

// open sidebar function
function openSideBar() {
    $("#sidebar").animate({ left: 0 }, 600)
    $('#open').css('visibility', 'hidden');
    $('#close').css('visibility', 'visible');
    $("#inner-items").show(1000);
}

//open sidebar (make left 0)
$("#open").click(openSideBar);


//close sidebar (make left -innerwidth)
$("#close").click(closeSideBar);






//////////////////////////////////  Switch between pages :  ///////////////////////////////////


//make the inner-loading effect
function InnerLoading() {

    $("#loading-inner").removeClass('d-none');
    $("#loading-inner").css('display', 'block');
    $('body').css('overflow', 'hidden');
    $('document').ready(function () {
        $(".spinner").fadeOut(1000, () => {
            $("#loading-inner").fadeOut(1000);
        });
    });
    $('body').css('overflow', 'auto');

}

//open specific page and hide the rest
function hideAllExpect(sectioID) {

    $("#category").addClass("d-none");
    $("#search").addClass("d-none");
    $("#area").addClass("d-none");
    $("#ingredient").addClass("d-none");
    $("#contacts").addClass("d-none");
    $("#firstTime").addClass("d-none");


    $(`${sectioID}`).removeClass("d-none");
    closeSideBar()



}

// open search page
$("#searchLink").click(function () {

    InnerLoading()
    hideAllExpect("#search")

});




//open category page and display categries list
$("#categoriesLink").click(function () {
    //hide all - open category
    hideAllExpect('#category')

    //display data
    InnerLoading()

    categoryDisplay()

});



//open Area page and fetch all area list
$("#areaLink").click(function () {

    //open Area page
    hideAllExpect('#area')


    //display all area list
    InnerLoading()
    areaDisplay()


});



//open ingredient page and display all ingredient list
$("#ingredientLink").click(function () {

    //open Area page
    hideAllExpect('#ingredient')

    //display all area list
    InnerLoading()
    IngredientsDisplay()

});



//open contacts page 
$("#contactsLink").click(function () {

    //open contacts page
    hideAllExpect('#contacts')

    InnerLoading()

});




// Search By Name Input Field (Event)
$("#searchByName").on('propertychange input', function (e) {

    //the type = s because we want search by name
    Displayer(e.target.value, "#search-inner", 'search', 's')
});



// Search By First Letter Input Field (Event)
$("#searchByFirstLetter").on('propertychange input', function (e) {

    //the type = f here because we want search by first letter only
    Displayer(e.target.value, "#search-inner", 'search', 'f')

});







//////////////////////////////  Regular expression part :  ///////////////////////////////////


//my regex

let nameRegex = /^[A-Za-z]{3,}/
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/
let phoneNumberRegex = /^01[0125][0-9]{8}$/gm
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
var password;
var f = false; var b = false; var c = false;
var d = false; var e = false; var a = false; var x = false;
function ageChecker(age) {

    if (age > 99 || age < 12) {
        return false
    } else {
        return true

    }
}




// Name Input Checker
$("#nameInput").on('propertychange input', function (e) {


    if (nameRegex.test(e.target.value)) {
        console.log('suc')
        $('#nameWrong').addClass('d-none');
        f = true

    } else {
        console.log('failed')
        $('#nameWrong').removeClass('d-none');
        f = false

    }
    validate()

});




// Email Input Checker
$("#emailInput").on('propertychange input', function (e) {

    if (emailRegex.test(e.target.value)) {
        console.log('suc')
        $('#emailWrong').addClass('d-none');
        a = true;

    } else {
        console.log('failed')
        $('#emailWrong').removeClass('d-none');
        a = false
    }
    validate()

});


// Phone Input Checker
$("#phoneInput").on('propertychange input', function (e) {

    if (phoneNumberRegex.test(e.target.value)) {
        console.log('suc')
        $('#phoneWrong').addClass('d-none');
        b = true;

    } else {
        console.log('failed')
        $('#phoneWrong').removeClass('d-none');
        b = false;
    }
    validate()

});



// Age Input Checker
$("#ageInput").on('propertychange input', function (e) {


    if (ageChecker(e.target.value)) {
        console.log('suc')
        $('#ageWrong').addClass('d-none');
        c = true;
    } else {
        console.log("enter a valid age")
        $('#ageWrong').removeClass('d-none');
        c = false;

    }

    validate()

});



// Password Input Checker
$("#passInput").on('propertychange input', function (e) {


    if (passwordRegex.test(e.target.value)) {
        console.log('suc')
        $('#passWrong').addClass('d-none');
        d = true;
    } else {
        console.log('failed')
        $('#passWrong').removeClass('d-none');
        d = false;

    }
    validate()
    password = e.target.value
});





// Password Confirm Input Checker
$("#passCofirmInput").on('propertychange input', function (e) {

    if (e.target.value === password) {
        console.log('suc')
        $('#confirmWrong').addClass('d-none');
        x = true;

    } else {
        console.log('failed')
        $('#confirmWrong').removeClass('d-none');
        x = false;

    }
    validate()
});




//Enable or disable the submit button
function validate() {

    if (a + b + c + d + x + f === 6) {
        $("#submit").prop('disabled', false);
        $("#submit").removeClass("btn-outline-danger");
    } else {
        $("#submit").addClass("btn-outline-danger");
        $("#submit").prop('disabled', true);

    }


}



$(document).ready(function () {
    $(".sk-cube-grid").fadeOut(1000, () => {
        $("#loading").fadeOut(1000);
        $("#loading").remove();
    });

    $("body").css("overflow", 'auto');

});

