const UnityDeffTheBase = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Def the Base</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-green-400 mb-4">Tower Defense</p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Mobilní tower defense v <strong className="text-white">Unity</strong>. Hráč brání hlavní budovu uprostřed
                    mapy před vlnami nepřátel, kteří se náhodně objevují kolem mapy a vycházejí ze stromů. Programování a
                    veškerou práci v Unity jsem měl na starost já, grafiku zpočátku také. Později se do vývoje přidal můj
                    bratranec a převzal design a ilustrace.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {["Unity 2D", "C#", "Tower Defense", "Procedurální mapa", "Android", "iOS"].map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-slate-700/60 border border-slate-600/50 text-slate-300 px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-14">
                {/* Menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">1. Hlavní menu</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Menu nabízí novou hru, pokračování, tutoriály a upgrade budov. V nastavení jsou tři obtížnosti (
                        <strong className="text-white">Easy, Normal, Hard</strong>) a tři velikosti mapy (
                        <strong className="text-white">Small, Normal, Large</strong>).
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/menu_main.webp"
                            alt="Hlavní menu Def the Base"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Hlavní menu s výběrem obtížnosti a přístupem ke všem herním módům.
                    </p>
                </section>

                {/* Missions */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">2. Mise a tutoriály</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Sada tutoriálových misí s <strong className="text-white">zlatými odměnami</strong> (jednorázovými).
                        Každá mise má definovaný cíl (např. přežít 20 vln), povolené typy budov a výši odměny.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/menu_missions.webp"
                            alt="Výběr misí a tutoriálů"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Přehled misí s cílem, povolenými budovami a zlatou odměnou za dokončení.
                    </p>
                </section>

                {/* Upgrade */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">3. Strom vylepšení</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Zlato získané z misí lze investovat do trvalého zlepšení statistik budov - vyšší štít, poškození nebo
                        frekvence střelby. Bonusové zlato za zhlédnutí reklamy.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/upgrade_tree.webp"
                            alt="Strom vylepšení budov"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Vizuální strom vylepšení s možností odemykání nových uzlů za zlato.
                    </p>
                </section>

                {/* Gameplay */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">4. Stavba základny a správa budov</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Spodní lišta pro nákup budov:{" "}
                        <strong className="text-white">
                            Minigun (150), Launcher (300), Quarry (200), Shield Generator (350)
                        </strong>{" "}
                        a <strong className="text-white">Wall (100)</strong>. Quarry vyžaduje pole s rudou. Mapa se generuje
                        automaticky podle zvolené velikosti, rudy jsou rozmístěny po kvadrantech. Pravý panel umožňuje
                        vylepšení, opravu nebo prodej budovy.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/gameplay_active.webp"
                            alt="Aktivní gameplay - nakupování a správa budov"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Pohled na základnu s pravým panelem pro vylepšení, opravu a prodej budov.
                    </p>
                </section>

                {/* Animations + Walls */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">5. Animace a inteligentní zdi</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Animace budov střídáním obrázků (GIF princip). Mapa se ovládá jedním prstem (pohyb), dvěma (zoom).
                        Zdi se <strong className="text-white">automaticky propojují</strong> se sousedními zdmi ve všech osmi
                        směrech, přímé sousedy upřednostňují.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/gameplay_build.webp"
                            alt="Automatické propojování zdí"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Zdi se inteligentně spojují do optimálního tvaru bez manuálního nastavování.
                    </p>
                </section>

                {/* Repair all */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">6. Hromadná oprava budov</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Jedním kliknutím lze opravit všechny poškozené budovy daného typu. Zobrazeny jsou celkové náklady za
                        Miniguns, Rocket Launchers, Quarries, Shield Generators a Walls.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/building_management.webp"
                            alt="Hromadná oprava budov podle typu"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Panel hromadné opravy zobrazující ceny za opravu každého typu struktury.
                    </p>
                </section>

                {/* Boss wave */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">7. Boss vlny</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Každé desáté kolo přicházejí <strong className="text-white">Bossové</strong> v podobě tanků, výrazně
                        odolnější než běžní nepřátelé. Tlačítkem v pravém horním rohu lze zrychlit hru.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/boss_wave.webp"
                            alt="Boss vlna - tanky útočí na základnu"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Tankoví Bossové útočící na plně postavenou základnu v pokročilé fázi hry.
                    </p>
                </section>

                {/* Pause menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">8. Pauza a statistiky</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Pauza zobrazuje aktuální průběh i rekordy:{" "}
                        <strong className="text-white">nejlepší skóre, nejvyšší vlnu</strong>, počet zabitých nepřátel a
                        postavených struktur. Lze upravit hlasitost nebo se vrátit do menu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/pause_menu.webp"
                            alt="Pause menu se statistikami"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Pause menu s přehledem Best Score, Best Wave a aktuálními statistikami průchodu.
                    </p>
                </section>

                {/* Audio */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">9. Hudba a zvukové efekty</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        Vlastní hudební stopa - odlišná melodie pro <strong className="text-white">menu</strong> a pro{" "}
                        <strong className="text-white">hru</strong>. K tomu rozsáhlá sada zvukových efektů reagujících na
                        každou akci. Hlasitost hudby a efektů lze nastavit nezávisle.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { label: "Střela Minigunu", desc: "Zvuk při každém výstřelu věže" },
                            { label: "Zásah střely", desc: "Zvuk při dopadu projektilu na cíl" },
                            { label: "Střela Rocket Launcheru", desc: "Zvuk odpálení rakety" },
                            { label: "Splash rakety", desc: "Výbuch při plošném dopadu rakety" },
                            { label: "Zásah nepřítele", desc: "Zvuk při poškození nepřítele" },
                            { label: "Výstřel Bosse", desc: "Specifický zvuk tankové palby" },
                            { label: "Tlačítka", desc: "Zpětná vazba při klepnutí na UI prvky" },
                            { label: "Vylepšení budovy", desc: "Zvuk při provedení upgradu" },
                            { label: "Oprava budovy", desc: "Zvuk při opravě poškozené struktury" },
                            { label: "Zničení budovy", desc: "Zvuk při pádu vlastní struktury" },
                            { label: "Položení budovy", desc: "Potvrzení při umístění nové stavby" },
                            { label: "Vygenerování štítu", desc: "Zvuk aktivace Shield Generatoru" },
                            { label: "A hromada dalších", desc: "..." },
                        ].map(({ label, desc }) => (
                            <div
                                key={label}
                                className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3"
                            >
                                <p className="text-white text-sm font-semibold">{label}</p>

                                <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Animation detail */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">10. Technické zpracování animací</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        Sekvence sprite obrázků přepínaných ve smyčce (GIF princip). Stavy (idle, akce, zničení) řídí Unity{" "}
                        <strong className="text-white">Animator</strong> na základě herních parametrů.
                    </p>

                    {/* Minigun */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Minigun</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong className="text-white">6 snímků</strong> ve třech stavech: idle, střelba, zničení.
                            Animator přepíná podle situace na mapě.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/minigun.webp"
                                alt="Minigun - sprite sheet animace"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Sprite sekvence Minigunu: idle, střelba a zničení (6 snímků).
                        </p>
                    </div>

                    {/* Rocket Launcher */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Rocket Launcher</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong className="text-white">16 snímků</strong> pro idle, reload a zničení. Raketa při dopadu
                            způsobuje <strong className="text-white">plošné poškození (splash damage)</strong>. Její let a
                            výbuch tvoří samostatnou sprite sekvenci nezávislou na věži.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/rocket_launcher.webp"
                                alt="Rocket Launcher - sprite sheet animace"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Sprite sekvence Rocket Launcheru: idle, nabíjení a zničení (16 snímků) + samostatná animace
                            rakety.
                        </p>
                    </div>

                    {/* Enemy */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Nepřítel</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong className="text-white">12 snímků</strong> ve dvou sadách: pohyb (idle/chůze) a útok.
                            Animator přepíná podle toho, zda nepřítel útočí nebo se přesouvá.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/enemy.webp"
                                alt="Nepřítel - sprite sheet animace"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Sprite sekvence nepřítele: idle a útočný stav (12 snímků).
                        </p>
                    </div>

                    {/* Boss Animator */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Boss - nastavení Animatoru</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Složitější animační graf v Unity <strong className="text-white">Animatoru</strong>. Přechody jsou
                            podmíněny parametry (vzdálenost od cíle, zdraví, útočný stav).
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/defTheBase/boss_animation.webp"
                                alt="Boss - rozložení Animatoru v Unity"
                                className="w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Animator okno s animačním grafem Bosse - aktivní klip zobrazuje animaci střelby.
                        </p>
                    </div>

                    {/* Boss Death */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">Boss - smrt</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Dedikovaný snímek potvrzující zničení tanku, než objekt zmizí z mapy.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/boss_death.webp"
                                alt="Boss - animace smrti"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Snímek zobrazující vizuální efekt zničení tankového Bosse.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UnityDeffTheBase;

