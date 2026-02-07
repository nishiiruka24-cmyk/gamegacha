// ==========================================
// 設定エリア
// ==========================================
const characterList = [
    { id: '001', rarity: 'SSR', title: '春を切り裂く風', name: '春花 ' },
    { id: '002', rarity: 'SSR', title: '実験開始の合図', name: 'ソラ' },
    { id: '003', rarity: 'SSR', title: '氷結と稲妻の申子', name: 'リノ ' },
    { id: '004', rarity: 'SR', title: '異界の主人公', name: '八神 颯人 ' },
    { id: '006', rarity: 'SSR', title: '著作権の侵害', name: 'キュアアルカナ・シャドウ ' },
    { id: '007', rarity: 'R', title: '夏の荒波', name: '夏芽 ' },
    { id: '008', rarity: 'R', title: '秋の一矢', name: '紅葉 ' },
    { id: '009', rarity: 'SR', title: '孤高の天女', name: '雫 ' },
    { id: '010', rarity: 'R', title: '水流の騎士', name: 'ダンデ ' },
    { id: '005', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '011', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '012', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '013', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '014', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '015', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '016', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '017', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '018', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '019', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    //{ id: '020', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    // 必要に応じてここに行を足してください
];

const dropRates = { SSR: 5, SR: 15, R: 80 };

// ==========================================
// 要素の取得
// ==========================================
const mainScreen = document.getElementById('main-screen');
const resultScreen = document.getElementById('result-screen');
const resultGrid = document.getElementById('result-grid');
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImg = document.getElementById('fullscreen-img');
const skipBtn = document.getElementById('skip-btn');
const flashEffect = document.getElementById('flash-effect');

const fsRarity = document.getElementById('fs-rarity');
const fsTitle = document.getElementById('fs-title');
const fsName = document.getElementById('fs-name');

const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalRarity = document.getElementById('modal-rarity');
const modalTitle = document.getElementById('modal-title');
const modalName = document.getElementById('modal-name');

const collectionScreen = document.getElementById('collection-screen');
const collectionGrid = document.getElementById('collection-grid');
const colBackBtn = document.getElementById('col-back-btn');
const colToggleBtn = document.getElementById('col-toggle-btn');
const collectionBtn = document.getElementById('collection-btn');

// ★追加：石表示エリア
const stoneDisplay = document.getElementById('stone-display');

// ==========================================
// 状態変数
// ==========================================
let currentResults = [];
let currentIndex = 0;
let userCollection = []; // ローカルストレージは使用しない

// ==========================================
// イベント
// ==========================================
// ★変更：ボタンクリック時に条件チェックをより厳密に
document.getElementById('draw-1-btn').addEventListener('click', () => {
    attemptGacha(1);
});

document.getElementById('draw-10-btn').addEventListener('click', () => {
    attemptGacha(10);
});

overlay.addEventListener('click', (e) => {
    if (e.target === skipBtn) return;
    showNextImage();
});

skipBtn.addEventListener('click', () => showResultList());
resultScreen.addEventListener('click', () => resetToTitle());
imageModal.addEventListener('click', () => imageModal.classList.add('hidden'));

collectionBtn.addEventListener('click', () => showCollectionScreen());
colBackBtn.addEventListener('click', () => {
    collectionScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
});

colToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('hide-info');
});

// ==========================================
// ロジック
// ==========================================

// ★新設：ガチャ実行の試行関数（コスト不足なら止める）
function attemptGacha(times) {
    const cost = times * 150;

    // money.jsの関数でチェック。falseなら即終了
    if (!consumeStones(cost)) {
        if (confirm(`魔法石が足りません（必要: ${cost}個 / 所持: ${userStones}個）。\nショップへ移動しますか？`)) {
            openShop(); // money.js の関数
        }
        return; // ここで処理を完全にストップさせる
    }

    // お金が足りていればガチャ開始
    startGachaProcess(times);
}

