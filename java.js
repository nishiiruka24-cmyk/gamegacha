// ==========================================
// 設定エリア
// ==========================================
// ★ここに追加：ピックアップキャラクターの設定リスト
// メイン画面のバナーに表示される順番です
const pickupList = [
    {
        id: '003',
        rarity: 'SSR',
        title: '氷結と稲妻の申子',
        name: 'リノ',
        desc: '強力な氷と雷を操る少女。<br>強力な攻撃で敵を倒す彼女を仲間にしよう！',
        period: '期間：2/1 ~ 2/15'
    },
    {
        id: '001',
        rarity: 'SSR',
        title: '春を切り裂く風',
        name: '春花',
        desc: '桜の花びらのごとく華麗に舞い戦う少女。<br>春の力を受け継いだ彼女を仲間にしよう！',
        period: '期間：2/1 ~ 2/15'
    },
    {
        id: '002',
        rarity: 'SSR',
        title: '実験開始の合図',
        name: 'ソラ',
        desc: '若き天才科学者。<br>知識を武器に戦う彼女を仲間にしよう！',
        period: '期間：2/1 ~ 2/15'
    }
    // ここに追加していけばスライドが増えます
];
const characterList = [
    { id: '001', rarity: 'SSR', title: '春を切り裂く風', name: '春花 ' },
    { id: '002', rarity: 'SSR', title: '実験開始の合図', name: 'ソラ' },
    { id: '003', rarity: 'SSR', title: '氷結と稲妻の申子', name: 'リノ ' },
    { id: '004', rarity: 'SR', title: '異界の主人公', name: '八神 颯人 ' },
    // { id: '006', rarity: 'SSR', title: '著作権の侵害', name: 'キュアアルカナ・シャドウ ' },
    { id: '007', rarity: 'R', title: '夏の荒波', name: '夏芽 ' },
    { id: '008', rarity: 'R', title: '秋の一矢', name: '紅葉 ' },
    { id: '009', rarity: 'SR', title: '孤高の天女', name: '雫 ' },
    { id: '010', rarity: 'R', title: '水流の騎士', name: 'ダンデ ' },
    { id: '005', rarity: 'R', title: '聖なる魔法', name: 'マリア ' },
    { id: '011', rarity: 'R', title: '冬の一刺', name: '雪乃 ' },
    { id: '012', rarity: 'SR', title: '血石の信者', name: 'メア ' },
    { id: '013', rarity: 'SSR', title: '血色の女王', name: 'メア ' },
    { id: '014', rarity: 'R', title: '炎の団長', name: 'アレン ' },
    { id: '015', rarity: 'SR', title: '幸運の囁き', name: 'カエデ ' },
    { id: '016', rarity: 'R', title: '拳法の使い手', name: 'リン ' },
    { id: '017', rarity: 'R', title: '冷徹なる魔術師', name: 'ゼクス ' },
    { id: '018', rarity: 'R', title: '高貴なる姫', name: 'シャルロット ' },
    { id: '019', rarity: 'R', title: '軍への忠誠', name: 'ヴァイオレット ' },
    { id: '020', rarity: 'R', title: '時を操るエージェント', name: 'K ' },
    { id: '021', rarity: 'R', title: '宇宙海賊の姉御', name: 'ミラ' },
    { id: '022', rarity: 'R', title: '電脳アイドル', name: 'ネオン' },
    { id: '023', rarity: 'SSR', title: '物語の始まりを告げる', name: 'ルルセア' },
    { id: '024', rarity: 'R', title: '主導権の剥奪', name: 'マリオネット' },
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

const stoneDisplay = document.getElementById('stone-display');

// バナー用要素
const bannerImg = document.getElementById('banner-img');
const bannerRarity = document.getElementById('banner-rarity');
const bannerTitle = document.getElementById('banner-title');
const bannerName = document.getElementById('banner-name');
const bannerDesc = document.getElementById('banner-desc');
const bannerPeriod = document.getElementById('banner-period');
const bannerPrev = document.getElementById('banner-prev');
const bannerNext = document.getElementById('banner-next');

// ==========================================
// 状態変数
// ==========================================
let currentResults = [];
let currentIndex = 0;
let userCollection = [];

// バナーの現在のインデックス
let currentPickupIndex = 0;
// 自動切り替え用タイマーID
let autoSlideInterval;

// ==========================================
// 初期化処理
// ==========================================
updateBannerDisplay();
startAutoSlide();

// ==========================================
// イベント
// ==========================================

bannerPrev.addEventListener('click', () => {
    playSE('click');
    prevBanner();
    resetAutoSlide();
});

bannerNext.addEventListener('click', () => {
    playSE('click');
    nextBanner();
    resetAutoSlide();
});

document.getElementById('draw-1-btn').addEventListener('click', () => {
    playSE('click');
    attemptGacha(1);
});

document.getElementById('draw-10-btn').addEventListener('click', () => {
    playSE('click');
    attemptGacha(10);
});

overlay.addEventListener('click', (e) => {
    if (e.target === skipBtn) return;
    showNextImage();
});

skipBtn.addEventListener('click', () => {
    playSE('click');
    showResultList();
});

resultScreen.addEventListener('click', () => {
    playSE('click');
    resetToTitle();
});

imageModal.addEventListener('click', () => imageModal.classList.add('hidden'));

collectionBtn.addEventListener('click', () => {
    playSE('click');
    showCollectionScreen();
});

colBackBtn.addEventListener('click', () => {
    playSE('click');
    collectionScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
});

colToggleBtn.addEventListener('click', () => {
    playSE('click');
    document.body.classList.toggle('hide-info');
});

// ==========================================
// ロジック
// ==========================================

function nextBanner() {
    currentPickupIndex++;
    if (currentPickupIndex >= pickupList.length) currentPickupIndex = 0;
    updateBannerDisplay();
}

function prevBanner() {
    currentPickupIndex--;
    if (currentPickupIndex < 0) currentPickupIndex = pickupList.length - 1;
    updateBannerDisplay();
}

function updateBannerDisplay() {
    const data = pickupList[currentPickupIndex];

    bannerImg.src = `character/${data.id}.png`;
    bannerImg.onerror = function () { this.src = `character/${data.id}.jpg`; };

    bannerRarity.innerHTML = `<img src="rarity/${data.rarity}.png" onerror="this.src='rarity/${data.rarity}.jpg'">`;

    bannerTitle.textContent = data.title;
    bannerName.textContent = data.name;
    bannerDesc.innerHTML = data.desc;
    bannerPeriod.textContent = data.period;
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextBanner();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// --------------------------------------------------

function attemptGacha(times) {
    const cost = times * 150;

    if (!consumeStones(cost)) {
        if (confirm(`魔法石が足りません（必要: ${cost}個 / 所持: ${userStones}個）。\nショップへ移動しますか？`)) {
            playSE('click');
            openShop();
        }
        return;
    }

    startGachaProcess(times);
}

function startGachaProcess(times) {
    playSE('gacha');
    stoneDisplay.classList.add('hidden');
    clearInterval(autoSlideInterval);

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
        playSE('result');

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
    stoneDisplay.classList.remove('hidden');
    overlay.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    createGridItems(currentResults, resultGrid);
}

// ★修正：コレクション画面表示（ソート処理追加）
function showCollectionScreen() {
    mainScreen.classList.add('hidden');
    collectionScreen.classList.remove('hidden');

    // 1. 持っているキャラを抽出
    let ownedChars = characterList.filter(char => userCollection.includes(char.id));

    // 2. レアリティの優先順位を定義
    const rarityPriority = { 'SSR': 3, 'SR': 2, 'R': 1 };

    // 3. ソート実行 (SSR > SR > R の順)
    ownedChars.sort((a, b) => {
        const priorityA = rarityPriority[a.rarity] || 0;
        const priorityB = rarityPriority[b.rarity] || 0;
        // 降順（数字が大きい方が先）
        return priorityB - priorityA;
    });

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
            playSE('click');
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
    stoneDisplay.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    resetAutoSlide();
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