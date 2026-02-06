// ==========================================
// 設定エリア
// ==========================================
const characterList = [
    { id: '001', rarity: 'SSR' },
    { id: '002', rarity: 'SSR' },
    { id: '003', rarity: 'SSR' },
    { id: '004', rarity: 'SR' },
    { id: '005', rarity: 'R' },
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
const flashEffect = document.getElementById('flash-effect'); // 光る演出用

const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

// ==========================================
// 状態管理用変数
// ==========================================
let currentResults = []; // 引いた結果のリスト
let currentIndex = 0;    // 今何枚目を表示しているか

// ==========================================
// イベントリスナー（クリック操作などの登録）
// ==========================================

// ガチャボタン
document.getElementById('draw-1-btn').addEventListener('click', () => startGacha(1));
document.getElementById('draw-10-btn').addEventListener('click', () => startGacha(10));

// 全画面演出中のクリック（次の画像へ）
overlay.addEventListener('click', (e) => {
    // スキップボタンを押したときは、ここでの処理を無視
    if (e.target === skipBtn) return;

    showNextImage();
});

// スキップボタン
skipBtn.addEventListener('click', () => {
    showResultList(); // 結果一覧へジャンプ
});

// 結果一覧画面の背景クリック（タイトルへ戻る）
resultScreen.addEventListener('click', () => {
    resetToTitle();
});

// 拡大画像の閉じるクリック
imageModal.addEventListener('click', () => {
    imageModal.classList.add('hidden');
});

// ==========================================
// ガチャのロジック関数
// ==========================================

// 1. ガチャを開始する処理
function startGacha(times) {
    // 抽選を行う
    currentResults = [];
    for (let i = 0; i < times; i++) {
        const rarity = pickRarity();
        currentResults.push(pickCharacterByRarity(rarity));
    }

    // 画面切り替え（タイトルを隠して、演出を表示）
    currentIndex = 0;
    mainScreen.classList.add('hidden');
    overlay.classList.remove('hidden');

    // 1枚目を表示
    updateOverlayImage();
}

// 2. 次の画像を表示する処理
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

// 3. 全画面画像を更新する処理（光る演出付き）
function updateOverlayImage() {
    const char = currentResults[currentIndex];

    // 一旦画像を透明にする（光っている間に切り替えるため）
    fullscreenImg.style.opacity = '0';

    // フラッシュの色を設定（SSRなら金、SRなら銀など）
    if (flashEffect) {
        flashEffect.className = ''; // クラスをリセット
        flashEffect.classList.add(`flash-${char.rarity}`);

        // アニメーションをリセットして再生（強制再描画テクニック）
        flashEffect.classList.remove('play-flash');
        void flashEffect.offsetWidth; // リフロー発生
        flashEffect.classList.add('play-flash');
    }

    // 少し遅れて画像を表示（光のエフェクトに合わせる）
    setTimeout(() => {
        fullscreenImg.src = `character/${char.id}.png`;

        // 画像のフェードインアニメをリセットして再生
        fullscreenImg.style.animation = 'none';
        fullscreenImg.offsetHeight;
        fullscreenImg.style.animation = 'fadeIn 0.5s ease-out forwards';

        fullscreenImg.style.opacity = '1';
    }, 200); // 0.2秒後に画像表示
}

// 4. 結果一覧画面を表示する処理
function showResultList() {
    overlay.classList.add('hidden');       // 演出画面を隠す
    resultScreen.classList.remove('hidden'); // 結果一覧を表示

    // グリッドの中身を一度リセット
    resultGrid.innerHTML = '';

    // 結果の数だけカードを作成
    currentResults.forEach(char => {
        const card = document.createElement('div');
        card.className = `result-card rarity-${char.rarity}`;

        // カードのHTML（画像とレアリティ文字）
        card.innerHTML = `
            <img src="character/${char.id}.png">
            <p>${char.rarity}</p>
        `;

        // ★重要：カードをクリックした時の拡大表示処理
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // 親要素（背景）へのクリック通知を止める（タイトルに戻らないようにする）

            modalImg.src = `character/${char.id}.png`; // 拡大画像のパス設定
            imageModal.classList.remove('hidden');     // モーダルを表示
        });

        resultGrid.appendChild(card);
    });
}

// 5. タイトル画面に戻る処理
function resetToTitle() {
    resultScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
}

// ==========================================
// 抽選ロジック（確率計算など）
// ==========================================
function pickRarity() {
    const r = Math.random() * 100;
    if (r < dropRates.SSR) return 'SSR';
    if (r < dropRates.SSR + dropRates.SR) return 'SR';
    return 'R';
}

function pickCharacterByRarity(rarity) {
    // そのレアリティに該当するキャラだけ抽出
    const list = characterList.filter(c => c.rarity === rarity);

    // もしキャラが登録されていない場合のエラー回避
    if (list.length === 0) {
        console.error(`${rarity}のキャラがいません。characterListを確認してください。`);
        return { id: '000', rarity: 'Error' };
    }

    // ランダムに1体選ぶ
    return list[Math.floor(Math.random() * list.length)];
}
