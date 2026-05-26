/**
 * 診断ステップの定義
 * doctorImage: そのステップで表示するドクターの画像
 */
const steps = {
  home: {
    text: "やあ、ボクはドクタードルフィン。パソコンの診察はお任せして！何か困ったことはあるかな？",
    doctorImage: "assets/dr_dolphin.png",
    options: [
      { text: "電源が入らないんだ…", next: "q_lamp" },
      { text: "なんでもないよ（さよなら）", next: "exit" }
    ]
  },
  q_lamp: {
    text: "それは大変だ！まずは本体を診てみよう。電源ボタンを押した時、ランプは1ミリも光らないかな？",
    doctorImage: "assets/dr_comfortable.png", // 最初は余裕を見せて安心させる
    options: [
      { text: "全く光らない", next: "q_outlet" },
      { text: "光る、または音がする", next: "q_screen" }
    ]
  },
  q_outlet: {
    text: "コンセントは壁にしっかり刺さってるかな？タップのスイッチが切れてたりしない？",
    image: "assets/guide_outlet.png",
    doctorImage: "assets/dr_think.png", // 具体的なチェックでは真剣な表情
    options: [
      { text: "刺さってるしONだよ", next: "q_long_press" },
      { text: "あ、抜けてたかも…", next: "result_fix" }
    ]
  },
  q_long_press: {
    text: "「放電」を試してみよう！全てのケーブルを抜いてから、電源ボタンを10秒以上長押ししてね。",
    image: "assets/guide_discharge.png",
    doctorImage: "assets/dr_comfortable.png", // 手間のかかる作業なので、優しく余裕のある顔で促す
    options: [
      { text: "ついた！直ったよ！", next: "result_fix" },
      { text: "やっぱりダメみたい", next: "result_hw_broken" }
    ]
  },
  q_screen: {
    text: "なるほど。ファンが回る音や、ピピッと音（ビープ音）は聞こえるかな？",
    doctorImage: "assets/dr_think.png",
    options: [
      { text: "聞こえる", next: "q_monitor_check" },
      { text: "聞こえない", next: "q_long_press" }
    ]
  },
  q_monitor_check: {
    text: "音はするんだね。じゃあ、画面に何かロゴや文字は見える？それとも真っ暗？",
    doctorImage: "assets/dr_comfortable.png", // 状況が絞れてきたので少し余裕を見せる
    options: [
      { text: "ロゴや青い画面が出る", next: "result_os_issue" },
      { text: "真っ暗なままだよ", next: "result_monitor_issue" }
    ]
  },
  exit: {
    text: "そっか、よかった！また何かあったらいつでも呼んでね。バイバイ！",
    doctorImage: "assets/dr_bye.png",
    options: [{ text: "もう一度相談する", next: "home" }]
  },
  result_fix: {
    text: "やったね！解決してボクも嬉しいよ。大事に使ってあげてね！",
    doctorImage: "assets/dr_eureka.png",
    options: [{ text: "トップへ戻る", next: "home" }]
  },
  result_os_issue: {
    text: "画面に反応があるなら、本体は生きてるよ！これはWindowsなどのソフトの不具合の可能性が高いね。",
    doctorImage: "assets/dr_eureka.png",
    options: [{ text: "トップへ戻る", next: "home" }]
  },
  result_monitor_issue: {
    text: "音はするのに映らないなら、モニターの故障か、メモリの接触不良かもしれないね。一度専門家に診てもらったほうがいいかも。",
    doctorImage: "assets/dr_think.png",
    options: [{ text: "トップへ戻る", next: "home" }]
  },
  result_hw_broken: {
    text: "うーん、放電してもダメなら、電源ユニットやマザーボードが故障している重症の可能性があるよ…。修理を検討してみてね。",
    doctorImage: "assets/dr_think.png",
    options: [{ text: "トップへ戻る", next: "home" }]
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