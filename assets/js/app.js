document.addEventListener('DOMContentLoaded', () => {
    const memberLists = document.getElementById('MemberLists');
    if (!memberLists) return;

    const members = JSON.parse(localStorage.getItem('techCommunityMembers') || '[]');

    if (members.length > 0) {
        memberLists.innerHTML = '';
        // render terbaru di atas (reverse)
        [...members].reverse().forEach(m => {
            const card = document.createElement('div');
            card.className = "relative w-auto h-24 bg-white rounded-2xl p-4 flex items-center gap-4 inset-shadow-2xs hover:inset-shadow-sm inset-shadow-lime-500/20 duration-200 border-b-2 border-r border-lime-500";
            card.innerHTML = `
                <div class="p-5 bg-lime-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <i data-lucide="user" class="text-lime-500"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="absolute -top-2 -right-2 flex items-center gap-1">
                        <img src="assets/images/item/Star.svg" class="w-6" onerror="this.style.display='none'" />
                        <img src="assets/images/item/Star.svg" class="w-4 mt-3" onerror="this.style.display='none'" />
                    </div>
                    <h3 class="font-semibold text-zinc-800 truncate">${m.nama}</h3>
                    <a href="mailto:${m.email}" class="text-zinc-500 text-sm hover:text-zinc-700 truncate block">${m.email}</a>
                    <p class="text-xs text-lime-500 truncate">${m.bidang}</p>
                </div>
            `;
            memberLists.appendChild(card);
        });

        // re-initialize lucide icons if the library is loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});
