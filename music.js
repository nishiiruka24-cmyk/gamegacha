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

const bgmGacha = new Audio('sound/bgm.mp3'); // ガチャ用BGM
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
// BGM再生の制御システム
// ==========================================
function tryPlayBGM() {
    if (!isBgmPlaying) {
        currentBGM = bgmTitle;
        currentBGM.play().catch(() => {});
        isBgmPlaying = true;
    }
}

// BGMを切り替える共通関数
function switchBGM(newBGM) {
    if (currentBGM === newBGM) return; // 同じBGMなら何もしない
    
    if (currentBGM) {
        currentBGM.pause(); // 今の曲を止める
    }
    
    currentBGM = newBGM;
    currentBGM.currentTime = 0; // 最初から
    currentBGM.play().catch(() => {});
}

// 画面ごとに呼ぶための関数
function playTitleBGM() { switchBGM(bgmTitle); }
function playHomeBGM() { switchBGM(bgmHome); }
function playGachaBGM() { switchBGM(bgmGacha); }