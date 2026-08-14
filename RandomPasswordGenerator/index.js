const CHARSETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?~",
};

const AMBIGUOUS = /[l1IO0]/;

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const checkboxes = {
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    numbers: document.getElementById("numbers"),
    symbols: document.getElementById("symbols"),
};
const excludeAmbiguous = document.getElementById("excludeAmbiguous");
const excludeDuplicates = document.getElementById("excludeDuplicates");
const passwordEl = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const errorMsg = document.getElementById("errorMsg");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");
const toast = document.getElementById("toast");

function randomInt(max) {
    const range = new Uint32Array(1);
    crypto.getRandomValues(range);
    return range[0] % max;
}

function pickRandomChar(pool) {
    return pool.charAt(randomInt(pool.length));
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildPools() {
    const pools = [];
    for (const key in checkboxes) {
        if (!checkboxes[key].checked) continue;
        let chars = CHARSETS[key];
        if (excludeAmbiguous.checked) {
            chars = chars.split("").filter((c) => !AMBIGUOUS.test(c)).join("");
        }
        if (chars.length) pools.push(chars);
    }
    return pools;
}

function generatePassword() {
    errorMsg.textContent = "";
    const length = Number(lengthInput.value);
    const pools = buildPools();

    if (pools.length === 0) {
        errorMsg.textContent = "Select at least one character type.";
        return null;
    }

    const fullPool = pools.join("");

    if (excludeDuplicates.checked && length > fullPool.length) {
        errorMsg.textContent = `Length must be ≤ ${fullPool.length} for unique characters with current options.`;
        return null;
    }

    if (length < pools.length) {
        errorMsg.textContent = `Length must be ≥ ${pools.length} to include every selected character type.`;
        return null;
    }

    let passwordChars = [];
    const usedChars = new Set();

    const takeChar = (pool) => {
        if (!excludeDuplicates.checked) return pickRandomChar(pool);
        let available = pool.split("").filter((c) => !usedChars.has(c));
        if (available.length === 0) return null;
        const c = available[randomInt(available.length)];
        usedChars.add(c);
        return c;
    };

    for (const pool of pools) {
        const c = takeChar(pool);
        if (c) passwordChars.push(c);
    }

    while (passwordChars.length < length) {
        const c = takeChar(fullPool);
        if (c === null) break;
        passwordChars.push(c);
    }

    return shuffle(passwordChars).join("");
}

function scorePassword(password) {
    if (!password) return { percent: 0, label: "—", color: "var(--danger)" };

    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 28;

    const entropy = password.length * Math.log2(poolSize || 1);

    if (entropy < 40) return { percent: 25, label: "Weak", color: "var(--danger)" };
    if (entropy < 60) return { percent: 50, label: "Fair", color: "var(--warn)" };
    if (entropy < 80) return { percent: 75, label: "Strong", color: "var(--accent-2)" };
    return { percent: 100, label: "Excellent", color: "var(--ok)" };
}

function updateStrength(password) {
    const { percent, label, color } = scorePassword(password);
    strengthFill.style.width = `${percent}%`;
    strengthFill.style.background = color;
    strengthLabel.textContent = label;
}

function render() {
    const password = generatePassword();
    if (password) {
        passwordEl.textContent = password;
        updateStrength(password);
    } else {
        passwordEl.textContent = "—";
        updateStrength("");
    }
}

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
    render();
});

Object.values(checkboxes).forEach((cb) => cb.addEventListener("change", render));
excludeAmbiguous.addEventListener("change", render);
excludeDuplicates.addEventListener("change", render);
generateBtn.addEventListener("click", render);

copyBtn.addEventListener("click", async () => {
    const text = passwordEl.textContent;
    if (!text || text === "—" || text === "Generate a password") return;
    await navigator.clipboard.writeText(text);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1500);
});

render();
