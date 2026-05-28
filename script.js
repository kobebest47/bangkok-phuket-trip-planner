const days = [
  {
    city: "Bangkok",
    title: "早班直飛曼谷",
    items: ["星宇航空 TPE 09:00 → BKK 12:00", "抵達後叫車進市區，入住 Staybridge Suites Bangkok Thonglor", "下午開始跑曼谷市區，晚上安排按摩或 Terminal 21"],
  },
  {
    city: "Bangkok",
    title: "曼谷市區與購物",
    items: ["上午安排鄭王廟、大皇宮或臥佛寺", "下午回 Siam / CentralWorld / Terminal 21", "晚上可安排高空酒吧或第二輪按摩"],
  },
  {
    city: "Bangkok",
    title: "曼谷完整一天",
    items: ["上午安排鄭王廟、大皇宮或臥佛寺其中一組", "下午回 Siam / CentralWorld / Big C 採買", "晚上安排高空酒吧或第二輪按摩"],
  },
  {
    city: "Bangkok → Phuket",
    title: "下午後再飛普吉",
    items: ["白天留在曼谷吃飯、購物或按摩", "泰國亞洲航空 BKK 18:15 → HKT 19:35", "抵達後入住 Sugar Marina Hotel -POP- Kata Beach，晚上只排簡單晚餐"],
  },
  {
    city: "Phuket",
    title: "Kata / Karon 海灘日",
    items: ["上午 Kata / Karon 海灘散步或玩水", "下午安排咖啡廳、按摩或飯店休息", "晚上看天氣決定隔天是否跑離島"],
  },
  {
    city: "Phuket",
    title: "普吉老城與夜市",
    items: ["天氣好可排皮皮島或攀牙灣一日遊", "若海象不好，改普吉老城、咖啡廳、按摩", "晚上安排夜市或 Patong 短暫體驗"],
  },
  {
    city: "Phuket → Taipei",
    title: "晚班機回台",
    items: ["白天可安排海灘、寄放行李與最後按摩", "泰越捷航空 HKT 21:45 → BKK 轉機 → TPE 10/27 06:30", "回程是晚出發、隔天清晨抵台"],
  },
];

const quotedItems = {
  total: 42044,
  note: "每人分攤 NT$21,022。此金額不含托運行李加購、餐飲、當地交通、按摩、活動、旅平險與網卡。",
  rows: [
    ["TPE → BKK 星宇航空", 12388],
    ["BKK → HKT 泰國亞洲航空", 3894],
    ["HKT → TPE 泰越捷航空", 11518],
    ["曼谷住宿 3 晚", 9567],
    ["普吉住宿 3 晚", 4677],
  ],
};

const currency = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

const dayTabs = document.querySelectorAll(".day-tab");
const dayCity = document.querySelector("#day-city");
const dayTitle = document.querySelector("#day-title");
const dayList = document.querySelector("#day-list");

function renderDay(index) {
  const day = days[index];
  dayCity.textContent = day.city;
  dayTitle.textContent = day.title;
  dayList.replaceChildren(
    ...day.items.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );

  dayTabs.forEach((tab) => {
    tab.classList.toggle("active", Number(tab.dataset.day) === index);
  });
}

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderDay(Number(tab.dataset.day)));
});

const budgetBars = document.querySelector("#budget-bars");
const budgetTotal = document.querySelector("#budget-total");
const budgetNote = document.querySelector("#budget-note");

function renderQuotedTotal() {
  budgetTotal.textContent = currency.format(quotedItems.total);
  budgetNote.textContent = quotedItems.note;
  budgetBars.replaceChildren(
    ...quotedItems.rows.map(([name, amount]) => {
      const row = document.createElement("article");
      row.className = "budget-row";
      row.innerHTML = `
        <header>
          <span>${name}</span>
          <strong>${currency.format(amount)}</strong>
        </header>
        <div class="meter" aria-hidden="true">
          <span style="--width: ${(amount / quotedItems.total) * 100}%"></span>
        </div>
      `;
      return row;
    }),
  );
}

renderDay(0);
renderQuotedTotal();
