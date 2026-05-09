const UnityDeffTheBase = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Def the Base - Tower Defense</h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Má druhá mobilní strategická hra vyvíjená v enginu <strong className="text-white">Unity</strong>. Hráč
                    brání hlavní budovu uprostřed mapy před vlnami nepřátel, kteří se náhodně objevují kolem celé mapy a
                    vycházejí ze stromů. Programování a veškerou práci v Unity jsem měl na starost já a grafiku jsem zpočátku
                    kreslil sám. Poté se do vývoje přidal můj bratranec a převzal design a ilustrace.
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
                        Z hlavního menu lze spustit novou hru, pokračovat v rozehrané partii, přejít do tutoriálů nebo
                        vylepšit svoje budovy (Upgrade). V options lze nastavit hlasitost hudby a zvukových efektů. V
                        rozšířeném nastavení jsou dostupné tři obtížnosti -{" "}
                        <strong className="text-white">Easy, Normal a Hard</strong> a tři velikosti mapy -{" "}
                        <strong className="text-white">Small, Normal a Large</strong>.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/menu_main.png"
                            alt="Hlavní menu Def the Base"
                            className="w-full object-cover"
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
                        Hra nabízí sadu tutoriálových misí, za jejichž splnění hráč obdrží{" "}
                        <strong className="text-white">zlaté odměny</strong> (ale pouze jednou). Každá mise má definovaný cíl
                        (např. přežít 20 vln), dostupné typy budov a zobrazenou výši odměny.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/menu_missions.png"
                            alt="Výběr misí a tutoriálů"
                            className="w-full object-cover"
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
                        Systém vylepšení umožňuje investovat získané zlato do trvalého zlepšení statistik budov - například
                        zvýšení maximálního štítu, poškození nebo frekvence střelby. Za zhlédnutí reklamy lze získat bonusové
                        zlato.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/upgrade_tree.png"
                            alt="Strom vylepšení budov"
                            className="w-full object-cover"
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
                        Spodní lišta slouží k nákupu budov a jejich přetažení na mapu. K dispozici jsou:{" "}
                        <strong className="text-white">
                            Minigun (150), Launcher (300), Quarry (200), Shield Generator (350)
                        </strong>{" "}
                        a <strong className="text-white">Wall (100)</strong>. Quarry lze pokládat pouze na pole s červenou
                        rudou. Mapa se generuje automaticky podle zvolené velikosti a rudy jsou rozmístěny po kvadrantech.
                        Pravý panel umožňuje vybranou budovu vylepšit, opravit nebo prodat.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/gameplay_active.png"
                            alt="Aktivní gameplay - nakupování a správa budov"
                            className="w-full object-cover"
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
                        Animace budov jsou řešeny střídáním obrázků ve stylu GIF. Po mapě se lze pohybovat jedním prstem a
                        přibližovat/oddalovat dvěma - oddalovací limit odpovídá velikosti mapy. Zdi se{" "}
                        <strong className="text-white">automaticky propojují</strong> se sousedními zdmi ve všech osmi
                        směrech. Přímé sousedy jsou vždy upřednostněny před diagonálami.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/gameplay_build.png"
                            alt="Automatické propojování zdí"
                            className="w-full object-cover"
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
                        Hra umožňuje opravit všechny poškozené budovy stejného typu najednou jediným kliknutím. Přehledně
                        jsou zobrazeny celkové náklady na opravu každé kategorie - Miniguns, Rocket Launchers, Quarries,
                        Shield Generators a Walls.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/building_management.png"
                            alt="Hromadná oprava budov podle typu"
                            className="w-full object-cover"
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
                        Každé desáté kolo nastupují <strong className="text-white">Bossové</strong> v podobě tanků - výrazně
                        odolnější než běžní nepřátelé. Tlačítkem v pravém horním rohu lze hru zrychlit a přeskočit čekání
                        mezi vlnami.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/boss_wave.png"
                            alt="Boss vlna - tanky útočí na základnu"
                            className="w-full object-cover"
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
                        Pauza zobrazuje aktuální průběh hry i historické rekordy:{" "}
                        <strong className="text-white">nejlepší skóre, nejvyšší dosaženou vlnu</strong>, počet zabitých
                        nepřátel a počet postavených struktur. Odtud lze také upravit hlasitost hudby a zvuků nebo se vrátit
                        do menu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/defTheBase/pause_menu.png"
                            alt="Pause menu se statistikami"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Pause menu s přehledem Best Score, Best Wave a aktuálními statistikami průchodu.
                    </p>
                </section>

                {/* Animation detail */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">9. Technické zpracování animací</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        Všechny animace ve hře jsou implementovány jako sekvence sprite obrázků přepínáných ve smyčce -
                        princip obdobný formátu GIF. Jednotlivé stavy (idle, akce, zničení) jsou řízeny přes Unity komponent{" "}
                        <strong className="text-white">Animator</strong>, který na základě herních parametrů přepíná mezi
                        příslušnými animačními klipy.
                    </p>

                    {/* Minigun */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Minigun</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Animace Minigunu se skládá z <strong className="text-white">6 snímků</strong> rozdělených do tří
                            stavů: klidový režim (idle), střelba a zničení. Snímky na sebe plynule navazují a Animator
                            automaticky přepíná mezi stavy podle aktuální situace na mapě.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/minigun.png"
                                alt="Minigun - sprite sheet animace"
                                className="max-h-72 object-contain"
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
                            Rocket Launcher využívá <strong className="text-white">16 snímků</strong> pro tři stavy: idle,
                            nabíjení (reload) a zničení. Vystřelená raketa má navíc vlastní sadu snímků - její let a dopad
                            jsou animovány jako samostatná sprite sekvence nezávislá na věži.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/rocket_launcher.png"
                                alt="Rocket Launcher - sprite sheet animace"
                                className="max-h-72 object-contain"
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
                            Běžní nepřátelé mají dvě animační sady o celkem{" "}
                            <strong className="text-white">12 snímcích</strong>: pohyb v klidovém stavu (idle/chůze) a útočná
                            animace při dosažení cíle. Přepnutí mezi stavy řídí Animator podle toho, zda nepřítel právě útočí
                            nebo se přesouvá.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/enemy.png"
                                alt="Nepřítel - sprite sheet animace"
                                className="max-h-72 object-contain"
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
                            Bossové mají složitější animační graf v Unity <strong className="text-white">Animatoru</strong>.
                            Na snímku je vidět rozložení jednotlivých animačních stavů a přechodů mezi nimi - právě
                            přehrávaným klipem je animace střelby. Každý přechod je podmíněn herními parametry (vzdálenost od
                            cíle, zdraví, útočný stav).
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/defTheBase/boss_animation.png"
                                alt="Boss - rozložení Animatoru v Unity"
                                className="w-full object-cover"
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
                            Při zničení Bosse se přehraje dedikovaný snímek smrtelné animace. Ten vizuálně potvrdí hráči, že
                            byl tank definitivně vyřazen z boje, než objekt zmizí z mapy.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/defTheBase/boss_death.png"
                                alt="Boss - animace smrti"
                                className="max-h-72 object-contain"
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

