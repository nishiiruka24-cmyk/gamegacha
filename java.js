// ==========================================
// 設定エリア（データベース）
// ==========================================

const characterList = [
    { id: '001', rarity: 'SSR', title: '春を切り裂く風', name: '春花' },
    { id: '002', rarity: 'SSR', title: '実験開始の合図', name: 'ソラ' },
    { id: '003', rarity: 'SSR', title: '氷結と稲妻の申子', name: 'リノ' },
    { id: '004', rarity: 'SR', title: '異界の主人公', name: '八神 颯人' },
    { id: '005', rarity: 'R', title: '聖なる魔法', name: 'マリア' },
    //{ id: '006', rarity: 'SSR', title: '著作権の侵害', name: 'キュアアルカナ・シャドウ' },
    { id: '007', rarity: 'R', title: '夏の荒波', name: '夏芽' },
    { id: '008', rarity: 'R', title: '秋の一矢', name: '紅葉' },
    { id: '009', rarity: 'SR', title: '孤高の天女', name: '雫' },
    { id: '010', rarity: 'R', title: '水流の騎士', name: 'ダンデ' },
    { id: '011', rarity: 'R', title: '冬の一刺', name: '雪乃' },
    { id: '012', rarity: 'SR', title: '血石の信者', name: 'メア' },
    { id: '013', rarity: 'SSR', title: '血色の女王', name: 'メア' },
    { id: '014', rarity: 'R', title: '炎の団長', name: 'アレン' },
    { id: '015', rarity: 'SR', title: '幸運の囁き', name: 'カエデ' },
    { id: '016', rarity: 'R', title: '拳法の使い手', name: 'リン' },
    { id: '017', rarity: 'R', title: '冷徹なる魔術師', name: 'ゼクス' },
    { id: '018', rarity: 'R', title: '高貴なる姫', name: 'シャルロット' },
    { id: '019', rarity: 'R', title: '軍への忠誠', name: 'ヴァイオレット' },
    { id: '020', rarity: 'R', title: '時を操るエージェント', name: 'K' },
    { id: '021', rarity: 'R', title: '宇宙海賊の姉御', name: 'ミラ' },
    { id: '022', rarity: 'R', title: '電脳アイドル', name: 'ネオン' },
    { id: '023', rarity: 'SSR', title: '物語の始まりを告げる', name: 'ルルセア' },
    { id: '024', rarity: 'R', title: '主導権の剥奪', name: 'マリオネット' },
    { id: '025', rarity: 'UR', title: '孤高に舞う雪猫', name: 'リノ（猫耳）' },
    { id: '026', rarity: 'SR', title: '月の民', name: 'カグヤ' },
    { id: '027', rarity: 'R', title: '芸術の虜', name: 'ピカソ' },
    { id: '028', rarity: 'R', title: 'パティシエ見習い', name: 'ショコラ' },
    { id: '029', rarity: 'R', title: 'マジックの始まり', name: 'バロン' },
    { id: '030', rarity: 'R', title: 'ロックなギタリスト', name: 'ガイ' },
    { id: '031', rarity: 'SR', title: '雷の一太刀', name: 'シオン' }
];

// ==========================================
// ★ガチャ（バナー）設定エリア
// ==========================================
/*
  excludedIds: そのガチャから出現させたくないキャラIDのリストを追加しました。
  空の配列 [] なら全キャラ（レアリティ抽選に従って）出現します。
*/

