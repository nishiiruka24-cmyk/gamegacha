// ==========================================
// 石（通貨）システム
// ==========================================
let userStones = 3000;

const products = [
    { stones: 150, price: 120 },
    { stones: 300, price: 240 },
    { stones: 1500, price: 1200 },
    { stones: 4500, price: 3600 },
    { stones: 9000, price: 7200 },
    { stones: 15000, price: 11800 }
];

let selectedProduct = null;

// ==========================================
// DOM要素
// ==========================================
const stoneCountEl = document.getElementById('stone-count');
const addStoneBtn = document.getElementById('add-stone-btn');
const shopModal = document.getElementById('shop-modal');
const shopCloseBtn = document.getElementById('shop-close-btn');

const stepAge = document.getElementById('shop-step-age');
const stepProduct = document.getElementById('shop-step-product');
const stepPayment = document.getElementById('shop-step-payment');

const productGrid = document.querySelector('.product-grid');
const paymentInfo = document.getElementById('payment-target-info');
const payBtn = document.getElementById('pay-btn');
const cardNumberInput = document.getElementById('card-number');

// ==========================================
// 初期化 & イベント
// ==========================================
updateStoneDisplay();

addStoneBtn.addEventListener('click', () => {
    playSE('click'); // ★クリック音
    openShop();
});

shopCloseBtn.addEventListener('click', () => {
    playSE('click'); // ★クリック音
    handleBack();
});

payBtn.addEventListener('click', () => {
    playSE('click'); // ★クリック音
    processPayment();
});

// ==========================================
// 基本機能
// ==========================================
function updateStoneDisplay() {
    stoneCountEl.textContent = userStones.toLocaleString();
}

function consumeStones(amount) {
    if (userStones >= amount) {
        userStones -= amount;
        updateStoneDisplay();
        return true;
    } else {
        return false;
    }
}

// ==========================================
// ショップ機能
// ==========================================
function openShop() {
    shopModal.classList.remove('hidden');
    showStep('age');
}

function closeShop() {
    shopModal.classList.add('hidden');
}

function showStep(stepName) {
    stepAge.classList.add('hidden');
    stepProduct.classList.add('hidden');
    stepPayment.classList.add('hidden');

    if (stepName === 'age') {
        stepAge.classList.remove('hidden');
    } else if (stepName === 'product') {
        renderProducts();
        stepProduct.classList.remove('hidden');
    } else if (stepName === 'payment') {
        stepPayment.classList.remove('hidden');
    }
}

function handleBack() {
    if (!stepPayment.classList.contains('hidden')) {
        showStep('product');
    } else if (!stepProduct.classList.contains('hidden')) {
        showStep('age');
    } else {
        closeShop();
    }
}

function setAgeLimit(type) {
    playSE('click'); // ★クリック音
    showStep('product');
}

function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="isi/isi.png" class="product-img">
            <div class="product-name">石 ${p.stones.toLocaleString()}個</div>
            <div class="product-price">¥${p.price.toLocaleString()}</div>
        `;
        div.onclick = () => {
            playSE('click'); // ★クリック音
            selectProduct(p);
        };
        productGrid.appendChild(div);
    });
}

function selectProduct(product) {
    selectedProduct = product;
    paymentInfo.innerHTML = `
        購入内容: <strong>魔法石 ${product.stones}個</strong><br>
        請求金額: <strong>¥${product.price}</strong>
    `;
    cardNumberInput.value = '';
    showStep('payment');
}

function processPayment() {
    const cardNum = cardNumberInput.value;
    
    if (cardNum.length < 1) {
        alert('カード番号を入力してください');
        return;
    }

    if(confirm(`¥${selectedProduct.price} で決済しますか？`)) {
        playSE('pay'); // ★課金成功音！
        alert('購入が完了しました！');
        
        userStones += selectedProduct.stones;
        updateStoneDisplay();
        closeShop();
    }
}