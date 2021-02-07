const button = document.getElementById('search-button');
const mealItem = document.getElementById('meal-item');
const mealDetails = document.getElementById('display-result');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('search-input').value;
    loadData(userInput);
});

    const loadData = userInput => {

    let url = "";
    if (userInput.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;
        mealItem.innerHTML = null;
        mealDetails.innerHTML = null;

    }
    else if(userInput.length === 0){
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;
        alert('please write something');
        
    }
    else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
        mealItem.innerHTML = null;
        mealDetails.innerHTML = null;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        })
    //.catch(error => console.log(error))
}



const displayData = data => {

    data.meals.forEach(element => {

        const div = document.createElement('div');

        const mealInfo = `
        <div class="col">
            <div class="card h-100">
                <img onclick="displayMealDetails('${element.strMeal}')" class="card-img-top" src="${element.strMealThumb}"/>
                <div class="card-body">
                    <h4 class="card-title mx-auto">${element.strMeal}</h4>
                </div>
            </div>
        </div> `;
        div.innerHTML = mealInfo;
        mealItem.appendChild(div);

    });
}

const displayMealDetails = (string) => {

    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            mealDetails.style.display = "block"
            const div = document.createElement('div');

            let element;
            let mealDetailsInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];

                if (string === element.strMeal) {
                    mealDetailsInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${element.strMeal}</h3>
                    <p>Ingredients</p>
                    <ul>                    
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                        <li>${element.strIngredient7}</li>
                        <li>${element.strIngredient8}</li>
                        <li>${element.strIngredient9}</li>
                        <li>${element.strIngredient10}</li>
                    </ul>
                    </div> `;
                }
            }

            div.innerHTML = mealDetailsInfo;
            mealDetails.appendChild(div);
        });
    //  cleaning previous load data)
    mealDetails.innerHTML = null;
}