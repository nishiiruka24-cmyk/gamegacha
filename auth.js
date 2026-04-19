// ==========================================
// アカウント連携・保存システム (auth.js)
// ==========================================

const USERS_DB_KEY = 'xeno_users_db';
const CURRENT_SESSION_KEY = 'xeno_current_session';

let usersDB = JSON.parse(localStorage.getItem(USERS_DB_KEY)) || {};
let currentUser = null;

// 要素の取得
const settingsModal = document.getElementById('settings-modal');
const authModal = document.getElementById('auth-modal');
const titleSettingsBtn = document.getElementById('title-settings-btn');
const homeSettingsBtn = document.getElementById('home-settings-btn'); 
const btnReturnTitle = document.getElementById('btn-return-title');   
const btnExitGame = document.getElementById('btn-exit-game'); // ★追加：終了ボタン
const btnOpenAuth = document.getElementById('btn-open-auth');

const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const authStatusText = document.getElementById('auth-status-text');
const authForm = document.getElementById('auth-form');
const btnDeleteAccount = document.getElementById('btn-delete-account');
const btnLogout = document.getElementById('btn-logout'); 
const loginToast = document.getElementById('login-toast');

// === ログイン通知（トースト）を表示する関数 ===
function showLoginToast() {
    if (currentUser && loginToast) {
        loginToast.textContent = `ログイン中: ${currentUser.email}`;
        loginToast.classList.remove('toast-hidden');
        loginToast.classList.add('toast-visible');
        
        setTimeout(() => {
            loginToast.classList.remove('toast-visible');
            loginToast.classList.add('toast-hidden');
        }, 3000);
    }
}

// === 設定画面の開閉（タイトル） ===
if (titleSettingsBtn) {
    titleSettingsBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (typeof playSE === 'function') playSE('click');
        settingsModal.classList.remove('hidden');
        if (btnOpenAuth) btnOpenAuth.style.display = 'block';
        if (btnReturnTitle) btnReturnTitle.style.display = 'none';
        if (btnExitGame) btnExitGame.style.display = 'block'; // タイトルからでも終了可能に
    });
}

// === 設定画面の開閉（ホーム画面用） ===
if (homeSettingsBtn) {
    homeSettingsBtn.addEventListener('click', () => {
        if (typeof playSE === 'function') playSE('click');
        settingsModal.classList.remove('hidden');
        if (btnOpenAuth) btnOpenAuth.style.display = 'none';
        if (btnReturnTitle) btnReturnTitle.style.display = 'block';
        if (btnExitGame) btnExitGame.style.display = 'block'; // ★追加：ホーム画面に終了ボタン表示
    });
}

// === タイトルへ戻るボタン ===
if (btnReturnTitle) {
    btnReturnTitle.addEventListener('click', () => {
        if (typeof playSE === 'function') playSE('click');
        settingsModal.classList.add('hidden'); 
        if (typeof playTitleBGM === 'function') playTitleBGM(); 
        if (typeof changeScreen === 'function') changeScreen('title'); 
    });
}

// === ★新規追加：ゲームを終了するボタン ===
if (btnExitGame) {
    btnExitGame.addEventListener('click', () => {
        if (typeof playSE === 'function') playSE('click');
        if (confirm('ゲームを終了しますか？\n（現在の進行状況は自動的に保存されます）')) {
            saveAccount(); // 確実にセーブを実行
            
            // ウィンドウ（タブ）を閉じる処理
            window.close();
            
            // ブラウザの制限で閉じられなかった場合のアラート
            setTimeout(() => {
                alert('ブラウザの仕様により自動で閉じられませんでした。\nお手数ですが、ブラウザのタブを手動で閉じて終了してください。');
            }, 500);
        }
    });
}

document.getElementById('btn-close-settings').addEventListener('click', () => {
    if (typeof playSE === 'function') playSE('click');
    settingsModal.classList.add('hidden');
});

// === アカウント連携画面の開閉 ===
if (btnOpenAuth) {
    btnOpenAuth.addEventListener('click', () => {
        if (typeof playSE === 'function') playSE('click');
        settingsModal.classList.add('hidden'); 
        updateAuthUI();
        authModal.classList.remove('hidden');
    });
}

document.getElementById('btn-close-auth').addEventListener('click', () => {
    if (typeof playSE === 'function') playSE('click');
    authModal.classList.add('hidden');
});

// === アカウントの読み込み ===
function loadAccount() {
    const sessionEmail = localStorage.getItem(CURRENT_SESSION_KEY);
    if (sessionEmail && usersDB[sessionEmail]) {
        currentUser = usersDB[sessionEmail];
        
        if (currentUser.stones !== undefined && typeof userStones !== 'undefined') {
            userStones = currentUser.stones;
            updateStoneDisplay();
        }
        
        if (currentUser.collection !== undefined && typeof userCollection !== 'undefined') {
            userCollection.length = 0; 
            currentUser.collection.forEach(id => userCollection.push(id));
        }
        
        if (currentUser.counts !== undefined && typeof characterCounts !== 'undefined') {
            for (let key in characterCounts) delete characterCounts[key]; 
            Object.assign(characterCounts, currentUser.counts);
        }

        const homeImg = document.getElementById('home-char-img');
        if (homeImg && currentUser.homeImage) {
            homeImg.src = currentUser.homeImage;
        } else if (homeImg) {
            homeImg.src = 'character/001.png';
        }

        showLoginToast();
    }
}
window.addEventListener('load', loadAccount);

