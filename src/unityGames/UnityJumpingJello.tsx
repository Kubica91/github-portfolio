const UnityJumpingJello = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Jumping Jello</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-blue-400 mb-4">2D Platformer</p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Mobilní 2D platformer v <strong className="text-white">Unity</strong>. Hráč skáče po plošinách, sbírá
                    ovoce a odemyká skiny. Programování v <strong className="text-white">C#</strong>, návrh levelů,
                    achievement systém, procedurální infinity levely, shadery a animace kostí - to vše jsem měl na starost
                    já. Grafiku a ilustrace navrhl a nakreslil můj bratranec.
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
                    <h2 className="text-2xl font-bold text-white mb-1">1. Menu - výběr skinů</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Obrazovka výběru skinů v <strong className="text-white">retro rámu televizoru</strong>. Šest postav:{" "}
                        <strong className="text-white">Jello</strong> (odemčen od začátku),{" "}
                        <strong className="text-white">Blackrook</strong>, <strong className="text-white">Whiterook</strong>,{" "}
                        <strong className="text-white">Pencil</strong>, <strong className="text-white">Monster</strong> a{" "}
                        <strong className="text-white">Snowman</strong>. Klik na zamčený skin otočí panel a ukáže podmínku
                        odemčení: Blackrook - 10 ovoce v levelu 1, Pencil - level 2 do 3 minut, Whiterook - 50 ovoce celkem,
                        Monster - secret v levelu 3, Snowman - secret v levelu 7.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/jumpingJello/skins.webp"
                            alt="Výběr skinů - všechny postavy"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-8 text-center italic">
                        Obrazovka výběru skinů s šesti postavami - vpravo přepínače SFX a hudby, dole lišta výběru levelu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/skins_task.webp"
                            alt="Úkol pro odemčení skinu Rookblack"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Po kliknutí na zamčený skin se zobrazí jeho úkol - zde „Collect 10 fruit in Level 1" pro odemčení
                        Rookblacka.
                    </p>
                </section>

                {/* Level select - open levels */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">2. Menu - výběr levelů</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Lišta <strong className="text-white">S, 1-12</strong> naviguje mezi obrazovkami: S = skiny, 1-8
                        normální levely, 9-12 infinity. Televizor zobrazuje náhled levelu s odpovídajícím prostředím (les,
                        jeskyně, město, sníh) a aktuální statistiky.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_1.webp"
                                    alt="Menu - Level 1 les"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">Level 1 - les, 10/10 ovoce.</p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_3.webp"
                                    alt="Menu - Level 3 jeskyně"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Level 3 - jeskyně, hvězda sekretu 1/1.
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_5.webp"
                                    alt="Menu - Level 5 město"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">Level 5 - město, 7/10 ovoce.</p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_7.webp"
                                    alt="Menu - Level 7 sníh"
                                    className="w-full object-cover"
                                    loading="lazy"
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
                    <h2 className="text-2xl font-bold text-white mb-1">3. Menu - zamčené levely</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Nesplněné podmínky zobrazí šedé pozadí a <strong className="text-white">LEVEL IS LOCKED</strong>. U
                        normálních levelů je vidět počet dokončených levelů a sebraného ovoce. Infinity levely mají vlastní
                        podmínky - např. dokončit level 7 a 8.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_8_closed.webp"
                                    alt="Menu - Level 8 zamčen"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Level 8 zamčen - zobrazuje dokončené levely (6/7) a sesbírané ovoce (55/70).
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_12_closed.webp"
                                    alt="Menu - Infinity Level 4 zamčen"
                                    className="w-full object-cover"
                                    loading="lazy"
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
                    <h2 className="text-2xl font-bold text-white mb-1">4. Hra - Jump Meter</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Přidržení prstu nabíjí skok - maximum po cca jedné sekundě. Síla je vizualizována přes{" "}
                        <strong className="text-white">Jump Meter</strong>: kruhový ukazatel, kde se tečky rozsvěcejí po
                        360°. Horní lišta ukazuje postup mapou, vlevo nahoře počet ovoce.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/jump_meter.webp"
                            alt="Jump Meter - ukazatel síly skoku"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Jump Meter uprostřed obrazovky - tečky se plní dokola a ukazují nabíjející se sílu skoku.
                    </p>
                </section>

                {/* Fruits */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">5. Hra - ovoce a sbírání</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <strong className="text-white">10 kusů ovoce</strong> v každém levelu - banány, třešně, hrozny,
                        meloun, švestka. Celkový počet se počítá napříč levely a slouží jako podmínka pro odemykání levelů i
                        skinů.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_all_foods.webp"
                            alt="Všechny druhy ovoce v levelu"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Přehled různých druhů ovoce rozmístěného v levelu - banány, třešně, hrozny, meloun i švestka.
                    </p>
                </section>

                {/* Moving platforms */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">6. Hra - pohyblivé platformy</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Od třetího levelu se na mapách objevují <strong className="text-white">pohyblivé platformy</strong>.
                        Hráč musí načasovat skok - špatné načasování znamená pád a návrat na checkpoint.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_moving_platform.webp"
                            alt="Pohyblivá platforma v jeskyňovém levelu"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Pohyblivá platforma v jeskyňovém levelu (Level 3) - ve spodní části Unity editor s přehledem mapy.
                    </p>
                </section>

                {/* Drone enemy */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">7. Hra - droni a zmrzlé platformy</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Od levelu 5 se objevují <strong className="text-white">dronoví nepřátelé</strong>. Dron nelze zabít -
                        hrozí <strong className="text-white">laserovým výstřelem nahoru</strong>, který okamžitě zabíjí. Hráč
                        musí počkat na fázi nabíjení a pak přeskočit.
                    </p>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Levely 7 a 8 přidávají <strong className="text-white">zmrzlé klouzavé platformy</strong>. Led snižuje
                        tření, hráč po přistání klouže a může sjet do propasti. Kombinace s lasery drona tvoří nejobtížnější
                        pasáže.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_drone.webp"
                            alt="Dron a zmrzlé platformy v zasněženém levelu"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Level 7 - dron s laserovým výstřelem nahoru a klouzavé ledové platformy. Hvězda sekretu vlevo (0/1).
                    </p>
                </section>

                {/* Secret */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">8. Hra - secret platformy</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Levely 3 a 7 obsahují <strong className="text-white">secret platformu</strong>. Nenápadný skrytý znak
                        na jedné z platforem - hvězdičkové počítadlo vlevo (<strong className="text-white">0/1</strong>)
                        naznačuje existenci sekretu. Vstup teleportuje hráče do skryté oblasti s{" "}
                        <strong className="text-white">secret hvězdou</strong> a bedničkou se speciálním skinem.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/secret_platform.webp"
                                    alt="Secret platforma se skrytým znakem"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Secret platforma - hvězdičkový počítadlo vlevo (0/1) naznačuje skrytý obsah.
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/secret_ikon_box.webp"
                                    alt="Secret hvězda a secret skin box"
                                    className="w-full object-cover"
                                    loading="lazy"
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
                        Při splnění podmínky se v rohu obrazovky zobrazí notifikační banner - odemčení skinu nebo
                        zpřístupnění levelu. Časovač <strong className="text-white">Achievement: čas</strong> v pravém dolním
                        rohu měří rychlost postupu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_achivement_done.webp"
                            alt="Achievement unlocked - nový skin a level"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-8 text-center italic">
                        Simultánní zobrazení dvou notifikací - vlevo odemčení nového skinu Rookblack, vpravo zpřístupnění
                        levelu 2.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/level_achivement_text.webp"
                            alt="Achievement timer v průběhu hry"
                            className="w-full object-cover"
                            loading="lazy"
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
                        Obrazovka <strong className="text-white">LEVEL DONE</strong> shrnuje výkon: počet ovoce, pokusy a čas
                        průchodu. Lze zopakovat level nebo se vrátit do menu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/winning.webp"
                            alt="Level Done obrazovka s výsledky"
                            className="w-full object-cover"
                            loading="lazy"
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
                        Pozice 9-12 v liště. Čtyři <strong className="text-white">nekonečné levely</strong> s dynamicky
                        generovanými platformami. Cílem je přežít co nejdéle a dosáhnout nejvyššího skóre. Grafická prostředí
                        sdílejí s normálními levely.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_9_infinity.webp"
                                    alt="Menu - Infinity Level 1"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Infinity Level 1 v menu - les, odemčen.
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <img
                                    src="/github-portfolio/images/jumpingJello/menu_level_12_closed.webp"
                                    alt="Menu - Infinity Level 4 zamčen"
                                    className="w-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                Infinity Level 4 zamčen - vyžaduje odemčení levelů 7 a 8.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/infinity_level.webp"
                            alt="Gameplay infinity levelu s editorem"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Průběh infinity levelu - Monster skin ve skalní jeskyni. Ve spodní části Unity editor s animačními
                        klíčovými snímky platforem.
                    </p>
                </section>

                {/* Bones & animation */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">12. Technické - kosti a animace postav</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        Postavy jsou animovány <strong className="text-white">kostním rigem</strong>, ne sprite sheety. Tělo
                        rozdělené na části (hlava, trup, končetiny) propojené přes{" "}
                        <strong className="text-white">Sprite Skin</strong> a{" "}
                        <strong className="text-white">IK Manager 2D</strong>. Pohyb vzniká manipulací s polohou a rotací
                        kostí. Přechody (idle, skok, přistání) řídí <strong className="text-white">Animator</strong>.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/jumpingJello/animator_character.webp"
                            alt="Kostní rig a Animator postavy Snowman"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Unity editor - postava Snowman s viditelným kostním rigem (vlevo), Animator graf se stavy a přechody
                        (nahoře) a inspector s komponentami Sprite Skin (vpravo).
                    </p>
                </section>

                {/* Shaders */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">13. Technické - shadery</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        Dva vlastní shadery v Unity <strong className="text-white">Shader Graph</strong>. Vizuální uzly
                        (nodes) bez psaní kódu - každý uzel je matematická operace nebo vzorkování textury. Výsledek se
                        kompiluje do HLSL a nasadí jako materiál.
                    </p>

                    {/* Laser drone shader */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Shader laserového drona (DronLaser)</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Laserový paprsek dronového nepřítele. Časově animovaná noise textura s barevným gradientem
                            (zelená → žlutá → červená). Parametry <strong className="text-white">LaserEdgeSmoothness</strong>
                            , <strong className="text-white">Thickness</strong>,{" "}
                            <strong className="text-white">Speed</strong> a <strong className="text-white">Scale</strong> lze
                            ladit přímo v inspectoru.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/jumpingJello/laser_drone_shader.webp"
                                alt="Shader Graph laserového drona"
                                className="w-full object-cover"
                                loading="lazy"
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
                            <strong className="text-white">Burn/dissolve efekt</strong> při zásahu postavy. Noise textura s{" "}
                            <strong className="text-white">step/threshold</strong> operacemi postupně rozpouští sprite od
                            okrajů. <strong className="text-white">Růžová kontura</strong> na okraji dissolve efektu dává
                            vizuální zpětnou vazbu.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/jumpingJello/character_dron_shader.webp"
                                alt="Shader efektu zásahu - burn dissolve"
                                className="w-full object-cover"
                                loading="lazy"
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

