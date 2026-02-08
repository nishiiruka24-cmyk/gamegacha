// ==========================================
// 音声ファイルの定義
// ==========================================
const soundList = {
    click: 'sound/click.mp3',   // ボタンクリック
    gacha: 'sound/gacha.mp3',   // ガチャ演出
    result: 'sound/result.mp3', // キャラ登場
    pay: 'sound/pay.mp3'        // 課金完了
};

// BGMの設定
const bgm = new Audio('sound/bgm.mp3');
bgm.loop = true;  // 繰り返し再生
bgm.volume = 0.3; // 音量（0.0〜1.0）

// ==========================================
// 効果音（SE）を鳴らす関数
// ==========================================
function playSE(name) {
    if (soundList[name]) {
        const audio = new Audio(soundList[name]);
        audio.volume = 0.6; // SEの音量
        audio.play().catch(() => {
            // エラー（ファイルがない等）は無視
        });
    }
}

// ==========================================
// BGM再生の制御
// ==========================================
let isBgmPlaying = false;

// ブラウザの制限により、ユーザーが最初に操作したタイミングで鳴らす
function tryPlayBGM() {
    if (!isBgmPlaying) {
        bgm.play().catch(() => {});
        isBgmPlaying = true;
    }
}