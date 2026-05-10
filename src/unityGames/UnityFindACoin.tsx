const UnityFindACoin = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Find a Coin - 2D Platformer</h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Má první hra vyvíjená v enginu <strong className="text-white">Unity</strong>. Jde o 2D platformer, kde
                    hráč prochází třemi levely a v každém sbírá pět mincí. Celou hru jsem vytvořil sám - od programování
                    v&nbsp;<strong className="text-white">C#</strong> přes grafiku až po vlastní hudbu. Tato hra pro mě
                    znamenala první setkání s Unity i s programováním jako takovým, takže jsem se učil obojí zároveň přímo za
                    pochodu.
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
                        Z hlavního menu lze spustit hru, zobrazit ovládání nebo hru ukončit. Celá grafika menu včetně pozadí
                        a tlačítek je ručně kreslená v programu <strong className="text-white">Aseprite</strong> ve stylu
                        pixel art.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/menu.webp"
                            alt="Hlavní menu Find a Coin"
                            className="w-full object-cover" loading="lazy"
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
                        Po spuštění hry se hráč dostane na obrazovku výběru levelu. K dispozici jsou tři mise, každá s
                        odlišnou obtížností a mechanikami. Splnění každého levelu spočívá ve sběru{" "}
                        <strong className="text-white">5 mincí</strong> rozmístěných po mapě.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/levels.webp"
                            alt="Výběr levelu"
                            className="w-full object-cover" loading="lazy"
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
                        První level je úvod do hry. Hráč se pohybuje 2D bludištěm, skáče po plošinách a hledá pět mincí.
                        Žádné speciální mechaniky ani překážky zde nejsou - jde čistě o pochopení ovládání a struktury mapy.
                        Cíl je nasbírat všechny mince a tím level dokončit.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/level_1_game.webp"
                            alt="Gameplay Level 1"
                            className="w-full object-cover" loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        Pohled na gameplay prvního levelu - hráč skáče po plošinách a sbírá mince.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_1.webp"
                            alt="Mapa levelu 1 v Unity"
                            className="w-full object-cover" loading="lazy"
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
                        Druhý level přidává novou mechaniku - <strong className="text-white">double jump</strong>. Na mapě je
                        schovaná <strong className="text-white">Double jump bedna</strong>, po jejímž sebrání hráč získá
                        právě jeden double jump. Počet zbývajících skoků je zobrazený{" "}
                        <strong className="text-white">vlevo nahoře</strong> vedle počítadla mincí. Protože jde o jediný
                        pokus, je potřeba ho použít na správném místě. Cíl zůstává stejný: nasbírat 5 mincí.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/double_jump_box.webp"
                            alt="Double Jump Box - sprite animace"
                            className="w-full object-cover" loading="lazy"
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
                            className="w-full object-cover" loading="lazy"
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
                        Třetí a nejtěžší level přidává k předchozím mechanikám <strong className="text-white">lávu</strong>.
                        Část platformy tvoří lávová plocha - pokud na ni hráč vstoupí, dojde ke kolizi a hráč zemře. Na mapě
                        je opět <strong className="text-white">Double jump bedna</strong> s jedním double jumpem viditelným
                        vlevo nahoře. Level tak kombinuje přesné skákání, jeden double jump i vyhýbání se lávě, čímž vytváří
                        největší výzvu celé hry.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/lava_ground.webp"
                            alt="Lávová podlaha - sprite tile"
                            className="w-full object-cover" loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        Sprite tile lávové podlahy - textura smrtícího terénu v třetím levelu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_3.webp"
                            alt="Mapa levelu 3 v Unity"
                            className="w-full object-cover" loading="lazy"
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
                        Přímo ve hře lze otevřít herní menu, které umožňuje pauzovat hru, vrátit se do výběru levelů nebo hru
                        restartovat. Jednoduché a přehledné rozhraní odpovídá celkovému pixel art stylu hry.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/game_menu.webp"
                            alt="Herní menu ve Find a Coin"
                            className="w-full object-cover" loading="lazy"
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
                        Všechny animace ve hře jsou implementovány jako sekvence sprite obrázků přepínaných přes Unity
                        komponent <strong className="text-white">Animator</strong>. Přechody mezi stavy (pohyb, skok, idle)
                        jsou řízeny herními parametry. Veškeré sprity jsem kreslil ručně v programu{" "}
                        <strong className="text-white">Aseprite</strong> ve stylu pixel art.
                    </p>

                    {/* Animator overview */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">Animator - přehled stavů postavy</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            Snímek z Unity <strong className="text-white">Animator</strong> okna ukazuje kompletní animační
                            graf hlavní postavy - kolik má akcí, stavů a jak jsou mezi sebou propojeny přes podmíněné
                            přechody. Každý přechod je řízen parametrem (např. rychlost pohybu, zda je hráč ve vzduchu).
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/findACoin/animace_editor.webp"
                                alt="Unity Animator - přehled animací postavy"
                                className="w-full object-cover" loading="lazy"
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
                            Animace pohybu hráče se skládá z několika sprite snímků, které na sebe plynule navazují a
                            vytvářejí iluzi chůze. Animator automaticky přepíná mezi idle a pohybovým stavem podle aktuální
                            rychlosti postavy.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/player_move.webp"
                                alt="Hráč - sprite animace pohybu"
                                className="max-h-72 object-contain" loading="lazy"
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
                            Jump Box je interaktivní předmět na mapě. Animace zobrazuje aktivní stav bedny - po sebrání
                            hráčem se použije a zmizí z mapy.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/jump_box.webp"
                                alt="Jump Box - sprite animace"
                                className="max-h-72 object-contain" loading="lazy"
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
                            Láva má vlastní smyčkovanou idle animaci, která ji vizuálně oživuje. Při kolizi hráče s lávou
                            dojde k okamžité smrti. Animace je implementována přes Animator stejně jako ostatní objekty ve
                            hře.
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/lava_idle.webp"
                                alt="Láva - idle sprite animace"
                                className="max-h-72 object-contain" loading="lazy"
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
                        Hra obsahuje dvě vlastní hudební skladby, které jsem složil a nahrál sám. Odlišná melodie hraje v{" "}
                        <strong className="text-white">hlavním menu</strong> a jiná doprovází{" "}
                        <strong className="text-white">průběh levelů</strong>. Ve hře nejsou žádné zvukové efekty ani
                        particle systémy - hudba je jediným zvukovým prvkem a přispívá k atmosféře pixelového světa.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default UnityFindACoin;

