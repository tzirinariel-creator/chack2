// === מצב המשחק ===
const state = {
    round: 1,
    maxRounds: 10,
    resources: {
        people: 8,
        food: 70,
        morale: 60,
        supplies: 50
    },
    usedEvents: []
};

// === אירועים ===
// כל אירוע הוא דילמה עם בחירות שמשפיעות על המשאבים
const events = [
    {
        title: "סערה מתקרבת",
        description: "עננים כבדים מתקרבים מהמערב. הצוות שלך חייב להחליט — להתבצר או להמשיך לנוע?",
        choices: [
            {
                label: "להתבצר ולחכות",
                desc: "בטוח יותר, אבל נאבד זמן ומזון",
                result: "הקבוצה מוצאת מחסה. הסערה עוברת אחרי יום שלם. כולם שלמים, אבל המזון נגמר.",
                effects: { food: -15, morale: 5 }
            },
            {
                label: "להמשיך לנוע",
                desc: "אפשר להתקדם, אבל יש סיכון",
                result: "התקדמתם למרות הרוח. אחד מהצוות נפצע קל, אבל מצאתם מחסן נטוש בדרך.",
                effects: { supplies: 15, people: -1, morale: -5 }
            },
            {
                label: "לשלוח סיירת קטנה",
                desc: "שניים ילכו לבדוק, השאר יחכו",
                result: "הסיירת חזרה עם מידע חשוב על שביל בטוח. ההתקדמות הייתה איטית אבל בטוחה.",
                effects: { food: -8, supplies: 5, morale: 8 }
            }
        ]
    },
    {
        title: "קבוצת זרים",
        description: "שלושה אנשים מופיעים באופק. הם נראים עייפים ורעבים. הם מבקשים להצטרף אליכם.",
        choices: [
            {
                label: "לקבל אותם",
                desc: "יותר ידיים — אבל גם יותר פיות לאכול",
                result: "הזרים מצטרפים בשמחה. אחד מהם מכיר את האזור היטב, מה שעוזר מאוד.",
                effects: { people: 3, food: -20, morale: 10 }
            },
            {
                label: "לתת להם מזון ולהיפרד",
                desc: "גם לעזור וגם לשמור על הקבוצה",
                result: "הם מודים לכם ונפרדים. לפני שהם הולכים, הם מספרים לכם על מעיין מים קרוב.",
                effects: { food: -10, morale: 5, supplies: 10 }
            },
            {
                label: "לסרב",
                desc: "אין מספיק לכולם",
                result: "הם הולכים בשקט. חלק מהצוות שלך לא אוהב את ההחלטה. 'אנחנו יכולנו להיות הם', מישהו ממלמל.",
                effects: { morale: -15 }
            }
        ]
    },
    {
        title: "מעיין מים",
        description: "הצוות מגלה מעיין מים צלולים. אפשר לנוח כאן, אבל יש גם סימנים של חיות בר באזור.",
        choices: [
            {
                label: "לחנות ליום שלם",
                desc: "מנוחה, מילוי מים, אבל סיכון מחיות",
                result: "יום מנוחה שעשה לכולם טוב. מילאתם מים ואף אחד לא נפגע. הצוות מרגיש מחודש.",
                effects: { morale: 20, food: -8, supplies: 5 }
            },
            {
                label: "למלא מים ולהמשיך מהר",
                desc: "יעיל אבל מתיש",
                result: "מילאתם כל מה שאפשר והמשכתם. הצוות עייף אבל מצויד.",
                effects: { supplies: 15, morale: -5 }
            }
        ]
    },
    {
        title: "ויכוח בצוות",
        description: "שני אנשים בצוות רבים על הכיוון. אחד רוצה ללכת דרומה לחוף, השני מעדיף צפונה להרים. זה מאיים לפלג את הקבוצה.",
        choices: [
            {
                label: "להקשיב לשניהם ולהצביע",
                desc: "דמוקרטיה — כולם מחליטים ביחד",
                result: "ההצבעה עוברת בשלום. לא כולם מרוצים, אבל כולם מרגישים ששמעו אותם.",
                effects: { morale: 5, food: -5 }
            },
            {
                label: "להחליט לבד כמוביל",
                desc: "מהיר ומחושב, אבל עלול לעצבן",
                result: "ההחלטה שלך ברורה ומהירה. חלק מכבדים את זה, אחרים פחות.",
                effects: { morale: -8, supplies: 5 }
            },
            {
                label: "לעצור ולחקור את שתי האפשרויות",
                desc: "לשלוח סיירות לשני הכיוונים",
                result: "שתי סיירות יוצאות וחוזרות עם מידע. עכשיו ההחלטה מבוססת על עובדות. הצוות מתאחד.",
                effects: { food: -12, morale: 15, supplies: -5 }
            }
        ]
    },
    {
        title: "מחסן נטוש",
        description: "מצאתם מבנה נטוש עם סימנים שמישהו היה כאן לא מזמן. בפנים יש ציוד ומזון, אבל גם סימנים שהמקום אולי שייך למישהו.",
        choices: [
            {
                label: "לקחת הכל",
                desc: "הצוות צריך את זה — הישרדות קודמת",
                result: "לקחתם הכל. הצוות שבע אבל לא שקט. 'מה אם הם יחזרו?' שואלת אחת.",
                effects: { food: 25, supplies: 20, morale: -10 }
            },
            {
                label: "לקחת רק מה שחיוני",
                desc: "להשאיר מספיק למי שיגיע אחריכם",
                result: "לקחתם בדיוק מה שאתם צריכים והשארתם פתק. הצוות מרגיש טוב עם ההחלטה.",
                effects: { food: 10, supplies: 8, morale: 10 }
            },
            {
                label: "לא לגעת ולהמשיך",
                desc: "לא שלנו, לא לוקחים",
                result: "עברתם הלאה. חלק מהצוות מאוכזב, אבל מכבד. הבטן ריקה, אבל המצפון נקי.",
                effects: { morale: 5, food: -10 }
            }
        ]
    },
    {
        title: "חולה בצוות",
        description: "אחד מהצוות מתעורר עם חום גבוה. הוא לא יכול ללכת. עצירה תעלה לכם זמן ומזון.",
        choices: [
            {
                label: "לעצור עד שיבריא",
                desc: "לא משאירים אף אחד מאחור",
                result: "עצרתם יומיים. החולה מחלים. הצוות רואה שמטפלים אחד בשני — המורל עולה.",
                effects: { food: -18, morale: 20 }
            },
            {
                label: "להכין אלונקה ולהמשיך",
                desc: "לשאת אותו ולהתקדם — קשה אבל אפשרי",
                result: "ההתקדמות איטית ומתישה, אבל אף אחד לא נשאר מאחור. הצוות מתלכד.",
                effects: { food: -10, morale: 10, supplies: -8 }
            },
            {
                label: "להשאיר שניים איתו ולהתקדם עם השאר",
                desc: "לפצל כוחות — חלק ממשיכים, חלק נשארים",
                result: "הקבוצה מתפצלת. אחרי יומיים הם מצטרפים חזרה, אבל הפיצול השאיר טעם מר.",
                effects: { food: -5, morale: -12, supplies: 10 }
            }
        ]
    },
    {
        title: "שביל הרים מסוכן",
        description: "השביל העובר בהרים קצר בהרבה, אבל תלול ומסוכן. השביל העוקף ארוך ובטוח אבל יעלה מזון וזמן.",
        choices: [
            {
                label: "שביל ההרים",
                desc: "קצר ומסוכן — חוסך זמן",
                result: "עליה קשה, רגעים של פחד, אבל הגעתם. מהפסגה הנוף עוצר נשימה. הצוות מרגיש שהוא יכול הכל.",
                effects: { morale: 15, supplies: -10, people: -1 }
            },
            {
                label: "השביל העוקף",
                desc: "ארוך ובטוח — בלי הפתעות",
                result: "הליכה ארוכה ושקטה. לא קרה כלום מיוחד, אבל כולם שלמים.",
                effects: { food: -15, morale: -5 }
            }
        ]
    },
    {
        title: "ירח מלא",
        description: "הלילה ירח מלא מואר. חלק מהצוות רוצה לנצל את האור ולהתקדם בלילה. אחרים רוצים לעשות מדורה ולספר סיפורים.",
        choices: [
            {
                label: "מדורה וסיפורים",
                desc: "לילה של חיבור — מזון לנשמה",
                result: "לילה קסום. אנשים משתפים סיפורים שלא שמעתם. הצוות מרגיש כמו משפחה.",
                effects: { morale: 25, food: -8 }
            },
            {
                label: "צעידת לילה",
                desc: "לנצל את האור ולהתקדם",
                result: "התקדמות טובה באוויר הקריר. הגעתם לנקודה טובה, אבל כולם עייפים.",
                effects: { supplies: 10, morale: -10 }
            },
            {
                label: "מדורה קצרה ואז צעידה",
                desc: "קצת מכל דבר",
                result: "שעה של מדורה, ואז יוצאים לדרך. פשרה טובה — לא מושלמת, אבל הוגנת.",
                effects: { morale: 8, food: -5, supplies: 5 }
            }
        ]
    },
    {
        title: "גשר רעוע",
        description: "הדרך עוברת מעל נחל עמוק. יש גשר עץ ישן — הוא נראה רעוע. אפשר גם לרדת ולחצות דרך המים.",
        choices: [
            {
                label: "לחצות בגשר אחד-אחד",
                desc: "לאט ובזהירות",
                result: "חצייה איטית ומתוחה. הגשר מחזיק. כולם עוברים בשלום אחרי שעה של מתח.",
                effects: { morale: -5, supplies: -3 }
            },
            {
                label: "לחצות דרך המים",
                desc: "רטוב אבל בטוח",
                result: "ירדתם למים. הזרם חזק מהצפוי, ציוד נרטב ונהרס, אבל כולם חצו בשלום.",
                effects: { supplies: -15, morale: 5 }
            },
            {
                label: "לחזק את הגשר ואז לעבור",
                desc: "להשקיע ציוד ביציבות",
                result: "שעתיים של עבודה קשה, אבל הגשר יציב עכשיו. כולם עוברים ביטחון.",
                effects: { supplies: -8, morale: 10, food: -5 }
            }
        ]
    },
    {
        title: "שמועה על מקלט",
        description: "פגשתם נווד שמספר על מקלט בטוח — יישוב קטן במרחק שלושה ימים. הוא לא בטוח שהוא עדיין שם.",
        choices: [
            {
                label: "לשנות כיוון למקלט",
                desc: "סיכוי למקום בטוח — שווה את ההימור",
                result: "שלושה ימי הליכה קשים. המקלט שם! יישוב קטן שמקבל אתכם בחום.",
                effects: { food: -20, morale: 25, supplies: 15 }
            },
            {
                label: "להמשיך בדרך המקורית",
                desc: "לא לסמוך על שמועות",
                result: "ממשיכים כמתוכנן. אין הפתעות. הדרך בטוחה אבל משעממת. 'מה אם המקלט היה אמיתי?' חושבים כמה.",
                effects: { food: -8, morale: -5 }
            }
        ]
    },
    {
        title: "מזון מורעל?",
        description: "מצאתם עצי פרי. הפירות נראים טוב, אבל אף אחד לא מזהה את הסוג. חלק מהצוות רעב מאוד.",
        choices: [
            {
                label: "לאכול בזהירות",
                desc: "אחד טועם קודם, מחכים ורואים",
                result: "המתנדב טועם ומרגיש בסדר. הפירות טעימים ומזינים! הצוות אוכל עד שובע.",
                effects: { food: 25, morale: 10 }
            },
            {
                label: "לא לגעת",
                desc: "לא שווה את הסיכון",
                result: "ממשיכים רעבים. בהמשך הדרך מוצאים שרידי אוכל ישן — עדיף מכלום.",
                effects: { food: 5, morale: -8 }
            }
        ]
    },
    {
        title: "ילד אבוד",
        description: "שומעים בכי מאחורי הסלעים. ילד קטן, לבד, מפוחד. הוא לא מדבר, רק בוכה. אין סימן להורים באזור.",
        choices: [
            {
                label: "לקחת אותו איתכם",
                desc: "לא משאירים ילד לבד",
                result: "הילד נרגע אחרי כמה שעות. הוא לא מדבר הרבה, אבל חייך כשמישהו נתן לו אוכל. הצוות מתגייס סביבו.",
                effects: { people: 1, food: -12, morale: 20 }
            },
            {
                label: "לחפש את משפחתו באזור",
                desc: "להשקיע זמן בחיפוש לפני שממשיכים",
                result: "חצי יום חיפושים. מצאתם את אמו פצועה ליד עץ. טיפלתם בה ושלחתם אותם לכיוון בטוח.",
                effects: { food: -10, supplies: -8, morale: 25 }
            }
        ]
    }
];