const gachaBanners = [
    // --- ガチャ1 ---
    {
        id: 'banner_rino',
        gachaTitle: '【期間限定】孤高に舞う雪猫ガチャ',
        cost: 150,
        rates: { UR: 3, SSR: 5, SR: 15, R: 77 },
        pickupIds: ['025'],
        pickupRate: 1,
        excludedIds: [], 
        desc: '猫耳の姿となったリノ。<br>氷山の中を駆け回る彼女を仲間にしよう！',
        period: '期間：2/1 ~ 2/15',
        visuals: [
            { imgId: '025', title: '孤高に舞う雪猫', name: 'リノ（猫耳）' }
        ]
    },
    {
        id: 'banner_rino',
        gachaTitle: '【日替わりピックアップ】氷結と稲妻ピックアップガチャ',
        cost: 150,
        rates: { SSR: 5, SR: 15, R: 80 },
        pickupIds: ['003'],
        pickupRate: 0.7,
        excludedIds: ['025'], 
        desc: '強力な氷と雷を操る少女。<br>強力な攻撃で敵を倒す彼女を仲間にしよう！',
        period: '期間：2/1 ~ 2/15',
        visuals: [
            { imgId: '003', title: '氷結と稲妻の申子', name: 'リノ' }
        ]
    },
    // --- ガチャ2 ---
    {
        id: 'banner_double',
        gachaTitle: '【イベント】春花＆ソラ ダブルピックアップ',
        cost: 150,
        rates: { SSR: 5, SR: 15, R: 80 },
        pickupIds: ['001', '002'],
        pickupRate: 0.5,
        // ★ここ：除外なし（全員出る）
        excludedIds: ['025'], 
        desc: '春花とソラがダブルピックアップ！<br>二人の天才をチームに加えるチャンス。',
        period: '期間：2/1 ~ 2/15',
        visuals: [
            { imgId: '001', title: '春を切り裂く風', name: '春花' },
            { imgId: '002', title: '実験開始の合図', name: 'ソラ' }
        ]
    },
    // --- ガチャ3 ---
    {
        id: 'banner_fest',
        gachaTitle: '【祝】サービス開始記念ドリームフェス',
        cost: 150,
        rates: { SSR: 10, SR: 20, R: 70 },
        pickupIds: [],
        pickupRate: 1,
        // ★ここ：このガチャでの除外設定
        excludedIds: ['025'], 
        desc: 'SSR確率2倍！<br>最強のキャラたちを手に入れるチャンス。',
        period: '期間：2/9 ~ 2/11',
        visuals: [
            { imgId: '001', title: '春を切り裂く風', name: '春花' },
            { imgId: '002', title: '実験開始の合図', name: 'ソラ' },
            { imgId: '003', title: '氷結と稲妻の申子', name: 'リノ' },
            { imgId: '013', title: '血色の女王', name: 'メア' },
            { imgId: '023', title: '物語の始まりを告げる', name: 'ルルセア' }
        ]
    }
];

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
const currentGachaTitle = document.getElementById('current-gacha-title');

const costText1 = document.getElementById('cost-text-1');
const costText10 = document.getElementById('cost-text-10');

// バナー用要素
const bannerContent = document.querySelector('.banner-content');
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

let currentBannerIndex = 0;
let currentVisualIndex = 0;

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
    changeBanner(-1);
});

bannerNext.addEventListener('click', () => {
    playSE('click');
    changeBanner(1);
});

if (bannerContent) {
    bannerContent.addEventListener('click', () => {
        playSE('click');
        changeVisual(1);
        resetAutoSlide();
    });
}

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

function changeBanner(direction) {
    currentBannerIndex += direction;
    if (currentBannerIndex >= gachaBanners.length) currentBannerIndex = 0;
    if (currentBannerIndex < 0) currentBannerIndex = gachaBanners.length - 1;
    
    currentVisualIndex = 0;
    updateBannerDisplay();
    resetAutoSlide();
}

function changeVisual(direction) {
    const banner = gachaBanners[currentBannerIndex];
    if (!banner.visuals || banner.visuals.length === 0) return;

    currentVisualIndex += direction;
    if (currentVisualIndex >= banner.visuals.length) currentVisualIndex = 0;
    
    updateBannerDisplay();
}

