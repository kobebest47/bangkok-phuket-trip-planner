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
const plannerForm = document.querySelector("#planner-form");
const customRoute = document.querySelector("#custom-route");
const customDates = document.querySelector("#custom-dates");
const customItinerary = document.querySelector("#custom-itinerary");

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

const dateFormatter = new Intl.DateTimeFormat("zh-TW", {
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

function addDays(date, daysToAdd) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + daysToAdd);
  return copy;
}

function formatDate(date) {
  return dateFormatter.format(date);
}

function getPlannerValue(id) {
  const element = document.querySelector(id);
  return element?.value ?? "";
}

function renderCustomPlanner() {
  if (!plannerForm || !customRoute || !customDates || !customItinerary) return;

  const origin = getPlannerValue("#origin-city");
  const island = getPlannerValue("#island-city");
  const start = new Date(`${getPlannerValue("#start-date")}T00:00:00`);
  const tripDays = Math.max(4, Number(getPlannerValue("#trip-days")) || 7);
  const bangkokNights = Math.max(1, Number(getPlannerValue("#bangkok-nights")) || 3);
  const phuketNights = Math.max(1, Number(getPlannerValue("#phuket-nights")) || 3);
  const totalNights = tripDays - 1;
  const firstCityNights = Math.min(bangkokNights, totalNights - 1);
  const secondCityNights = Math.min(phuketNights, totalNights - firstCityNights);
  const returnDate = addDays(start, totalNights);
  const arrivalDate = addDays(returnDate, 1);
  const transferDay = firstCityNights + 1;

  customRoute.textContent = `${origin} → 曼谷 → ${island} → ${origin}`;
  customDates.textContent = `${formatDate(start)} 出發，${formatDate(returnDate)} 晚回，${formatDate(arrivalDate)} 抵台。`;

  const cards = Array.from({ length: tripDays }, (_, index) => {
    const dayNumber = index + 1;
    const date = addDays(start, index);
    let city = "曼谷";
    let title = "曼谷市區";
    let note = "寺廟、購物、按摩、美食，依體力調整。";

    if (dayNumber === 1) {
      title = "早班抵達曼谷";
      note = "建議選早班直飛，下午即可開始市區行程。";
    } else if (dayNumber === transferDay) {
      city = `曼谷 → ${island}`;
      title = `下午後飛${island}`;
      note = "白天留在曼谷，15:00 後再移動到機場。";
    } else if (dayNumber > transferDay && dayNumber < tripDays) {
      city = island;
      title = `${island}停留`;
      note = island === "普吉" ? "海灘、老城、離島一日遊看天氣安排。" : "安排當地核心景點與半日放鬆行程。";
    } else if (dayNumber === tripDays) {
      city = `${island} → ${origin}`;
      title = "晚班回程";
      note = "白天保留最後行程，晚上搭機回台。";
    }

    const card = document.createElement("article");
    card.className = "custom-day";
    card.innerHTML = `
      <span>D${dayNumber} · ${formatDate(date)}</span>
      <strong>${city}</strong>
      <p>${title}<br>${note}</p>
    `;
    return card;
  });

  customItinerary.replaceChildren(...cards);

  const nightsMismatch = firstCityNights + secondCityNights !== totalNights;
  customItinerary.toggleAttribute("data-needs-adjustment", nightsMismatch);
}

if (plannerForm) {
  plannerForm.addEventListener("input", renderCustomPlanner);
  renderCustomPlanner();
}
