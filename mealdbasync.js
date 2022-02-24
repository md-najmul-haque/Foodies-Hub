
const loadFood = async () => {

    const inputField = document.getElementById('input-field')
    const inputText = inputField.value;
    // console.log(inputText);
    inputField.value = '';

    if (inputText == '') {
        errorMessage.innerHTML = `<h4 class="text-danger text-center mt-5"> Please write some things to display.</h4>`
        displaySearch.textContent = '';
        mealDetail.textContent = ''
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
    // console.log(url);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayData(data.meals))

    try {
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.meals)
    } catch (error) {

        errorMessage.innerHTML = `<h4 class="text-danger text-center mt-5">Something went wrong please try again later.</h4>`

    }

}

const errorMessage = document.getElementById('error-message')
const displaySearch = document.getElementById('display-food');

const displayData = meals => {

    console.log(meals);

    // const displaySearch = document.getElementById('display-food');
    // // console.log(displaySearch);

    displaySearch.textContent = '';


    if (meals == null) {
        errorMessage.innerHTML = `<h4 class="text-danger text-center mt-5"> No result found.</h4>`

    } else {
        errorMessage.innerHTML = ''
        meals.forEach(meal => {

            // console.log(meal)

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick=loadMealDetail(${meal.idMeal}) class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div  class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            </div>
        </div>
    
            `
            displaySearch.appendChild(div);

        })
    }
}

const loadMealDetail = async mealId => {
    // console.log(mealId);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    const res = await fetch(url)
    const data = await res.json()
    displayMealdetails(data.meals[0])

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealdetails(data.meals[0]))

}

const mealDetail = document.getElementById('show-meal-details');

const displayMealdetails = meal => {
    console.log(meal);

    const mealDetail = document.getElementById('show-meal-details');
    // console.log(mealDetail);
    mealDetail.textContent = ''

    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
        <img class="card-img-top" src="${meal.strMealThumb}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
        </div>`

    mealDetail.appendChild(div);

}

// console.log(meal);


