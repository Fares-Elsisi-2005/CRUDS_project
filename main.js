/* | Get Elements */
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbodyy = document.getElementById("tbody");

let mood = "Create";
let tmp;

let countMassage = document.getElementById("countvaldiation")

/* console.log(title, price, taxes, ads, discount, total, count, category, submit) */






/* |total of (price, taxes, ads, discount)| */
function getTotal() {
    let result
    if (price.value != "") {
        result = (+(price.value) + +(taxes.value) + +(ads.value)) - +(discount.value);
        total.innerHTML = result;
        total.style.background = "green";

    }
    else {
        total.innerHTML = 0
        total.style.background = "#a00d02";

    }

}




/* import the data of product from the local storage */
let dataPro;

if (localStorage.value != 0) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}


/* check if count number */
count.onkeyup = function () {
    if (count.value > 100) {
        countMassage.style.display = "block";
        console.log("more than 100")
    } else {
        countMassage.style.display = "none";
        console.log("less than 100")


    }
}
/* Create product */
submit.onclick = function () {


    let newpro = {
        title: title.value.trim().toLowerCase(),
        price: price.value.trim(),
        taxes: taxes.value.trim(),
        ads: ads.value.trim(),
        discount: discount.value.trim(),
        total: total.innerHTML,
        count: count.value.trim(),
        category: category.value.trim().toLowerCase(),
    };



    // Validate inputs
    if (
        title.value != "" &&
        price.value != "" &&
        category.value != "" &&
        count.value < 100
    ) {
        if (mood === "Create") {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    dataPro.push(newpro);
                }
            } else {
                dataPro.push(newpro);
            }
        } else {
            dataPro[tmp] = newpro;
        }

        clearData();

    } else {
        console.log("the product is not created");
    }



    // Save data and update UI
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();

    // Reset form
    submit.innerHTML = "create";
    mood = "Create";
    count.style.display = "block";
};


/* clear data from inputs boxes*/

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}




/* show products */
function showData() {

    getTotal();

    let table = ``;

    for (i = 0; i < dataPro.length; i++) {
        table += `
         <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td> ${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
           <td><button onclick="updatepro1(${i})"  id="update">update</button></td>
        <td><button onclick="deleteproduct(${i})" id="delete">delete</button></td>
                
    </tr>`;

    }
    let deleteBtn = document.getElementById("deletAll");
    if (dataPro.length > 0) {
        deleteBtn.innerHTML = `
        <button onclick="deleteAll()">delete all (${dataPro.length})</button>
        `
    } else {
        deleteBtn.innerHTML = ""
    }
    tbodyy.innerHTML = table;


}

showData();

/*  delete one product*/

function deleteproduct(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}



/* delete all from array and localstorage */
function deleteAll() {
    dataPro.splice(0);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}





/*  update*/

function updatepro1(i) {

    /* scroll to the top */
    scroll({
        top: 0
    })
    /* show data */
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;

    getTotal();
    count.style.display = "none"

    /* change delete button to update button */
    submit.innerHTML = "update";
    /* chage the mood from create to update */
    mood = "update";

    /* get the index of the current product */
    tmp = i;
}





/* search  mood*/
let searchMood = "title";

function getSearchModd(id) {
    let search = document.getElementById("search");
    if (id === 'SearchByTitle') {
        searchMood = "title";
    } else {
        searchMood = "category"

    }
    search.placeholder = "Search by " + searchMood;

    search.focus()
    search.value = "";
    showData();
}


/* search function */
function searchData(value) {

    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === "title") {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td> ${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updatepro1(${i})"  id="update">update</button></td>
                        <td><button onclick="deleteproduct(${i})" id="delete">delete</button></td>
                                
                    </tr>`;
            }

        } else {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td> ${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updatepro1(${i})"  id="update">update</button></td>
                        <td><button onclick="deleteproduct(${i})" id="delete">delete</button></td>
                                
                    </tr>`;
            }

        }
    }
    document.getElementById("tbody").innerHTML = table;
}


// clean data 


