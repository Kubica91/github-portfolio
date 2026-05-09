const UnityJumpingJello = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Jumping Jello - 2D Platformer</h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Moje největší a nejpropracovanější mobilní hra vyvíjená v enginu{" "}
                    <strong className="text-white">Unity</strong>. Jde o 2D platformer, kde hráč skáče po plošinách, sbírá
                    ovoce a odemyká nové skiny. Veškeré programování v <strong className="text-white">C#</strong>, návrh
                    levelů, systémy achievementů, procedurálně generované infinity levely i technické věci jako shadery a
                    animace kostí jsem měl kompletně na starost já. Veškerou grafiku a ilustrace navrhl a nakreslil můj
                    bratranec.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {[
                        "Unity 2D",
                        "C#",
                        "2D Platformer",
                        "Shader Graph",
                        "Sprite Skin",
                        "IK Manager 2D",
                        "Android",
                        "iOS",
                        "Achievement systém",
                    ].map((tag) => (
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
                {/* Skins */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">1. Menu – výběr skinů</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Po spuštění hry se hráč dostane na obrazovku výběru skinů zasazenou do{" "}
                        <strong className="text-white">retro rámu televizoru</strong>. K dispozici je šest hratelných postav:{" "}
                        <strong className="text-white">Jello</strong> (zelený rosol, odemčen od začátku),{" "}
                        <strong className="text-white">Blackrook</strong> a <strong className="text-white">Whiterook</strong>{" "}
                        (šachové figurky věže), <strong className="text-white">Pencil</strong> (tužka),{" "}
                        <strong className="text-white">Monster</strong> (jednooký fialový netvor) a{" "}
                        <strong className="text-white">Snowman</strong> (sněhulák). Zamčené skiny jsou zobrazeny normálně -
                        po kliknutí na ně se panel otočí a odhalí úkol potřebný k odemčení. Podmínky odemčení jsou:{" "}
                        <strong className="text-white">Blackrook</strong> - nasbírat 10 ovoce v levelu 1,{" "}
                        <strong className="text-white">Pencil</strong> - dokončit level 2 do 3 minut,{" "}
                        <strong className="text-white">Whiterook</strong> - nasbírat celkem 50 ovoce,{" "}
                        <strong className="text-white">Monster</strong> - najít secret item v levelu 3,{" "}
                        <strong className="text-white">Snowman</strong> - najít secret item v levelu 7.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/jumpingJello/skins.png"
                            alt="Výběr skinů - všechny postavy"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-8 text-center italic">
                        Obrazovka výběru skinů s šesti postavami - vpravo přepínače SFX a hudby, dole lišta výběru levelu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/skins_task.png"
                            alt="Úkol pro odemčení skinu Rookblack"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Po kliknutí na zamčený skin se zobrazí jeho úkol - zde „Collect 10 fruit in Level 1" pro odemčení
                        Rookblacka.
                    </p>
                </section>

                {/* Level select - open levels */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">2. Menu – výběr levelů</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Spodní lišta s číslicemi <strong className="text-white">S, 1–12</strong> slouží jako navigátor mezi
                        všemi herními obrazovkami - <strong className="text-white">S</strong> = skiny, čísla 1–8 jsou
                        normální levely, 9–12 jsou infinity levely. Ve výhledu televizoru se vždy zobrazí náhled daného
                        levelu s pozadím odpovídajícím prostředí - les, jeskyně, město nebo sníh. Nad náhledem jsou vidět
                        aktuální statistiky: počet sebraného ovoce a procentuální postup.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_1.png"
                                    alt="Menu - Level 1 les"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">Level 1 - les, 10/10 ovoce.</p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_3.png"
                                    alt="Menu - Level 3 jeskyně"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Level 3 - jeskyně, hvězda sekretu 1/1.
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_5.png"
                                    alt="Menu - Level 5 město"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">Level 5 - město, 7/10 ovoce.</p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_7.png"
                                    alt="Menu - Level 7 sníh"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Level 7 - zasněžená krajina, hvězda sekretu 0/1.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Locked levels */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">3. Menu – zamčené levely</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Pokud hráč nesplnil podmínky pro odemčení, level se zobrazí se šedým pozadím a hláškou{" "}
                        <strong className="text-white">LEVEL IS LOCKED</strong>. U normálních levelů je zobrazeno, kolik
                        levelů bylo dokončeno a kolik ovoce celkem sesbíráno. Infinity levely mají vlastní podmínku odemčení
                        - například nejprve dokončit level 7 a 8.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_8_closed.png"
                                    alt="Menu - Level 8 zamčen"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Level 8 zamčen - zobrazuje dokončené levely (6/7) a sesbírané ovoce (55/70).
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_12_closed.png"
                                    alt="Menu - Infinity Level 4 zamčen"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Infinity Level 4 zamčen - podmínkou je nejprve odemčít levely 7 a 8.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Jump Meter */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">4. Hra – Jump Meter</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Základní herní mechanika stojí na{" "}
                        <strong className="text-white">přidržení prstu na obrazovce</strong>. Čím déle hráč drží, tím vyšší
                        skok postavička provede - maximum je dosaženo po přibližně jedné sekundě. Aktuální síla skoku je
                        vizualizována přes <strong className="text-white">Jump Meter</strong> - kruhový ukazatel uprostřed
                        obrazovky, kde se barevné tečky postupně rozsvěcují dokola od spodního bodu po 360°. Horní lišta
                        zobrazuje celkový postup hráče mapou, vlevo nahoře je počet sebraného ovoce.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/jump_meter.png"
                            alt="Jump Meter - ukazatel síly skoku"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Jump Meter uprostřed obrazovky - tečky se plní dokola a ukazují nabíjející se sílu skoku.
                    </p>
                </section>

                {/* Fruits */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">5. Hra – ovoce a sbírání</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        V každém levelu je rozmístěno <strong className="text-white">10 kusů ovoce</strong>, které hráč sbírá
                        skákáním. Ovoce visí ve vzduchu nebo je umístěno na platformách a je nutné ho dosáhnout přesně
                        odměřeným skokem. Ve hře se objevuje více druhů - banány, třešně, hrozny, meloun i švestka. Celkový
                        počet sebraného ovoce se počítá napříč levely a slouží jako podmínka pro odemykání dalších levelů i
                        skinů.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_all_foods.png"
                            alt="Všechny druhy ovoce v levelu"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Přehled různých druhů ovoce rozmístěného v levelu - banány, třešně, hrozny, meloun i švestka.
                    </p>
                </section>

                {/* Moving platforms */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">6. Hra – pohyblivé platformy</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Od třetího levelu se na mapách začínají objevovat{" "}
                        <strong className="text-white">pohyblivé platformy</strong>. Hráč musí správně načasovat skok tak,
                        aby se na pohybující se platformu trefil - špatné načasování znamená pád a návrat na nejbližší
                        checkpoint. Ve spodní části záběru je vidět pohled z Unity editoru s přesným rozmístěním platforem v
                        levelu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_moving_platform.png"
                            alt="Pohyblivá platforma v jeskyňovém levelu"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Pohyblivá platforma v jeskyňovém levelu (Level 3) - ve spodní části Unity editor s přehledem mapy.
                    </p>
                </section>

                {/* Drone enemy */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">7. Hra – droni a zmrzlé platformy</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Od levelu 5 se v městském a zasněženém prostředí začínají objevovat{" "}
                        <strong className="text-white">dronoví nepřátelé</strong>. Dron nelze zabít - jeho jedinou hrozbou je{" "}
                        <strong className="text-white">laserový výstřel směrem nahoru</strong>, který okamžitě zabíjí. Hráč
                        musí počkat, až dron přejde do fáze nabíjení, a teprve pak bezpečně přeskočit. Špatné načasování
                        znamená okamžitou smrt a návrat na checkpoint.
                    </p>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        V levelech 7 a 8 přibývá další překážka -{" "}
                        <strong className="text-white">zmrzlé klouzavé platformy</strong>. Povrch ledu výrazně snižuje tření,
                        takže hráč po přistání nekontrolovaně klouže a může snadno sjet z okraje do propasti. Kombinace
                        kluzkých platforem s dronovými lasery tvoří nejobtížnější část hry.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_drone.png"
                            alt="Dron a zmrzlé platformy v zasněženém levelu"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Level 7 - dron s laserovým výstřelem nahoru a klouzavé ledové platformy. Hvězda sekretu vlevo (0/1).
                    </p>
                </section>

                {/* Secret */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">8. Hra – secret platformy</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        V levelu 3 a levelu 7 je ukryta <strong className="text-white">secret platforma</strong>. Na jedné z
                        platforem v levelu je nenápadně umístěn skrytý znak „secret", který je naznačen v levé části
                        obrazovky hvězdičkovým počítadlem (<strong className="text-white">0/1</strong>). Když hráč tuto
                        platformu najde a vstoupí na ni, hra ho dostane dolů do skryté oblasti, kde na něj čeká{" "}
                        <strong className="text-white">secret hvězda</strong> v podobě zásvitné ikony - a s ní i bednička se
                        speciálním secretním skinem jako odměna za objevení skrytého místa.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/secret_platform.png"
                                    alt="Secret platforma se skrytým znakem"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Secret platforma - hvězdičkový počítadlo vlevo (0/1) naznačuje skrytý obsah.
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/secret_ikon_box.png"
                                    alt="Secret hvězda a secret skin box"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Skrytá oblast pod mapou - secret hvězda a bednička se speciálním skinem.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Achievement system */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">9. Achievement systém</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Hra obsahuje propracovaný{" "}
                        <strong className="text-white">systém achievementů a odemykání obsahu</strong>. Při splnění podmínky
                        se v pravém dolním rohu (nebo vlevo) zobrazí notifikační banner, který hráče informuje o novém
                        úspěchu - odemčení nového skinu nebo zpřístupnění dalšího levelu. Achievementy jsou sledovány i v
                        průběhu hry: v pravém dolním rohu se zobrazuje časovač{" "}
                        <strong className="text-white">Achievement: čas</strong>, který monitoruje, jak rychle hráč
                        postupuje.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_achivement_done.png"
                            alt="Achievement unlocked - nový skin a level"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-8 text-center italic">
                        Simultánní zobrazení dvou notifikací - vlevo odemčení nového skinu Rookblack, vpravo zpřístupnění
                        levelu 2.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_achivement_text.png"
                            alt="Achievement timer v průběhu hry"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Sledování achievementu v reálném čase - časovač vpravo dole ukazuje čas od začátku levelu.
                    </p>
                </section>

                {/* Winning */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">10. Dokončení levelu</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Po dosažení vítězné platformy se zobrazí obrazovka <strong className="text-white">LEVEL DONE</strong>{" "}
                        se shrnutím výkonu hráče: počet sebraného ovoce, počet pokusů a čas průchodu. Z obrazovky lze level
                        zopakovat nebo se vrátit do menu. Postavička vesele poskakuje na zlatém sloupu v levé části
                        obrazovky.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/winning.png"
                            alt="Level Done obrazovka s výsledky"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Obrazovka dokončení levelu - Fruits 10/10, Attempts 1, Time 00:11.
                    </p>
                </section>

                {/* ── INFINITY LEVELS ── */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">11. Infinity levely</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Po odemčení prvního infinity levelu se v navigační liště zpřístupní pozice 9–12. Jde o čtyři
                        speciální <strong className="text-white">nekonečné levely</strong>, kde platformy pokračují
                        donekonečna - cílem není dosáhnout konkrétního cíle, ale přežít co nejdéle a dostat se co nejvýše.
                        Score je zobrazeno vlevo nahoře a roste s každou další platformou. Infinity levely sdílejí grafická
                        prostředí s normálními levely, ale jejich rozmístění platforem je vygenerováno dynamicky. Ve spodní
                        části záběru je vidět Unity editor s animačními klíčovými snímky, ukazující jak jsou pohyby platforem
                        nastaveny v timeline.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_9_infinity.png"
                                    alt="Menu - Infinity Level 1"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Infinity Level 1 v menu - les, odemčen.
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_12_closed.png"
                                    alt="Menu - Infinity Level 4 zamčen"
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Infinity Level 4 zamčen - vyžaduje odemčení levelů 7 a 8.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/infinity_level.png"
                            alt="Gameplay infinity levelu s editorem"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Průběh infinity levelu - Monster skin ve skalní jeskyni. Ve spodní části Unity editor s animačními
                        klíčovými snímky platforem.
                    </p>
                </section>

                {/* Bones & animation */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">12. Technické – kosti a animace postav</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        Na rozdíl od běžných sprite-sheet animací jsou postavy v Jumping Jello animovány pomocí{" "}
                        <strong className="text-white">kostního rigu</strong>. Každá postava je rozdělena na tělesné části
                        (hlava, trup, končetiny), které jsou propojeny hierarchií kostí přes Unity komponenty{" "}
                        <strong className="text-white">Sprite Skin</strong> a{" "}
                        <strong className="text-white">IK Manager 2D</strong>. Animace pak nevzniká přepínáním obrázků, ale
                        přímou manipulací s polohou a rotací kostí v čase - výsledkem je plynulý a přirozený pohyb. Přechody
                        mezi stavy (idle, skok, přistání) jsou řízeny přes Unity komponent{" "}
                        <strong className="text-white">Animator</strong> s parametrickými podmínkami.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/animator_character.png"
                            alt="Kostní rig a Animator postavy Snowman"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Unity editor - postava Snowman s viditelným kostním rigem (vlevo), Animator graf se stavy a přechody
                        (nahoře) a inspector s komponentami Sprite Skin (vpravo).
                    </p>
                </section>

                {/* Shaders */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">13. Technické – shadery</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        Hra obsahuje dva vlastní shadery vytvořené v Unity{" "}
                        <strong className="text-white">Shader Graph</strong>. Shadery jsou složeny z vizuálních uzlů (nodes)
                        bez psaní kódu - každý uzel představuje matematickou operaci nebo vzorkování textury. Výsledný shader
                        je zkompilován do HLSL a nasazen jako materiál na konkrétní objekt ve scéně.
                    </p>

                    {/* Laser drone shader */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Shader laserového drona (DronLaser)</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Shader pro laserový paprsek dronového nepřítele. Graf kombinuje{" "}
                            <strong className="text-white">časově animovanou noise texturu</strong> (pulsující vzor) s
                            gradientovou barvou (zelená → žlutá → červená) pro vizuální efekt energie. Exponovanými parametry
                            jsou <strong className="text-white">LaserEdgeSmoothness</strong>,{" "}
                            <strong className="text-white">LaserThickness</strong>,{" "}
                            <strong className="text-white">LaserSpeed</strong> a{" "}
                            <strong className="text-white">LaserScale</strong> - díky tomu lze laser snadno ladit přímo v
                            inspectoru bez úpravy grafu. Výsledkem je živý, pulsující laserový efekt.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/jumpingJello/laser_drone_shader.png"
                                alt="Shader Graph laserového drona"
                                className="w-full object-cover"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Shader Graph shaderu DronLaser - noise textura, časová animace, barevný gradient a exponované
                            parametry vlevo.
                        </p>
                    </div>

                    {/* Character burn shader */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">Shader efektu zásahu postavy</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Druhý shader vytváří <strong className="text-white">efekt burn/dissolve</strong> - vizuální
                            reakci na zásah nebo poškození postavy. Noise textura je kombinována s{" "}
                            <strong className="text-white">step/threshold</strong> operacemi tak, aby postupně „rozpouštěla"
                            sprite od okrajů dovnitř. Výrazná <strong className="text-white">růžová/magenta kontura</strong>{" "}
                            na okraji dissolve efektu zvýrazňuje okamžik zásahu a dává hráči jasnou vizuální zpětnou vazbu.
                            Výsledný efekt je vidět přímo v náhledu shaderu vpravo dole - postava se rozpadá s výrazným
                            barevným okrajem.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/jumpingJello/character_dron_shader.png"
                                alt="Shader efektu zásahu - burn dissolve"
                                className="w-full object-cover"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Shader Graph burn/dissolve efektu zásahu - noise textury, threshold operace a výsledný efekt s
                            růžovou konturou v náhledu vpravo dole.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UnityJumpingJello;