// === פונקציות עזר ===

// בחירת אירוע אקראי שלא השתמשנו בו
function getRandomEvent() {
    const available = events.filter((_, i) => !state.usedEvents.includes(i));
    if (available.length === 0) {
        state.usedEvents = [];
        return getRandomEvent();
    }
    const index = Math.floor(Math.random() * available.length);
    const originalIndex = events.indexOf(available[index]);
    state.usedEvents.push(originalIndex);
    return available[index];
}

// עדכון משאבים
function applyEffects(effects) {
    for (const [key, value] of Object.entries(effects)) {
        state.resources[key] = Math.max(0, Math.min(100, state.resources[key] + value));
    }
    // אנשים לא יכולים להיות יותר מ-20 או פחות מ-0
    state.resources.people = Math.max(0, Math.min(20, state.resources.people));
}

// הצגת ערכי משאבים + אנימציה
function updateResourceDisplay(effects) {
    const mapping = {
        people: 'res-people',
        food: 'res-food',
        morale: 'res-morale',
        supplies: 'res-supplies'
    };

    for (const [key, elementId] of Object.entries(mapping)) {
        const el = document.getElementById(elementId);
        el.textContent = state.resources[key];

        if (effects && effects[key]) {
            el.classList.remove('flash-green', 'flash-red');
            // force reflow for re-triggering animation
            void el.offsetWidth;
            el.classList.add(effects[key] > 0 ? 'flash-green' : 'flash-red');
        }
    }
}

