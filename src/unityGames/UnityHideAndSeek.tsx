const UnityHideAndSeek = () => {
    return (
        <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
                    Hide and Seek - Hra na schovávanou
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Má třetí hra v Unity - rychlý učební projekt zaměřený na ovládání pomocí gamepadu přes{" "}
                    <strong className="text-white">Nový Unity Input System</strong>. Hra je pro PC a podporuje jak
                    klávesnici, tak gamepad/controller. Tma a zorné pole jsou implementovány přes{" "}
                    <strong className="text-white">Standard Surface Shader</strong> s raycastingem v{" "}
                    <strong className="text-white">LateUpdate</strong>. Veškeré programování včetně AI jsem tvořil sám.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {[
                        "Unity",
                        "C#",
                        "Nový Unity Input System",
                        "Standard Surface Shader",
                        "LateUpdate Raycasting",
                        "Gamepad",
                        "AI",
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
                {/* Menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">1. Hlavní menu</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Menu umožňuje spustit novou hru nebo navázat na uloženou partii. Před startem si každý hráč zvolí
                        svou roli - <strong className="text-white">Lovec</strong> nebo{" "}
                        <strong className="text-white">Zloděj</strong> a preferovaný způsob ovládání -{" "}
                        <strong className="text-white">Klávesnice</strong> nebo{" "}
                        <strong className="text-white">Ovladač</strong>. Pomocí šipek lze nastavit přesný počet hráčů v
                        každém týmu zvlášť.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/hideAndSeek/menu.png"
                            alt="Hlavní menu Hide and Seek"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Menu s výběrem role, ovládání a počtu hráčů v každém týmu.
                    </p>
                </section>

                {/* Ovládání */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">2. Ovládání</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Hra podporuje klávesnici s myší i gamepad. Pohyb a otáčení jsou na oddělených vstupech - lovec se
                        pohybuje a míří nezávisle. Střelba lovce a schopnosti jsou mapovány na různá tlačítka podle zvoleného
                        ovládání.
                    </p>

                    <div className="overflow-hidden rounded-2xl border border-slate-700/50">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 text-left">
                                    <th className="px-4 py-3 text-slate-300 font-semibold">Akce</th>

                                    <th className="px-4 py-3 text-slate-300 font-semibold">Klávesnice & Myš</th>

                                    <th className="px-4 py-3 text-slate-300 font-semibold">Gamepad</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-700/40">
                                {[
                                    ["Pohyb", "WASD", "Levá páčka"],
                                    ["Otáčení / Míření", "Pohyb myši", "Pravá páčka"],
                                    ["Střelba (Lovec)", "Levé tlačítko myši", "R1 (Right Shoulder)"],
                                    ["Schopnost 1", "Pravé tlačítko myši", "Pravé akční tlačítko"],
                                    ["Schopnost 2", "Levé akční tlačítko", "Levé akční tlačítko"],
                                    ["Pauza / ESC", "ESC", "Start"],
                                ].map(([action, kb, gp]) => (
                                    <tr
                                        key={action}
                                        className="bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-white font-medium">{action}</td>

                                        <td className="px-4 py-3 text-slate-300">{kb}</td>

                                        <td className="px-4 py-3 text-slate-300">{gp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Vision + střelba */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">3. Vision a zorné pole</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Obě role mají schopnost <strong className="text-white">Vision</strong> - rozsvítí zorné pole na 8
                        sekund a sdílí ho v rámci týmu. Lovec má navíc <strong className="text-white">FireRate</strong>{" "}
                        (střelba, cooldown 1 s), zloděj <strong className="text-white">Sprint</strong> (zrychlení na 1 s,
                        cooldown 10 s). Zorné pole se počítá každý snímek v{" "}
                        <strong className="text-white">LateUpdate</strong> raycastingem - výsledek jde do shaderu, který
                        oblasti za překážkami ztmaví. Tma reaguje na pohyb okamžitě.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/hideAndSeek/vision_firing.png"
                            alt="Vision schopnost a střelba lovce"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Aktivní Vision - zorné pole lovce a viditelné střely.
                    </p>
                </section>

                {/* Hiding */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">4. Pohled zloděje</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Hráč ovládá zloděje. V záběru jsou dva <strong className="text-white">AI lovci</strong> - jeden
                        střílí na spoluhráče. Protože Vision je týmová, zloděj vidí i zorná pole svých spoluhráčů-zlodějů,
                        nejen vlastní.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/hideAndSeek/hiding.png"
                            alt="Pohled zloděje - AI lovci útočí na spoluhráče"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Pohled zloděje: sdílená zorná pole spoluhráčů a útočící AI lovci.
                    </p>
                </section>

                {/* Hunting friend */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">5. Spolupráce lovců</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Hráč hraje za lovce a vidí aktivní <strong className="text-white">Vision spoluhráče-lovce</strong>,
                        který detekoval zloděje. Sdílená viditelnost funguje v reálném čase - lovec ví o pozicích zlodějů i
                        bez přímého kontaktu.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/hideAndSeek/hunting_friend.png"
                            alt="Lovec vidí Vision spoluhráče"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Zorné pole spoluhráče (Vision) odhalilo pozice zlodějů.
                    </p>
                </section>

                {/* Scene editor */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">6. Mapa a Scene editor</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        Snímek kombinuje herní pohled lovce a{" "}
                        <strong className="text-white">Scene okno Unity editoru</strong>. Scene view ukazuje celou mapu bez
                        omezení - žluté obdélníky jsou překážky, barevné koule hráči a AI.
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/hideAndSeek/hunting_with_editor.png"
                            alt="Game view lovce a Unity Scene editor"
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        Herní pohled lovce (vlevo) a Scene editor (vpravo) s přehledem celé mapy.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default UnityHideAndSeek;

