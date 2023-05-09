

function dropdown() {
    var mylist = document.getElementById("myList");
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
}

function addC(product) {
    let balance = document.getElementById('balance');

    balance.innerHTML = parseFloat(Number(balance.innerHTML).toFixed(2)) + parseFloat(Number(product.getAttribute('data-price')).toFixed(3));
}

window.addEventListener("load", function() {
    orderForm.elements.model.focus();

    calcOrder();

    orderForm.elements.model.onchange = calcOrder;
    orderForm.elements.qty.onchange = calcOrder;

    var planOptions = document.querySelectorAll('input[name="protection"]');
    for(var i = 0; i < planOptions.length; i++) {
        planOptions[i].onclick = calcOrder;
    }
});

function calcOrder() {
    var orderForm = document.forms.orderForm;

    var mIndex = orderForm.elements.model.selectedIndex;
    var mCost = orderForm.elements.model.options[mIndex].value;
    var qIndex = orderForm.elements.qty.selectedIndex;
    var quantity = orderForm.elements.qty[qIndex].value;

    var initialCost = mCost * quantity;
    orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

    var pCost = document.querySelector("input[name='protection']:checked").value * quantity;
    orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

    


    var totalCost = initialCost + pCost;
    orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

    orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
    orderForm.elements.protectionName.value = document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"});
}