function updateBannerDisplay() {
    const banner = gachaBanners[currentBannerIndex];
    const visualInfo = banner.visuals[currentVisualIndex];
    const targetChar = characterList.find(c => c.id === visualInfo.imgId);
    const rarity = targetChar ? targetChar.rarity : 'SSR';

    currentGachaTitle.textContent = banner.gachaTitle;
    const currentCost = banner.cost || 150;
    if (costText1) costText1.textContent = currentCost;
    if (costText10) costText10.textContent = currentCost * 10;

    bannerImg.src = `character/${visualInfo.imgId}.png`;
    bannerImg.onerror = function () { this.src = `character/${visualInfo.imgId}.jpg`; };

    bannerRarity.innerHTML = `<img src="rarity/${rarity}.png" onerror="this.src='rarity/${rarity}.jpg'" class="rarity-${rarity}">`;

    bannerTitle.textContent = visualInfo.title;
    bannerName.textContent = visualInfo.name;
    
    bannerDesc.innerHTML = banner.desc;
    bannerPeriod.textContent = banner.period;
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeVisual(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ==========================================
// ガチャ抽選ロジック
// ==========================================

function attemptGacha(times) {
    const currentBanner = gachaBanners[currentBannerIndex];
    const unitCost = currentBanner.cost || 150;
    const totalCost = times * unitCost;

    if (!consumeStones(totalCost)) {
        if (confirm(`魔法石が足りません。ショップへ移動しますか？`)) {
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

    const currentBanner = gachaBanners[currentBannerIndex];

    currentResults = [];
    for (let i = 0; i < times; i++) {
        const rarity = pickRarityDynamic(currentBanner.rates);
        const char = pickCharacterWithPickup(rarity, currentBanner);
        
        currentResults.push(char);
        addToCollection(char.id);
    }
    
    currentIndex = 0;
    mainScreen.classList.add('hidden');
    overlay.classList.remove('hidden');
    updateOverlayImage();
}

function pickRarityDynamic(rates) {
    const rand = Math.random() * 100;
    let total = 0;
    
    for (const rarity in rates) {
        total += rates[rarity];
        if (rand < total) {
            return rarity;
        }
    }
    return Object.keys(rates).pop(); 
}

function pickCharacterWithPickup(rarity, banner) {
    let charsOfRarity = characterList.filter(c => c.rarity === rarity);

    const exclusions = banner.excludedIds || [];
    charsOfRarity = charsOfRarity.filter(c => !exclusions.includes(c.id));
    
    if (charsOfRarity.length === 0) return { id: '000', rarity: 'Error', title: 'Error', name: 'No Data' };

    const pickupsInRarity = charsOfRarity.filter(c => banner.pickupIds.includes(c.id));
    
    if (pickupsInRarity.length > 0 && Math.random() < banner.pickupRate) {
        return pickupsInRarity[Math.floor(Math.random() * pickupsInRarity.length)];
    } else {
        return charsOfRarity[Math.floor(Math.random() * charsOfRarity.length)];
    }
}

// ==========================================
// 演出・表示関連
// ==========================================

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

    fsRarity.innerHTML = `<img src="rarity/${char.rarity}.png" onerror="this.src='rarity/${char.rarity}.jpg'" class="rarity-icon-large rarity-${char.rarity}">`;
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

function showCollectionScreen() {
    mainScreen.classList.add('hidden');
    collectionScreen.classList.remove('hidden');

    let ownedChars = characterList.filter(char => userCollection.includes(char.id));

    const rarityPriority = { 'UR': 4, 'SSR': 3, 'SR': 2, 'R': 1 };

    ownedChars.sort((a, b) => {
        const priorityA = rarityPriority[a.rarity] || 0;
        const priorityB = rarityPriority[b.rarity] || 0;
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
                <img src="rarity/${char.rarity}.png" onerror="this.src='rarity/${char.rarity}.jpg'" class="rarity-icon-small rarity-${char.rarity}">
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

            modalRarity.innerHTML = `<img src="rarity/${char.rarity}.png" onerror="this.src='rarity/${char.rarity}.jpg'" class="rarity-icon-large rarity-${char.rarity}">`;
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