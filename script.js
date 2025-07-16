onload();
function onload() {
    displayItems();
    displayBagItems();
}
let bagItems = localStorage.getItem('bagItems')? JSON.parse(localStorage.getItem('bagItems')) : [];
function displayItems(){
    let itemContainer = document.querySelector('#itemContainer');
    if(itemContainer){
        let innerHTML = '';
        items.forEach(item => {
            innerHTML += `
        <div class="card">
            <img src="${item.image}" alt="Product Image">
            <div class="card-content">
                <div class="company">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="original">Tk ${item.original_price}</span>
                    <span class="current">Tk ${item.current_price}</span>
                </div>
                <div class="discount">${item.discount_percentage}% off</div>
                <div class="rating">&#11088; ${item.rating.stars} (${item.rating.count})</div>
                <div class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</div>
            </div>
        </div>
       `
        });
        itemContainer.innerHTML = innerHTML;
    }else {
        return;
    }


}


function addToCart(item){
    bagItems.push(item);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagItems();
}

function displayBagItems() {
   let bagSpan = document.querySelector('.bag-items')
    if (localStorage.getItem('bagItems')) {
       let totalItemInBag = JSON.parse(localStorage.getItem('bagItems'));
        bagSpan.innerHTML = totalItemInBag.length;
        bagSpan.style.display = 'block';
    }else{
        bagSpan.innerHTML = 0;
        bagSpan.style.display = 'none';
    }
}

