showHome();

function showList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products',
        headers: {
            'Content-Type': 'application/json',
        },
        success: (products) => {
            console.log(products)
            let html = '';
            products.map(item => {
                html += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.nameCategory}</td>
            
            <td><img src="${item.image}" alt=""></td>
            <td><button onclick="move(${item.id})">delete</button></td>
            <td><button onclick="showFromEdit(${item.id})">Edit</button></td>
        </tr>`
            })
            $('#tbody').html(html)
        }

    })

}

function showFromAdd() {
    $('#body').html(` <input type="text" id = "name" placeholder="name"> 
             <input type="number" id = "price" placeholder="price"> 
             <input type="file" id="fileButton" onchange="uploadImage(event)">
             <div id="imgDiv"></div>
             <select id="categoryAdd">
             <option selected>Category</option>
             </select>
    <button onclick="add()">Add</button>`)
    getCategoriesCreate();
}

function showHome() {
    $('#body').html(`<table border="1">
        <thead>
        <tr>
        <td>ID</td>
    <td>Name</td>
    <td>Price</td>
     <td>category</td>
    <td>Image</td>
    
    
    <td>Action</td>
</tr>
</thead>
    <tbody id="tbody">

    </tbody>
</table>`)
    showList()
}
function add(){
    let name = $('#name').val();
    let price = $('#price').val();
    let image = localStorage.getItem('image')
    let category = $('#categoryAdd').val();
    let product = {
        name : name,
        price : price,
        image : image,
        category : category
    }
    console.log(product)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success:()=> {
            showHome()
        }

    })
}
function move(id){
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        success: () => {
           showHome()
        }

    })

}
function showFromEdit(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        success: (product) => {
            $('#body').html(` <input type="text" id = "name" placeholder="${product.name}"> 
             <input type="number" id = "price" placeholder="${product.price}"> 
              <input type="file" id="fileButton" onchange="uploadImage(event)" placeholder="">
             <div id="imgDiv"><img src="${product.image}" alt=""></div>
             
             <select id="categoryAdd">
             <option selected>Category</option>
             </select>
    <button onclick="editProduct(${id})">Edit</button>`)
            getCategoriesCreate();
        }
    })
}


function editProduct(id) {
    let name = $('#name').val();
    let price = $('#price').val();
    let image = localStorage.getItem('image');
    let category = $('#categoryAdd').val();
    let product = {
        name : name,
        price : price,
        image : image,
        category : category
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success:()=> {
            showHome()
        }

    })
}
function getCategoriesCreate() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories',
        headers: {
            'Content-Type': 'application/json',
        },
        success: (categories) => {
            console.log(categories)
            let Categories = ``;
            for (const category of categories) {
                Categories += `
                    <option value=${category.id}>${category.name}</option>
                `
            }
            $('#categoryAdd').html(Categories);
        }
    })
}
function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="">`
            localStorage.setItem('image', downloadURL);
        });
}

