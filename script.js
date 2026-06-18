/**
 * 診断ステップの定義（パソコンの動作が重い 専用版）
 * doctorImage: そのステップで表示するドクターの画像
 */
const steps = {
  // === トップメニュー（ここから直接スタート） ===
  home: {
    text: "やあ、ボクはドクタードルフィン。パソコンの動作が重くて困っているんだね？ボクが原因を診てあげるから、いくつか教えておくれ！",
    doctorImage: "assets/dr_dolphin.png",
    options: [
      { text: "診察をお願いする", next: "q_heavy_timing" },
      { text: "なんでもないよ（さよなら）", next: "exit" }
    ]
  },

  // === 動作が重いルートの切り分け ===
  q_heavy_timing: {
    text: "まずは重くなるタイミングを調べよう。それは「電源を入れた直後の起動時からずっと」かな？それとも「インターネットやブラウザを開いたとき」に特に感じる？",
    doctorImage: "assets/dr_think.png",
    options: [
      { text: "いつでも、起動直後からずっと重い", next: "q_task_manager" },
      { text: "ネットやブラウザを開くと重くなる", next: "q_browser_tabs" }
    ]
  },
  q_task_manager: {
    text: "ずっと重いんだね。Ctrl + Shift + Esc キーを同時に押して「タスクマネージャー」を開いてみて。CPUやメモリのグラフが100%近くになっていないかな？",
    image: "assets/guide_taskmanager.png",
    doctorImage: "assets/dr_think.png",
    options: [
      { text: "100%近くになっている項目がある", next: "result_background_app" },
      { text: "グラフは低いのに、なぜかモッサリする", next: "result_drive_decay" }
    ]
  },
  q_browser_tabs: {
    text: "ネットのときだね！ブラウザのタブをたくさん（10個以上など）開きっぱなしにしていたり、動画を何本も同時に読み込んだりしていないかな？",
    doctorImage: "assets/dr_comfortable.png",
    options: [
      { text: "あ、結構たくさん開いてるかも…", next: "result_heavy_tabs" },
      { text: "タブは少ないのに、読み込みが遅いんだ", next: "result_network_heavy" }
    ]
  },

  // === 診断結果・共通メッセージ ===
  exit: {
    text: "そっか、よかった！また何かあったらいつでも呼んでね。バイバイ！",
    doctorImage: "assets/dr_bye.png",
    options: [{ text: "もう一度相談する", next: "home" }]
  },
  result_background_app: {
    text: "裏で重いアプリが動いているか、Windowsのアップデートが自動で走っているのかも。しばらく放置するか、不要なアプリを終了してみてね。",
    doctorImage: "assets/dr_eureka.png",
    options: [{ text: "最初からやり直す", next: "home" }]
  },
  result_drive_decay: {
    text: "グラフは低いのに重いなら、ストレージ（HDDやSSD）が寿命で劣化しているか、空き容量が完全に不足しているかも。買い替えやディスククリーンアップを考えてみてね。",
    doctorImage: "assets/dr_think.png",
    options: [{ text: "最初からやり直す", next: "home" }]
  },
  result_heavy_tabs: {
    text: "やっぱり！ブラウザはタブを増やすほど大量のメモリを消費するんだ。使わないタブをこまめに閉じると、びっくりするくらい軽くなるよ！",
    doctorImage: "assets/dr_eureka.png",
    options: [{ text: "最初からやり直す", next: "home" }]
  },
  result_network_heavy: {
    text: "それはパソコン本体ではなく、ネット回線やWi-Fiの電波が弱くなっている可能性が高いね。ルーターを再起動してみると直るかもしれないよ！",
    doctorImage: "assets/dr_think.png",
    options: [{ text: "最初からやり直す", next: "home" }]
  }
};

/**
 * 画面を更新するメイン関数
 */
function showStep(stepId) {
  const step = steps[stepId];
  if (!step) return;

  // 1. セリフの更新
  const messageEl = document.getElementById('message');
  messageEl.innerText = step.text;

  // 2. ドクターの画像を更新
  const doctorImg = document.querySelector('.doctor-img');
  if (step.doctorImage) {
    doctorImg.src = step.doctorImage;
  }

  // 3. 選択肢ボタンの生成
  const optionsContainer = document.getElementById('options');
  optionsContainer.style.opacity = 0;
  setTimeout(() => {
    optionsContainer.innerHTML = '';
    step.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.innerText = opt.text;
      btn.onclick = () => showStep(opt.next);
      optionsContainer.appendChild(btn);
    });
    optionsContainer.style.opacity = 1;
  }, 200);

  // 4. 図解ガイドの表示制御
  const guideArea = document.getElementById('guide-area');
  const guideImg = document.getElementById('guide-img');
  if (step.image) {
    guideImg.src = step.image;
    guideArea.style.display = 'block';
  } else {
    guideArea.style.display = 'none';
  }
}

window.onload = () => {
  showStep('home');
};