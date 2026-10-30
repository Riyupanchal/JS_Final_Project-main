
let foodId = document.getElementById("food-id");
let foodTitle = document.getElementById("food-title");
let foodImage = document.getElementById("food-image");
let foodCategory = document.getElementById("food-category");
let foodPrice = document.getElementById("food-price");
let foodDescription = document.getElementById("food-description");

let addFood = document.getElementById("add-food");

let updateId = document.getElementById("update-food-id");
let updateTitle = document.getElementById("update-food-title");
let updateImage = document.getElementById("update-food-image");
let updateCategory = document.getElementById("update-food-category");
let updatePrice = document.getElementById("update-food-price");
let updateDescription = document.getElementById("update-food-description");
let updateFood = document.getElementById("update-food");

let priceId = document.getElementById("update-price-food-id");
let newPrice = document.getElementById("update-price-food-price");
let updatePriceBtn = document.getElementById("update-price-food");

let lowToHigh = document.getElementById("sort-low-to-high");
let highToLow = document.getElementById("sort-high-to-low");

let searchSelect = document.getElementById("search-by-select");
let searchInput = document.getElementById("search-by-input");
let searchBtn = document.getElementById("search-by-button");
let resetBtn = document.getElementById("reset-search");

let wrapper = document.getElementById("data-list-wrapper");

let categoryButtons = document.querySelectorAll(".filter-btn");




let arr = [];


// GET DATA FROM JSON SERVER

function fetchData() {
    fetch("http://localhost:3000/foods")
        .then(res => res.json())
        .then(data => {
            arr = data;
            displayData(arr);
        });
}


//  DISPLAY FOOD CARDS

function displayData(data) {
    wrapper.innerHTML = "";

    data.forEach(function (el) {
        wrapper.innerHTML += `
            <div class="food-card">
                <img src="${el.image}" alt="${el.title}">

                <div class="food-info">
                    <h3>${el.title}</h3>
                    <span class="category">${el.category}</span>
                    <p class="price">₹${el.price}</p>
                    <p>${el.description}</p>
                    <p>Food ID: ${el.id}</p>

                    <div class="card-actions">
                        <button class="edit-btn"
                            onclick="editData('${el.id}')">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="deleteData('${el.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}


// ADD FOOD


addFood.addEventListener("click",()=> {

    let data = {
        id: foodId.value,
        title: foodTitle.value,
        image: foodImage.value,
        category: foodCategory.value,
        price: Number(foodPrice.value),
        description: foodDescription.value
    };

    fetch("http://localhost:3000/foods", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(() => {alert("Food Added Successfully!");
            fetchData();
        });
});


//  EDIT DATA - FILL UPDATE FORM

function editData(id) {

    let food = arr.find(el => String(el.id) === String(id));

    updateId.value = food.id;
    updateTitle.value = food.title;
    updateImage.value = food.image;
    updateCategory.value = food.category;
    updatePrice.value = food.price;
    updateDescription.value = food.description;
}


// UPDATE ALL FOOD DATA

updateFood.addEventListener("click", function () {

    let id = updateId.value;

    let data = {
        title: updateTitle.value,
        image: updateImage.value,
        category: updateCategory.value,
        price: Number(updatePrice.value),
        description: updateDescription.value
    };

    fetch(`http://localhost:3000/foods/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(() => {alert("Food Updated Successfully!");
            fetchData();
        });
});


// UPDATE ONLY PRICE

updatePriceBtn.addEventListener("click",()=> {

    let id = priceId.value;

    let data = {
        price: Number(newPrice.value)
    };

    fetch(`http://localhost:3000/foods/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(() => {
            alert("Price Updated Successfully!");
            fetchData();
        });
});


// DELETE FOOD

function deleteData(id) {

    fetch(`http://localhost:3000/foods/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert("Food Deleted Successfully!");
            fetchData();
        });
}


//  SORT LOW TO HIGH

lowToHigh.addEventListener("click",()=> {

    let data = [...arr];

    data.sort((a, b) => a.price - b.price);

    displayData(data);
});


// SORT HIGH TO LOW

highToLow.addEventListener("click", ()=> {

    let data = [...arr];

    data.sort((a, b) => b.price - a.price);

    displayData(data);
});


// FILTER BY CATEGORY

categoryButtons.forEach(function (btn) {

    btn.addEventListener("click", ()=> {

        let category = btn.dataset.category;

        if (category === "All") {
            displayData(arr);
        } else {
            let data = arr.filter(el => el.category === category);
            displayData(data);
        }
    });
});



fetchData();
