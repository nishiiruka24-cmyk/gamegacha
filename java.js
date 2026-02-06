// ==========================================
// 設定エリア
// ==========================================
const characterList = [
    { id: '001', rarity: 'SSR' },
    { id: '002', rarity: 'SR' },
    { id: '003', rarity: 'R' },
    { id: '004', rarity: 'R' },
    { id: '005', rarity: 'R' },
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

// ==========================================
// 状態管理用変数
// ==========================================
let currentResults = []; // 引いた結果のリスト
let currentIndex = 0;    // 今何枚目を表示しているか

// ==========================================
// イベントリスナー（ボタン操作など）
// ==========================================

// ガチャボタン
document.getElementById('draw-1-btn').addEventListener('click', () => startGacha(1));
document.getElementById('draw-10-btn').addEventListener('click', () => startGacha(10));

// オーバーレイ（画像）クリック時の処理
overlay.addEventListener('click', (e) => {
    // スキップボタンを押したときは、この処理を無視する
    if (e.target === skipBtn) return;

    showNextImage();
});

// スキップボタン
skipBtn.addEventListener('click', () => {
    showResultList(); // 強制的に結果一覧へ
});

// 結果一覧画面をクリックしたらタイトルに戻る
resultScreen.addEventListener('click', () => {
    resetToTitle();
});

// ==========================================
// ガチャのロジック関数
// ==========================================

// 1. ガチャを開始する
function startGacha(times) {
    // 結果を生成して保存
    currentResults = [];
    for (let i = 0; i < times; i++) {
        const rarity = pickRarity();
        currentResults.push(pickCharacterByRarity(rarity));
    }

    // 状態をリセットして演出開始
    currentIndex = 0;
    mainScreen.classList.add('hidden'); // タイトル消す
    overlay.classList.remove('hidden'); // 演出画面出す

    // 1枚目を表示
    updateOverlayImage();
}

// 2. 次の画像を表示する（クリックされると呼ばれる）
function showNextImage() {
    currentIndex++; // 次の番号へ

    if (currentIndex < currentResults.length) {
        // まだ画像があるなら表示更新
        updateOverlayImage();
    } else {
        // もう画像がないなら結果一覧へ
        showResultList();
    }
}

// 3. オーバーレイの画像を更新する処理
function updateOverlayImage() {
    const char = currentResults[currentIndex];
    // 画像を一瞬消して再表示することでアニメーションをリセットさせる小技
    fullscreenImg.style.animation = 'none';
    fullscreenImg.offsetHeight; /* trigger reflow */
    fullscreenImg.style.animation = 'fadeIn 0.3s ease-out';

    fullscreenImg.src = `character/${char.id}.png`;
}

// 4. 結果一覧画面を表示する
function showResultList() {
    overlay.classList.add('hidden');       // 演出消す
    resultScreen.classList.remove('hidden'); // 結果一覧出す

    // グリッドの中身を作る
    resultGrid.innerHTML = '';
    currentResults.forEach(char => {
        const card = document.createElement('div');
        card.className = `result-card rarity-${char.rarity}`;
        card.innerHTML = `
            <img src="character/${char.id}.png">
            <p>${char.rarity}</p>
        `;
        resultGrid.appendChild(card);
    });
}

// 5. タイトル画面に戻る
function resetToTitle() {
    resultScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
}

// ==========================================
// 抽選ロジック（変更なし）
// ==========================================
function pickRarity() {
    const r = Math.random() * 100;
    if (r < dropRates.SSR) return 'SSR';
    if (r < dropRates.SSR + dropRates.SR) return 'SR';
    return 'R';
}

function pickCharacterByRarity(rarity) {
    const list = characterList.filter(c => c.rarity === rarity);
    if (list.length === 0) return { id: '000', rarity: 'Error' }; // エラー回避
    return list[Math.floor(Math.random() * list.length)];
}