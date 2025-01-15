let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let index ;
function getTotal(){
    let result = 0
    if (price.value != 0)
    {
        result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ='#28A745';
    }else{
        total.innerHTML = '';
        total.style.background ='#FFC107';
    }
}

let products;
if (localStorage.products != null){
    products = JSON.parse(localStorage.products);
}else {
    products = [];
}

submit.onclick = function (){
    if (title.value == '' || price.value == '' || category.value == ''){
        alert('Please fill all fields');
        return;
    }else{
    let item = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if (mode === 'create'){
    if (item.count > 1)
        {
        for (let j = 0; j < item.count; j++)
        {
            products.push(item);
        }
    }else {
        products.push(item);
    }
    } else {
        products[index] = item;
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        mode = 'create';  
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    Reset();
    displayProducts();
}
}
function Reset (){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background ='#FFC107';
}

function displayProducts(){
    let table = '';
    for (let i = 0; i < products.length; i++)
    {
        table += `<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">Edit</button></td>
                    <td><button id="delete" onclick="Delete(${i})">Delete</button></td>
                </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    let del_btn = document.getElementById('deleteAll');
    if(products.length > 0)
        {
            del_btn.innerHTML = `<button onclick="DeleteAll(${products.length})">Delete All (${products.length})</button>`;
            del_btn.style.marginTop = '10px';
        }else {
            del_btn.innerHTML = '';
            console.log('No products to delete');
        }
}
displayProducts();

function Delete(i){
    products.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}
function DeleteAll(i){
    products.splice(0,i);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}
function Update(i){
    mode = 'update';
    index = i;
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount; 
    getTotal();
    count.style.display = 'none';
    category.value = products[i].category;
    submit.innerHTML = 'Edit';
    scroll({
        top : 0,
        behavior : 'smooth'
    }
    )

}
let search = document.getElementById('search');
function SearchByTitle(){
    let table ='';
    for (var i = 0; i < products.length; i++){
        if(products[i].title.includes(search.value.toLowerCase())){
            table += `<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">Edit</button></td>
                    <td><button id="delete" onclick="Delete(${i})">Delete</button></td>
                </tr>`;
        }else{
            displayProducts();
        }
    }
    document.getElementById('tbody').innerHTML = table;

}
function SearchByCategory(){
    let table ='';
    for (var i = 0; i < products.length; i++){
        if(products[i].category.includes(search.value)){
            table += `<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">Edit</button></td>
                    <td><button id="delete" onclick="Delete(${i})">Delete</button></td>
                </tr>`;
        }else{
            displayProducts();
        }
    }
    document.getElementById('tbody').innerHTML = table;
    scroll({
        bottom : 200,
        behavior :'smooth'
    })
  
}
function Search(){
    let table ='';
    for (var i = 0; i < products.length; i++){
        if(products[i].title.includes(search.value.toLowerCase())){
            table += `<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">Edit</button></td>
                    <td><button id="delete" onclick="Delete(${i})">Delete</button></td>
                </tr>`;
        }else{
            displayProducts();
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
