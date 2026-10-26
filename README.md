# kostky

Počítadlo skóre pro hru v kostky (2–8 hráčů), optimalizované pro mobil.

**Online:** https://okiudlla.github.io/kostky/

## Pravidla

- **2 až 8 hráčů**, hází se v pořadí podle seznamu v Nastavení.
- **Cílová hodnota** je nastavitelná, minimum je **350**.
- Lze zapsat libovolný počet bodů včetně **0**.
- Když hráč zapíše **tři nuly po sobě**, počítá se to jako **absolutní nula** – skóre hráče se vynuluje a začíná od nuly.
- **Dohrávání kola:** jakmile první hráč dosáhne cíle, hra nekončí hned. Ještě jednou hrají všichni hráči, kteří jsou v pořadí **za ním**, a mohou ho přehrát. Hráči před ním už nehrají. Po dohrání kola vyhrává nejvyšší skóre, při shodě je remíza.

## Bodování kostek

- Samy bodují jen **jednička = 100** a **pětka = 50**.
- **Trojice:** 1×3 = 1000, 2×3 = 200, 3×3 = 300, 4×3 = 400, 5×3 = 500, 6×3 = 600. Každá další stejná kostka hodnotu zdvojnásobí: 1×4 = 2000, 1×5 = 4000, 1×6 = 8000.
- Kombinace platí, jen když padne **v jednom hodu**.
- Hráč si z hodu sám vybere, které bodující kostky si vezme. Zbylé hází znovu. „Vybrat bodující“ označí všechny bodující kostky najednou.
- **Do 3. hodu** musí mít tah aspoň **350**, jinak se zapíše 0. Potom může zapsat, nebo riskovat další hody.
- **Každý hod musí něco bodovat.** Když nepadne nic, tah končí nulou.
- Když bodují **všechny kostky**, hází se znovu všemi šesti a body se sčítají.
- **Postupka 1–6** v jednom hodu = **2000**. Lze ji i dohodit: po 1. hodu klepni na „Jdu na postupku“ a chybějící čísla dohazuj do 3. hodu. Jedničky a pětky se při tom nepočítají. Když postupka nevyjde, je to 0.
- Body zadané ručně klávesnicí se nekontrolují.

## Vzhled

- Styl „Výrazný flat“: tučná úzká čísla, silné obrysy a plné stíny, hravé motivy kostek.
- Večer se appka sama přepne do tmavého režimu podle nastavení telefonu.
- Písmo [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) je přímo v repozitáři (`fonts/`, licence SIL Open Font License v `fonts/OFL.txt`), takže funguje i bez Google Fonts.

## Ovládání

- Body se zadávají vestavěnou klávesnicí a potvrzují tlačítkem **Přičíst ✓**. Prázdné zadání se zapíše jako 0.
- Hráč na tahu je výrazně podbarvený svou barvou. Tah se po zápisu sám předá dalšímu, klepnutím na kartu ho lze přepnout ručně.
- **Kostka vedle Přičíst** otevře virtuální kostky, které samy spočítají body (viz Bodování kostek). Tlačítko **Zapsat** připíše body z tahu hráči na tahu a kostky se vynulují pro dalšího hráče.
- **Stupně vítězů** v záhlaví ukazují celkové pořadí podle skóre. Karty mají medaile 🥇🥈🥉 a konec hry ukáže konečné výsledky.
- **Zpět** vrátí poslední krok (zápis, změnu nastavení nebo novou hru).
- **Posuvníky s cílem** otevřou nastavení hráčů a cíle (350 až 99 999). Během dohrávání kola lze měnit jen jména.
