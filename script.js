const days = [
  { area: "成田 → 東京", title: "抵達與入住", note: "今天只安排入住與晚餐，不塞景點。", meal: "上野居酒屋或拉麵", items: [["16:50", "抵達成田機場，辦理入境並領取行李"], ["18:30", "搭乘 Access Express 前往淺草，或搭 Skyliner 前往上野"], ["20:00", "飯店入住，確認隔日交通與集合時間"], ["20:30", "飯店附近簡單晚餐，便利商店補充早餐與飲用水"]] },
  { area: "淺草 → 押上", title: "寺廟與晴空塔", note: "上午看老東京，下午一路走到晴空塔。", meal: "大黑家天丼、淺草小吃、Solamachi 晚餐", items: [["08:30", "雷門、淺草寺，趁人潮較少先拍照參拜"], ["10:00", "仲見世商店街與周邊巷弄"], ["11:30", "合羽橋道具街，採買餐具與生活雜貨"], ["14:30", "隅田公園、東京水街，步行前往押上"], ["16:30", "東京晴空塔，看日落與東京夜景"]] },
  { area: "新宿 → 河口湖", title: "富士山一日", note: "四人若要跑三個景點，參加一日團會比多次轉車有效率。", meal: "河口湖餺飥不動", items: [["06:00", "從飯店出發前往新宿集合"], ["09:00", "新倉山淺間公園，眺望富士山與五重塔"], ["11:30", "河口湖、大石公園散步"], ["13:00", "午餐後前往忍野八海；時間不足就取消此站"], ["17:00", "返回東京，晚上在新宿用餐"]] },
  { area: "原宿 → 澀谷", title: "神社與購物日", note: "完整購物日，景點集中在同一條移動軸線。", meal: "牛かつ、AFURI 柚子拉麵或迴轉壽司", items: [["08:30", "明治神宮參拜與森林步道"], ["10:30", "竹下通、原宿小店"], ["12:30", "表參道午餐與選物店"], ["15:00", "澀谷 PARCO、LOFT、Scramble Square"], ["18:00", "Mega Don Quijote 採買，澀谷晚餐"]] },
  { area: "上野 → 成田", title: "最後採買與回程", note: "13:15 必須抵達機場，市區行程只排到上午。", meal: "上野炸豬排或蕎麥麵", items: [["08:30", "退房並將行李寄放飯店"], ["09:30", "上野公園、阿美橫町最後採買"], ["11:00", "提早吃午餐並領取行李"], ["11:30", "最晚離開東京市區前往成田"], ["13:15", "機場集合；15:30 起飛，18:35 抵達台灣"]] },
];

const tabs = [...document.querySelectorAll(".day-tab")];
const area = document.querySelector("#day-area");
const title = document.querySelector("#day-title");
const note = document.querySelector("#day-note");
const list = document.querySelector("#day-list");
const meal = document.querySelector("#day-meal");

function renderDay(index) {
  const day = days[index];
  area.textContent = day.area; title.textContent = day.title; note.textContent = day.note; meal.textContent = day.meal;
  list.replaceChildren(...day.items.map(([time, activity]) => {
    const item = document.createElement("li"); const timeElement = document.createElement("time"); const text = document.createElement("span");
    timeElement.textContent = time; text.textContent = activity; item.append(timeElement, text); return item;
  }));
  tabs.forEach((tab, tabIndex) => { const active = tabIndex === index; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); });
}

tabs.forEach((tab) => tab.addEventListener("click", () => renderDay(Number(tab.dataset.day))));
renderDay(0);
