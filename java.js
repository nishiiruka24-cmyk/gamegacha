// ==========================================
// 設定エリア：ここを変更するだけでキャラを増減できます
// ==========================================

// キャラクターのリスト
// id: 画像ファイル名（例: '001' -> character/001.png）
// rarity: レアリティ (SSR, SR, R)
const characterList = [
    { id: '001', rarity: 'SSR' }, // シャドウ (例)
    { id: '002', rarity: 'SR' },
    { id: '003', rarity: 'R' },
    { id: '004', rarity: 'R' },
    { id: '005', rarity: 'R' },
    // ★新しいキャラを追加するときは、ここに
    // { id: '006', rarity: 'SSR' }, 
    // のように行を足すだけでOKです。
];

// ガチャの排出率（合計が100になるように設定）
const dropRates = {
    SSR: 5,  // 5%
    SR: 15,  // 15%
    R: 80    // 80%
};

// ==========================================
// ガチャの仕組みエリア（ここは基本触らなくてOK）
// ==========================================

const drawBtn = document.getElementById('draw-btn');
const resultImg = document.getElementById('character-img');
const resultText = document.getElementById('rarity-text');
const resultArea = document.getElementById('result-area');

// ボタンがクリックされた時の処理
drawBtn.addEventListener('click', function() {
    
    // 1. 抽選でレアリティを決める
    const rarity = pickRarity();
    
    // 2. 決まったレアリティの中からキャラをランダムに1体選ぶ
    const character = pickCharacterByRarity(rarity);

    // 3. 結果を画面に表示する
    displayResult(character);
});

// レアリティを抽選する関数
function pickRarity() {
    const randomNum = Math.random() * 100; // 0〜99.99...の乱数
    let currentTotal = 0;

    // SSRの判定
    currentTotal += dropRates.SSR;
    if (randomNum < currentTotal) return 'SSR';

    // SRの判定
    currentTotal += dropRates.SR;
    if (randomNum < currentTotal) return 'SR';

    // それ以外はR
    return 'R';
}

// 指定されたレアリティのキャラリストからランダムに1体選ぶ関数
function pickCharacterByRarity(rarity) {
    // そのレアリティに該当するキャラだけを抽出
    const filteredList = characterList.filter(char => char.rarity === rarity);

    // もしそのレアリティのキャラが登録されていなかった場合のエラー回避
    if (filteredList.length === 0) {
        console.error(`${rarity}のキャラクターが登録されていません！`);
        return null; 
    }

    // ランダムに1つ選ぶ
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    return filteredList[randomIndex];
}

// 画面表示を更新する関数
function displayResult(character) {
    if (!character) return; // キャラが選ばれなかった場合は何もしない

    // 画像のパスを設定 (characterフォルダの中の 001.png など)
    const imagePath = `character/${character.id}.png`;

    // 画像を表示設定
    resultImg.src = imagePath;
    resultImg.style.display = 'block'; // 画像を表示状態にする
    
    // プレースホルダー（最初のメッセージ）を隠す
    const placeholder = document.querySelector('.placeholder');
    if (placeholder) placeholder.style.display = 'none';

    // レアリティとIDを表示
    resultText.innerHTML = `レアリティ: <strong>${character.rarity}</strong>`;
    
    // レアリティごとに文字色を変える演出
    if (character.rarity === 'SSR') {
        resultText.style.color = '#FFD700'; // 金色
    } else if (character.rarity === 'SR') {
        resultText.style.color = '#C0C0C0'; // 銀色
    } else {
        resultText.style.color = '#333';    // 黒
    }
}