// הצגת תגיות שינוי
function renderEffectTags(effects) {
    const container = document.getElementById('result-effects');
    const names = { people: 'אנשים', food: 'מזון', morale: 'מורל', supplies: 'ציוד' };

    container.innerHTML = '';
    for (const [key, value] of Object.entries(effects)) {
        if (value === 0) continue;
        const tag = document.createElement('span');
        tag.className = `effect-tag ${value > 0 ? 'positive' : 'negative'}`;
        const sign = value > 0 ? '+' : '';
        tag.textContent = `${names[key]} ${sign}${value}`;
        container.appendChild(tag);
    }
}

// בדיקה אם המשחק נגמר
function checkGameOver() {
    if (state.resources.people <= 0) return 'no-people';
    if (state.resources.food <= 0 && state.resources.morale <= 0) return 'no-hope';
    if (state.round > state.maxRounds) return 'survived';
    return null;
}

// === ניהול מסכים ===

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// === סיבוב משחק ===

function startRound() {
    const event = getRandomEvent();

    document.getElementById('current-round').textContent = state.round;
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-description').textContent = event.description;

    // הצגת בחירות
    const choicesArea = document.getElementById('choices-area');
    choicesArea.innerHTML = '';

    event.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `
            <span class="choice-label">${choice.label}</span>
            <span class="choice-desc">${choice.desc}</span>
        `;
        btn.addEventListener('click', () => handleChoice(choice));
        choicesArea.appendChild(btn);
    });

    // הסתרת תוצאה קודמת
    document.getElementById('result-area').classList.add('hidden');
    choicesArea.style.display = 'flex';
}