function startGachaProcess(times) {
    // ★演出開始：石の表示を隠す
    stoneDisplay.classList.add('hidden');

    currentResults = [];
    for (let i = 0; i < times; i++) {
        const rarity = pickRarity();
        const char = pickCharacterByRarity(rarity);
        currentResults.push(char);
        addToCollection(char.id);
    }
    currentIndex = 0;
    mainScreen.classList.add('hidden');
    overlay.classList.remove('hidden');
    updateOverlayImage();
}

function addToCollection(id) {
    if (!userCollection.includes(id)) {
        userCollection.push(id);
    }
}

function showNextImage() {
    currentIndex++;
    if (currentIndex < currentResults.length) {
        updateOverlayImage();
    } else {
        showResultList();
    }
}

function updateOverlayImage() {
    const char = currentResults[currentIndex];

    fullscreenImg.style.opacity = '0';
    resetTextAnimation();

    if (flashEffect) {
        flashEffect.className = '';
        flashEffect.classList.add(`flash-${char.rarity}`);
        flashEffect.classList.remove('play-flash');
        void flashEffect.offsetWidth;
        flashEffect.classList.add('play-flash');
    }

    fsRarity.innerHTML = `<img src="rarity/${char.rarity}.png" onerror="this.src='rarity/${char.rarity}.jpg'" class="rarity-icon-large">`;
    fsTitle.textContent = char.title;
    fsName.textContent = char.name;

    fullscreenImg.src = `character/${char.id}.png`;
    fullscreenImg.onerror = function () { this.src = `character/${char.id}.jpg`; };

    setTimeout(() => {
        fullscreenImg.style.animation = 'none';
        fullscreenImg.style.opacity = '1';
        startTextAnimation();
    }, 100);
}

function resetTextAnimation() {
    fsRarity.className = ''; fsTitle.className = ''; fsName.className = '';
}
function startTextAnimation() {
    fsRarity.classList.add('slide-in');
    fsTitle.classList.add('slide-in-delay-1');
    fsName.classList.add('slide-in-delay-2');
}

function showResultList() {
    // ★結果画面になったら石表示を復活させる
    stoneDisplay.classList.remove('hidden');

    overlay.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    createGridItems(currentResults, resultGrid);
}

function showCollectionScreen() {
    mainScreen.classList.add('hidden');
    collectionScreen.classList.remove('hidden');
    const ownedChars = characterList.filter(char => userCollection.includes(char.id));
    createGridItems(ownedChars, collectionGrid);
}

function createGridItems(chars, container) {
    container.innerHTML = '';
    chars.forEach(char => {
        const card = document.createElement('div');
        card.className = `result-card rarity-${char.rarity}`;

        card.innerHTML = `
            <img src="character/${char.id}.png" onerror="this.src='character/${char.id}.jpg'" class="char-img">
            <div class="card-info-overlay">
                <img src="rarity/${char.rarity}.png" onerror="this.src='rarity/${char.rarity}.jpg'" class="rarity-icon-small">
                <div class="card-name-group">
                    <span class="card-title">${char.title}</span>
                    <span class="card-name">${char.name}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImg.src = `character/${char.id}.png`;
            modalImg.onerror = function () { this.src = `character/${char.id}.jpg`; };

            modalRarity.innerHTML = `<img src="rarity/${char.rarity}.png" onerror="this.src='rarity/${char.rarity}.jpg'" class="rarity-icon-large">`;
            modalTitle.textContent = char.title;
            modalName.textContent = char.name;
            imageModal.classList.remove('hidden');
        });

        container.appendChild(card);
    });
}

function resetToTitle() {
    // ★タイトルに戻る際も石表示を確実に復活
    stoneDisplay.classList.remove('hidden');

    resultScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
}

function pickRarity() {
    const r = Math.random() * 100;
    if (r < dropRates.SSR) return 'SSR';
    if (r < dropRates.SSR + dropRates.SR) return 'SR';
    return 'R';
}

function pickCharacterByRarity(rarity) {
    const list = characterList.filter(c => c.rarity === rarity);
    if (list.length === 0) return { id: '000', rarity: 'Error', title: 'Error', name: 'No Data' };
    return list[Math.floor(Math.random() * list.length)];
}