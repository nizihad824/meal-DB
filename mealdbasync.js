const searchBtn = document.getElementById("button-search");
const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.keyCode == 13)
        searchBtn.click();
});


document.getElementById('text').style.display='none';
const searchFood = async ()=>{
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value ='';
    if (searchText == ' '){
        // please write something to display

    }
    else{
        const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    // console.log(url)

    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data.meals)
    /* fetch(url)
    .then(res =>res.json())
    .then(data =>displaySearchResult(data.meals)) */

    }
}
const displaySearchResult = meals =>{
    // console.log(meals)
    const searchResult=document.getElementById('search-result')
    // searchResult.innerHTML =' ';
    searchResult.textContent = ' ';
    if(meals.length==0){
        // show no result found
        // document.write("My message");
        // $('.not-found').show();
        const text =document.getElementById('text')
        searchResult.innerText =text
        // document.getElementById('text').style.display='block';
    }

    meals.forEach(meal =>{
        // console.log(meal)
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
                <div class="d-flex justify-content-center">
            <button onclick="loadMealDetail(${meal.idMeal})" class="btn btn-primary " > Details</button>
            </div>
        </div>
        
        `;
        searchResult.appendChild(div)
    })
}
 const loadMealDetail = async mealId =>{
     const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    
     const res = await fetch(url);
    const data =await res.json();
    displayMealDetail(data.meals[0])


     /* fetch(url)
          .then (res =>res.json())
          .then(data =>displayMealDetail(data.meals[0])); */
 }
  const displayMealDetail =meal =>{
      console.log(meal);
     
      const mealDetails =document.getElementById('meal-details');
      mealDetails.textContent =' ';
      const div =document.createElement('div');
      div.classList.add('card');
      div.innerHTML =`
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
      `;
      mealDetails.appendChild(div)
  }