function handleChoice(choice) {
    // הסתרת הבחירות
    document.getElementById('choices-area').style.display = 'none';

    // החלת השפעות
    applyEffects(choice.effects);

    // הצגת תוצאה
    document.getElementById('result-text').textContent = choice.result;
    renderEffectTags(choice.effects);
    updateResourceDisplay(choice.effects);

    const resultArea = document.getElementById('result-area');
    resultArea.classList.remove('hidden');

    // בדיקת סיום
    const gameOver = checkGameOver();
    const nextBtn = document.getElementById('next-btn');

    if (gameOver && gameOver !== 'survived') {
        nextBtn.textContent = 'ראה תוצאות';
        nextBtn.onclick = () => endGame(gameOver);
    } else {
        state.round++;
        if (state.round > state.maxRounds) {
            nextBtn.textContent = 'ראה תוצאות';
            nextBtn.onclick = () => endGame('survived');
        } else {
            nextBtn.textContent = 'הסיבוב הבא';
            nextBtn.onclick = startRound;
        }
    }
}

// === סיום ===

function endGame(reason) {
    showScreen('end-screen');

    const title = document.getElementById('end-title');
    const summary = document.getElementById('end-summary');

    if (reason === 'survived') {
        title.textContent = 'שרדתם!';
        summary.textContent = `הובלת את הצוות דרך 10 סיבובים של דילמות, סכנות והחלטות קשות. לא הייתם מושלמים — אבל הייתם ביחד.`;
    } else if (reason === 'no-people') {
        title.textContent = 'הצוות התפזר';
        summary.textContent = 'לא נשאר אף אחד. ההחלטות הקשות גבו מחיר כבד מדי. אבל כל ניסיון הוא שיעור.';
    } else {
        title.textContent = 'לא נותר תקווה';
        summary.textContent = 'בלי מזון ובלי מורל, הצוות לא יכול להמשיך. לפעמים הנסיבות מנצחות. נסה שוב.';
    }

    // סטטיסטיקות
    const stats = document.getElementById('final-stats');
    const items = [
        { label: 'אנשים ששרדו', value: state.resources.people },
        { label: 'מזון נותר', value: state.resources.food },
        { label: 'מורל סופי', value: state.resources.morale },
        { label: 'ציוד נותר', value: state.resources.supplies }
    ];

    stats.innerHTML = items.map(item => `
        <div class="final-stat">
            <span class="stat-label">${item.label}</span>
            <span class="stat-value">${item.value}</span>
        </div>
    `).join('');
}

// === אתחול ===

document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('game-screen');
    updateResourceDisplay();
    startRound();
});

document.getElementById('restart-btn').addEventListener('click', () => {
    // איפוס מצב
    state.round = 1;
    state.resources = { people: 8, food: 70, morale: 60, supplies: 50 };
    state.usedEvents = [];
    showScreen('game-screen');
    updateResourceDisplay();
    startRound();
});
