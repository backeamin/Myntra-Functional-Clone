let bagItemObjects;
let convenience_fee = bagItems.length !== 0? 99:0;
console.log(bagItems.length);
onload();
function onload() {
    generateIdToItem();
    displayBagContents();
    displayBagSummary();
}

function generateIdToItem() {
    bagItemObjects = bagItems.map(itemId =>{
        for (i = 0; i < items.length; i++) {
            if (itemId == items[i].id){
                return items[i];
            }
        }
    });
}
function displayBagContents(){
     let bagItemsContainer = document.querySelector('.bag-items-container')
     let innerHTML = '';

    bagItemObjects.forEach(bagItem => {
        innerHTML += generateBagHtml(bagItem);
     });

     bagItemsContainer.innerHTML = innerHTML;
}

function displayBagSummary() {
    let bagSummaryContainer = document.querySelector('.bag-summary');
    let totalItems = bagItems.length;
    let totalMrp = 0;
    let totalDiscount = 0;

    bagItemObjects.forEach(item => {
       totalMrp += item.original_price;
       totalDiscount += (item.original_price - item.current_price);
    });
    let totalAmount = totalMrp - totalDiscount + convenience_fee; // Adding convenience fee

    bagSummaryContainer.innerHTML = `
    <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Tk ${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Tk ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Tk ${convenience_fee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Tk ${totalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
`;
}

function removeItemFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    generateIdToItem();
    displayBagContents();
    displayBagItems();
    bagItems.length===0? convenience_fee = 0: convenience_fee = 99;
    displayBagSummary();
}

function generateBagHtml(item){
    return `
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Tk ${item.current_price}</span>
                <span class="original-price">Tk ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeItemFromBag(${item.id})">X</div>
          </div>
    `;
}