// === アカウントの保存 ===
function saveAccount() {
    if (currentUser) {
        if (typeof userStones !== 'undefined') currentUser.stones = userStones;
        if (typeof userCollection !== 'undefined') currentUser.collection = [...userCollection];
        if (typeof characterCounts !== 'undefined') currentUser.counts = {...characterCounts};
        
        const homeImg = document.getElementById('home-char-img');
        if (homeImg) {
            currentUser.homeImage = homeImg.getAttribute('src');
        }
        
        usersDB[currentUser.email] = currentUser;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
    }
}

// === 新規登録処理 ===
document.getElementById('btn-register').addEventListener('click', () => {
    if (typeof playSE === 'function') playSE('click');
    const email = authEmailInput.value;
    const password = authPasswordInput.value;

    if (!email || !password) {
        alert('メールアドレスとパスワードを入力してください');
        return;
    }

    if (usersDB[email]) {
        alert('このメールアドレスは既に登録されています。ログインしてください。');
        return;
    }

    const homeImg = document.getElementById('home-char-img');
    currentUser = {
        email: email,
        password: password,
        stones: typeof userStones !== 'undefined' ? userStones : 3000,
        collection: typeof userCollection !== 'undefined' ? [...userCollection] : [],
        counts: typeof characterCounts !== 'undefined' ? {...characterCounts} : {},
        homeImage: homeImg ? homeImg.getAttribute('src') : 'character/001.png'
    };
    saveAccount();
    localStorage.setItem(CURRENT_SESSION_KEY, email);
    alert('アカウントを登録し、連携しました！');
    updateAuthUI();
    showLoginToast(); 
});

// === ログイン処理 ===
document.getElementById('btn-login').addEventListener('click', () => {
    if (typeof playSE === 'function') playSE('click');
    const email = authEmailInput.value;
    const password = authPasswordInput.value;

    const savedUser = usersDB[email];
    
    if (!savedUser) {
        alert('登録されたアカウントが見つかりません。');
        return;
    }

    if (savedUser.password === password) {
        if (!currentUser) {
            const isConfirmed = confirm('現在プレイ中のデータは連携されていません。\nログインすると現在のデータ（魔法石やキャラクター）は上書きされ、消えてしまいます。\n\n本当にログインしますか？');
            if (!isConfirmed) return; 
        }

        currentUser = savedUser;
        localStorage.setItem(CURRENT_SESSION_KEY, email);
        alert('ログインに成功しました！データを復元します。');
        loadAccount(); 
        updateAuthUI();
        showLoginToast(); 
    } else {
        alert('パスワードが間違っています。');
    }
});

// === ログアウト処理 ===
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (typeof playSE === 'function') playSE('click');
        if (confirm('ログアウトしますか？\n（データは保存されており、消えません）')) {
            saveAccount(); 
            localStorage.removeItem(CURRENT_SESSION_KEY); 
            currentUser = null;
            alert('ログアウトしました。データを初期状態に戻します。');
            
            if (typeof userStones !== 'undefined') userStones = 3000;
            if (typeof userCollection !== 'undefined') userCollection.length = 0;
            if (typeof characterCounts !== 'undefined') {
                for (let key in characterCounts) delete characterCounts[key];
            }
            if (typeof updateStoneDisplay === 'function') updateStoneDisplay();
            
            const homeImg = document.getElementById('home-char-img');
            if (homeImg) homeImg.src = 'character/001.png';

            updateAuthUI();
        }
    });
}

// === アカウント削除処理 ===
if (btnDeleteAccount) {
    btnDeleteAccount.addEventListener('click', () => {
        if (typeof playSE === 'function') playSE('click');
        if (confirm('本当にアカウントを削除しますか？\n（データが完全に消去され、元に戻せなくなります）')) {
            delete usersDB[currentUser.email]; 
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
            localStorage.removeItem(CURRENT_SESSION_KEY);
            currentUser = null;
            alert('アカウントデータを完全に削除しました。');
            
            if (typeof userStones !== 'undefined') userStones = 3000;
            if (typeof userCollection !== 'undefined') userCollection.length = 0;
            if (typeof characterCounts !== 'undefined') {
                for (let key in characterCounts) delete characterCounts[key];
            }
            if (typeof updateStoneDisplay === 'function') updateStoneDisplay();

            const homeImg = document.getElementById('home-char-img');
            if (homeImg) homeImg.src = 'character/001.png';
            
            updateAuthUI();
        }
    });
}

// === UIの更新 ===
function updateAuthUI() {
    if (currentUser) {
        authStatusText.textContent = `現在のアカウント: ${currentUser.email}`;
        authStatusText.style.color = '#4CAF50';
        authForm.style.display = 'none'; 
        btnDeleteAccount.style.display = 'block'; 
        btnLogout.style.display = 'block';
    } else {
        authStatusText.textContent = 'アカウントは連携されていません。';
        authStatusText.style.color = '#fff';
        authForm.style.display = 'block';
        btnDeleteAccount.style.display = 'none';
        btnLogout.style.display = 'none';
        authEmailInput.value = '';
        authPasswordInput.value = '';
    }
}

// 石が増減した時、自動セーブ
if (typeof updateStoneDisplay === 'function') {
    const originalUpdateStoneDisplay = updateStoneDisplay;
    updateStoneDisplay = function() {
        originalUpdateStoneDisplay();
        saveAccount();
    };
}

// キャラクターを獲得した直後に自動セーブ
if (typeof addToCollection === 'function') {
    const originalAddToCollection = addToCollection;
    addToCollection = function(id) {
        originalAddToCollection(id);
        saveAccount(); 
    };
}

const targetHomeSetBtn = document.getElementById('set-home-btn');
if (targetHomeSetBtn) {
    targetHomeSetBtn.addEventListener('click', () => {
        setTimeout(saveAccount, 100);
    });
}