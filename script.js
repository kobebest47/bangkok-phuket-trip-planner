const days = [
  { area: "成田 → 上野", title: "Skyliner 直達入住", note: "今天只安排入住與晚餐，不塞景點。", meal: "肉之大山；備案上野洋食遠山", items: [["16:50", "抵達成田機場，辦理入境並領取行李"], ["18:30", "搭乘京成 Skyliner 直達京成上野"], ["19:30", "步行或搭計程車前往飯店，四人分攤短程車資"], ["20:00", "完成入住，到阿美橫町吃第一頓東京晚餐"]] },
  { area: "淺草 → 押上", title: "淺草必去與晴空塔外觀", note: "上午看老東京，下午逛 Solamachi；主要夜景留給 Shibuya Sky。", meal: "淺草今半；備案大黑家天丼", items: [["08:15", "雷門、淺草寺，趁人潮較少先拍照參拜"], ["09:45", "仲見世商店街、淺草炸肉餅與花月堂"], ["11:00", "淺草今半排午餐；客滿改吃大黑家天丼"], ["13:30", "合羽橋道具街，採買餐具與生活雜貨"], ["16:00", "隅田公園、東京水街、晴空塔外觀與 Solamachi 購物"]] },
  { area: "新宿 → 河口湖", title: "富士山一日", note: "四人若要跑三個景點，參加一日團會比多次轉車有效率。", meal: "河口湖餺飥不動", items: [["06:00", "從飯店出發前往新宿集合"], ["09:00", "新倉山淺間公園，眺望富士山與五重塔"], ["11:30", "河口湖、大石公園散步"], ["13:00", "午餐後前往忍野八海；時間不足就取消此站"], ["17:00", "返回東京，晚上在新宿用餐"]] },
  { area: "築地 → 原宿 → 澀谷", title: "第一次東京經典日", note: "築地早餐、明治神宮、逛街與 Shibuya Sky 日落一次完成。", meal: "築地壽司、AFURI、韓之台所 A5 山形牛", items: [["08:00", "築地場外市場吃壽司、玉子燒與海鮮小食"], ["11:30", "明治神宮參拜，接著逛原宿與表參道"], ["14:30", "澀谷 PARCO、LOFT、十字路口"], ["16:00", "Shibuya Sky，看日落、藍調與東京夜景"], ["19:00", "韓之台所別邸吃 A5 山形牛燒肉，餐後逛 Mega Don Quijote"]] },
  { area: "上野 → 成田", title: "最後採買與回程", note: "住上野的優勢就在今天：13:15 前能用最簡單的路線抵達機場。", meal: "上野炸豬排或蕎麥麵", items: [["08:30", "退房並將行李寄放飯店"], ["09:30", "上野公園、阿美橫町最後採買"], ["11:00", "提早吃午餐並領取行李"], ["11:30", "前往京成上野，搭 Skyliner 直達成田"], ["13:15", "機場集合；15:30 起飛，18:35 抵達台灣"]] },
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

const stayModes = [...document.querySelectorAll(".stay-mode")];
const hotelPanels = [...document.querySelectorAll(".hotel-panel")];

function renderStayMode(mode) {
  stayModes.forEach((button) => {
    const active = button.dataset.stayMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  hotelPanels.forEach((panel) => {
    const active = panel.dataset.hotelPanel === mode;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

stayModes.forEach((button) => button.addEventListener("click", () => renderStayMode(button.dataset.stayMode)));
