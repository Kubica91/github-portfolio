const UnityFindACoin = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Find a Coin</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-purple-400 mb-4">2D Platformer</p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    2D platformer ve třech levelech. Hráč skáče po plošinách a v každém levelu sbírá pět mincí. Celou hru
                    jsem postavil sám v <strong className="text-white">Unity</strong> a{" "}
                    <strong className="text-white">C#</strong>
                    &nbsp;- grafiku v pixel artu, hudbu i programování. Byl to zároveň můj první projekt v Unity.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {["Unity 2D", "C#", "2D Platformer", "Pixel Art", "Aseprite", "Vlastní hudba"].map((tag) => (
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
                        Menu nabízí start hry, zobrazení ovládání a ukončení. Grafika včetně pozadí a tlačítek je ručně
                        kreslená v <strong className="text-white">Aseprite</strong> ve stylu pixel art.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/menu.webp"
                            alt="Hlavní menu Find a Coin"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Hlavní menu s přístupem ke hře a ovládání.
                    </p>
                </section>

                {/* Level select */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">2. Výběr levelu</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Tři mise s rostoucí obtížností. Každý level vyžaduje sběr{" "}
                        <strong className="text-white">5 mincí</strong> rozmístěných po mapě.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/levels.webp"
                            alt="Výběr levelu"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Obrazovka výběru levelu se třemi dostupnými misemi.
                    </p>
                </section>

                {/* Level 1 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">3. Level 1 - Základní platforma</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Úvodní level bez speciálních mechanik. Hráč se pohybuje 2D bludištěm, skáče po plošinách a hledá pět
                        mincí. Seznamuje se s ovládáním a strukturou mapy.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/level_1_game.webp"
                            alt="Gameplay Level 1"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        Pohled na gameplay prvního levelu - hráč skáče po plošinách a sbírá mince.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_1.webp"
                            alt="Mapa levelu 1 v Unity"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Celkový pohled na mapu prvního levelu z Unity Scene View.
                    </p>
                </section>

                {/* Level 2 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">4. Level 2 - Double Jump</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Přidává mechaniku <strong className="text-white">double jump</strong>. Na mapě je schovaná{" "}
                        <strong className="text-white">Double jump bedna</strong>, po sebrání hráč získá jeden double jump.
                        Počet zbývajících skoků je zobrazený <strong className="text-white">vlevo nahoře</strong> vedle
                        počítadla mincí. Použít ho jde jen jednou, takže záleží na správném místě.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/double_jump_box.webp"
                            alt="Double Jump Box - sprite animace"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        Sprite Double jump bedny - sebrání udělí jeden double jump zobrazený vlevo nahoře vedle počítadla
                        mincí.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_2.webp"
                            alt="Mapa levelu 2 v Unity"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Mapa druhého levelu z Unity Scene View s platformami vyžadujícími double jump.
                    </p>
                </section>

                {/* Level 3 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">5. Level 3 - Láva</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Nejtěžší level kombinuje předchozí mechaniky s <strong className="text-white">lávou</strong>. Lávová
                        plocha zabíjí hráče při kontaktu. Na mapě je opět{" "}
                        <strong className="text-white">Double jump bedna</strong> s jedním skokem. Přesné skákání, double
                        jump a vyhýbání se lávě dohromady tvoří finální výzvu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/lava_ground.webp"
                            alt="Lávová podlaha - sprite tile"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        Sprite tile lávové podlahy - textura smrtícího terénu v třetím levelu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_3.webp"
                            alt="Mapa levelu 3 v Unity"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Mapa třetího levelu z Unity Scene View - červená láva tvoří smrtící překážku.
                    </p>
                </section>

                {/* In-game menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">6. Herní menu</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Herní menu pauzuje hru, umožňuje restart nebo návrat do výběru levelů.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/game_menu.webp"
                            alt="Herní menu ve Find a Coin"
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Herní menu s možností pauzy, restartu nebo návratu do výběru levelů.
                    </p>
                </section>

                {/* Animations */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">7. Technické zpracování animací</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        Sekvence sprite obrázků přepínaných přes Unity <strong className="text-white">Animator</strong>.
                        Přechody mezi stavy (pohyb, skok, idle) řídí herní parametry. Sprity jsem kreslil ručně v{" "}
                        <strong className="text-white">Aseprite</strong>.
                    </p>

                    {/* Animator overview */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Animator - přehled stavů postavy</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Unity <strong className="text-white">Animator</strong> ukazuje kompletní animační graf hlavní
                            postavy. Každý přechod mezi stavy je řízen parametrem (rychlost pohybu, pozice ve vzduchu).
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/findACoin/animace_editor.webp"
                                alt="Unity Animator - přehled animací postavy"
                                className="w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Animator okno s animačním grafem postavy - všechny stavy a přechody mezi nimi.
                        </p>
                    </div>

                    {/* Player move */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Hráč - pohyb</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Několik sprite snímků plynule navazujících do iluze chůze. Animator přepíná mezi idle a pohybem
                            podle aktuální rychlosti postavy.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/player_move.webp"
                                alt="Hráč - sprite animace pohybu"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Sprite sekvence pohybu hlavní postavy.
                        </p>
                    </div>

                    {/* Jump box */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Jump Box</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Interaktivní předmět na mapě. Po sebrání hráčem se použije a zmizí.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/jump_box.webp"
                                alt="Jump Box - sprite animace"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Sprite animace Jump Boxu v idle stavu.
                        </p>
                    </div>

                    {/* Lava idle */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Láva - idle animace</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Smyčkovaná idle animace oživující lávový povrch. Kolize s lávou zabíjí okamžitě. Implementováno
                            přes Animator stejně jako ostatní objekty.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/lava_idle.webp"
                                alt="Láva - idle sprite animace"
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            Sprite sekvence lávy v idle stavu - smyčka vytváří efekt bublající magmy.
                        </p>
                    </div>
                </section>

                {/* Audio */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">8. Hudba</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        Dvě vlastní hudební skladby, které jsem složil a nahrál. Odlišná melodie hraje v{" "}
                        <strong className="text-white">hlavním menu</strong> a jiná doprovází{" "}
                        <strong className="text-white">průběh levelů</strong>. Hudba je jediným zvukovým prvkem hry.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default UnityFindACoin;

