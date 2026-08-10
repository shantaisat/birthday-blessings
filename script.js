const nameInput = document.getElementById("name");
const blessingButton = document.getElementById("blessingButton");
const blessingSection = document.getElementById("blessingSection");
const downloadButton = document.getElementById("downloadButton");
const anotherButton = document.getElementById("anotherButton");

const canvas = document.getElementById("blessingCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "blessing-background.PNG";

const blessings = [
    [
        "May the Lord bless you and keep you.",
        "May His face shine upon you",
        "and give you peace.",
        "",
        "Have a blessed day."
    ],

    [
        "May God's favour surround you today,",
        "His joy fill your heart,",
        "and His peace guard your home.",
        "",
        "Amen."
    ],

    [
        "Praying God's abundant blessings",
        "over you and your family today.",
        "",
        "Grace, health and provision",
        "in Jesus' name.",
        "",
        "Amen."
    ],

    [
        "Praying peace, joy",
        "and divine provision over you this week.",
        "",
        "May God go before you,",
        "strengthen you and keep you."
    ],

    [
        "As you have taken a moment",
        "to bless me today,",
        "may God return that kindness",
        "to you abundantly.",
        "",
        "May His grace rest upon you",
        "and all that concerns you.",
        "",
        "God bless you."
    ],

    [
        "May God's goodness meet you",
        "in every place you go.",
        "",
        "May doors open,",
        "peace remain",
        "and joy follow you.",
        "",
        "Amen."
    ],

    [
        "May the Lord refresh your spirit,",
        "strengthen your heart",
        "and bless the work of your hands.",
        "",
        "May this be a season",
        "of grace and favour for you."
    ],

    [
        "May your home be filled with peace,",
        "your heart with joy",
        "and your days with God's favour.",
        "",
        "May He keep you and your family",
        "safe and abundantly blessed."
    ],

    [
        "May God give you wisdom",
        "for every decision,",
        "strength for every challenge",
        "and peace for every concern.",
        "",
        "You are covered by His grace."
    ],

    [
        "May God surprise you",
        "with unexpected blessings,",
        "answered prayers",
        "and beautiful moments of joy.",
        "",
        "Have a truly blessed day."
    ]
];

let lastBlessingIndex = -1;

function chooseBlessing() {
    let index;

    do {
        index = Math.floor(Math.random() * blessings.length);
    } while (index === lastBlessingIndex && blessings.length > 1);

    lastBlessingIndex = index;

    return blessings[index];
}

function drawTextLines(lines, startY, lineHeight) {
    let y = startY;

    lines.forEach(line => {

        // Keep intentional spaces between paragraphs
        if (line === "") {
            y += lineHeight * 0.55;
            return;
        }

        const words = line.split(" ");

        // Maximum 3 words per line
        for (let i = 0; i < words.length; i += 3) {

            const shortLine = words
                .slice(i, i + 3)
                .join(" ");

            ctx.fillText(
                shortLine,
                canvas.width / 2,
                y
            );

            y += lineHeight;
        }
    });
}

function drawBlessing(name, blessing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        background,
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Name
    ctx.fillStyle = "#087b3e";
    ctx.font = "bold 82px Georgia";
    ctx.fillText(
        `${name},`,
        canvas.width / 2,
        340
    );

    // Decorative line
    ctx.strokeStyle = "#f4b400";
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(350, 410);
    ctx.lineTo(730, 410);
    ctx.stroke();

    // Blessing text
    ctx.fillStyle = "#17231b";
    
    ctx.font = "44px Georgia";

drawTextLines(
    blessing,
    500,
    60
);

    // Signature
    ctx.fillStyle = "#087b3e";
    ctx.font = "italic 42px Georgia";

    ctx.fillText(
        "With love,",
        canvas.width / 2,
        1190
    );

    ctx.font = "italic bold 62px Georgia";

    ctx.fillText(
        "Shanta",
        canvas.width / 2,
        1260
    );
}

function generateBlessing() {
    const name = nameInput.value.trim();

    if (!name) {
        alert("Please enter your name first.");
        nameInput.focus();
        return;
    }

    const blessing = chooseBlessing();

    if (background.complete) {
        drawBlessing(name, blessing);
    } else {
        background.onload = () => {
            drawBlessing(name, blessing);
        };
    }

    blessingSection.classList.remove("hidden");

    setTimeout(() => {
        blessingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}

function downloadBlessing() {
    const name =
        nameInput.value.trim() || "Blessing";

    const link =
        document.createElement("a");

    link.download =
        `${name}-blessing-from-Shanta.png`;

    link.href =
        canvas.toDataURL("image/png");

    link.click();
}

blessingButton.addEventListener(
    "click",
    generateBlessing
);

anotherButton.addEventListener(
    "click",
    generateBlessing
);

downloadButton.addEventListener(
    "click",
    downloadBlessing
);

nameInput.addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            generateBlessing();
        }
    }
);