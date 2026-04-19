// ==========================================
// 音声ファイルの定義
// ==========================================
const soundList = {
    click: 'sound/click.mp3',   
    gacha: 'sound/gacha.mp3',   
    result: 'sound/result.mp3', 
    pay: 'sound/pay.mp3'        
};

// ==========================================
// BGMの設定（3種類）
// ==========================================
const bgmTitle = new Audio('sound/title_bgm.mp3');
bgmTitle.loop = true;  
bgmTitle.volume = 0.3; 

const bgmHome = new Audio('sound/home_bgm.mp3'); 
bgmHome.loop = true;
bgmHome.volume = 0.3;

const bgmGacha = new Audio('sound/bgm.mp3'); 
bgmGacha.loop = true;
bgmGacha.volume = 0.3;

let isBgmPlaying = false;
let currentBGM = null;

// ==========================================
// 効果音（SE）を鳴らす関数
// ==========================================
function playSE(name) {
    if (soundList[name]) {
        const audio = new Audio(soundList[name]);
        audio.volume = 0.6; 
        audio.play().catch(() => {});
    }
}

// ==========================================
// BGM再生の制御システム（修正版）
// ==========================================
// 画面のどこかをタップした時に、ブラウザの制限を解除してBGMを鳴らす
function tryPlayBGM() {
    if (!isBgmPlaying) {
        isBgmPlaying = true; // タップされたので再生フラグをONにする
        
        // ★修正：もしすでに「ホームBGM」などに切り替わっていれば、それをそのまま鳴らす。
        // まだ何のBGMもセットされていなければ「タイトルBGM」をセットする。
        if (!currentBGM) {
            currentBGM = bgmTitle;
        }
        currentBGM.play().catch(() => {});
    }
}

// BGMを切り替える共通関数
function switchBGM(newBGM) {
    if (currentBGM === newBGM) return; // 同じBGMなら何もしない
    
    if (currentBGM) {
        currentBGM.pause(); // 今の曲を確実に止める
    }
    
    currentBGM = newBGM;
    currentBGM.currentTime = 0; // 最初から再生
    
    // すでに画面がタップされてBGMが許可されていれば、すぐに再生
    if (isBgmPlaying) {
        currentBGM.play().catch(() => {});
    } else {
        // まだタップされていない場合でも一応再生を試みる（成功したらフラグを立てる）
        currentBGM.play().then(() => {
            isBgmPlaying = true;
        }).catch(() => {
            // ブラウザにブロックされた場合は何もしない（タップされた時に tryPlayBGM が動いて鳴ります）
        });
    }
}

// 画面ごとに呼ぶための関数
function playTitleBGM() { switchBGM(bgmTitle); }
function playHomeBGM() { switchBGM(bgmHome); }
function playGachaBGM() { switchBGM(bgmGacha); }