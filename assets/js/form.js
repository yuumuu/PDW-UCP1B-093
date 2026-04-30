// ============================================================
// form.js — Halaman Join Us
// Validasi, simpan ke array, render member cards
// ============================================================

const newMembers = JSON.parse(localStorage.getItem('techCommunityMembers') || '[]');
document.addEventListener('DOMContentLoaded', renderMemberList);

const badgeColors = {
    "Web Development":         "bg-blue-100 text-blue-700",
    "Mobile Development":      "bg-purple-100 text-purple-700",
    "Data Science":            "bg-cyan-100 text-cyan-700",
    "UI/UX Design":            "bg-pink-100 text-pink-700",
    "Cybersecurity":           "bg-red-100 text-red-700",
    "DevOps & Cloud":          "bg-orange-100 text-orange-700",
    "Artificial Intelligence": "bg-lime-100 text-lime-700",
    "Game Development":        "bg-yellow-100 text-yellow-700",
};

const fieldEmoji = {
    "Web Development":         "🌐",
    "Mobile Development":      "📱",
    "Data Science":            "📊",
    "UI/UX Design":            "🎨",
    "Cybersecurity":           "🔐",
    "DevOps & Cloud":          "☁️",
    "Artificial Intelligence": "🤖",
    "Game Development":        "🎮",
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", !show);
}

function submitForm() {
    const namaEl   = document.getElementById("nama");
    const emailEl  = document.getElementById("email");
    const bidangEl = document.getElementById("bidang");

    const nama   = namaEl.value.trim();
    const email  = emailEl.value.trim();
    const bidang = bidangEl.value;

    // Reset errors
    showError("namaError", false);
    showError("emailError", false);
    showError("bidangError", false);

    let valid = true;
    if (!nama)                      { showError("namaError",  true); namaEl.focus();   valid = false; }
    if (!email || !isValidEmail(email)) { showError("emailError", true); if (valid) emailEl.focus(); valid = false; }
    if (!bidang)                    { showError("bidangError", true); valid = false; }

    if (!valid) return;

    // Simpan ke array
    const anggota = {
        nama,
        email,
        bidang,
        waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };
    newMembers.push(anggota);
    localStorage.setItem('techCommunityMembers', JSON.stringify(newMembers));

    // Alert konfirmasi
    alert(`✅ Registration Successful!\n\nName   : ${nama}\nEmail  : ${email}\nField  : ${bidang}\n\nWelcome to Tech Community! 🎉`);

    // Success inline message
    const successMsg    = document.getElementById("successMsg");
    const successDetail = document.getElementById("successDetail");
    if (successMsg) successMsg.classList.remove("hidden");
    if (successDetail) successDetail.textContent = `${nama} registered as ${bidang} at ${anggota.waktu}.`;

    // Re-init lucide untuk icon di success msg
    if (typeof lucide !== "undefined") lucide.createIcons();

    // Reset form
    namaEl.value   = "";
    emailEl.value  = "";
    bidangEl.value = "";

    // Render daftar
    renderMemberList();
}

function renderMemberList() {
    const list       = document.getElementById("memberList");
    const emptyState = document.getElementById("emptyState");
    const backLink   = document.getElementById("backLink");
    const badge      = document.getElementById("memberBadge");

    if (!list) return;

    if (newMembers.length === 0) {
        emptyState && emptyState.classList.remove("hidden");
        list.classList.add("hidden");
        backLink && backLink.classList.add("hidden");
        badge && badge.classList.add("hidden");
        return;
    }

    emptyState && emptyState.classList.add("hidden");
    list.classList.remove("hidden");
    backLink && backLink.classList.remove("hidden");

    if (badge) {
        badge.classList.remove("hidden");
        badge.textContent = `${newMembers.length} registered`;
    }

    list.innerHTML = "";

    // Render terbaru di atas
    [...newMembers].reverse().forEach((m, i) => {
        const colorClass = badgeColors[m.bidang] || "bg-zinc-100 text-zinc-700";
        const emoji      = fieldEmoji[m.bidang]  || "💻";
        const initial    = m.nama.charAt(0).toUpperCase();

        const card = document.createElement("div");
        card.className = "relative bg-white rounded-2xl border border-zinc-100 p-4 flex items-center gap-4 inset-shadow-2xs inset-shadow-lime-500/20 border-b-2 border-r border-lime-500 member-card-enter";
        card.innerHTML = `
            <div class="absolute -top-2 -right-2 flex items-center gap-1 pointer-events-none">
                <img src="../assets/images/item/Star.svg" class="w-5" onerror="this.style.display='none'" />
                <img src="../assets/images/item/Star.svg" class="w-3.5 mt-2" onerror="this.style.display='none'" />
            </div>
            <div class="p-3 bg-lime-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span class="text-lg">${emoji}</span>
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-zinc-800 text-sm truncate">${m.nama}</h3>
                <a href="mailto:${m.email}" class="text-zinc-400 text-xs hover:text-zinc-600 truncate block">${m.email}</a>
                <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${colorClass}">${m.bidang}</span>
            </div>
            <div class="text-xs text-zinc-300 flex-shrink-0">${m.waktu}</div>
        `;
        list.appendChild(card);
    });
}