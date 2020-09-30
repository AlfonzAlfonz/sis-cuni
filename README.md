# SIS CUNI

SIS CUNI je aplikace pro správu informačního systému Univerzity Karlovy. Nejedná se o oficiální aplikaci, ale aplikace nesbírá žádné data o uživateli. Aplikace zobrazuje pouze okno prohlížeče (Webview) do kterého vkládá styly a skript aplikace.

# Dev stack

Aplikace je postavená na [React Native](https://reactnative.dev/) s frameworkem [Expo](https://expo.io/), který zobrazuje Webview, do kterého se vkládá skript a styly. Jako CSS pre-procesor je použit [stylis](https://github.com/thysultan/stylis.js), ale kvůli širší podpoře v editorech, jsou soubory pojmenované .scss.

# Spuštění

Vyžaduje Node a Expo CLI (případně Yarn).

**Instalace projektu**
```bash
yarn # nebo npm install
expo install
```

**Spuštění projektu**
```bash
expo start
```

**Build projektu**
```bash
yarn build # nebo npm run build
```

# Přispívání

Každý příspěvek do projektu je velmi vítán, příspět můžete jakoukoliv funkcí nebo stylem. Pokud přidáváte nový styl, snažte se držet už existujícího vzhledu.

Nepřidávejte globální styly pokud si nejste jisti co děláte, místo toho definujte styly pro konkrétní stránky (viz Rozdělení stylů).

Pokud chcete přispět do projektu, vytvořte si fork repozitáře a pak otevřete pull request s vašima změnama.

# Rozdělení stylů

Aby nedocházelo ke konfliktům stylů, skript aplikace vkládá do `body` stránky atributy s infem o aktuální stránce, tyto atributy se odvozují z url stránky, podle kterých SIS poznává stránky. Tyto atributy jsou:

- `data-module` - Modul stránky, např. `predmety`, `rozvrhng`, `grupicek`.
- `data-page` - Aktuální stránka, např. `index`, `roz_muj_macro`.
- `data-do` - Aktuální podstránka (mění se většinou podle šedého menu, někdy se používá místo `data-page`) např. `email`, `publikace`, `profil`.
- `data-doe` - Používá se dalšímu rozlišení stránek s `data-do` atributem, např. `email_detail`.

Styly jednotlivých stránek se nachází ve složce `module` a každý modul by měl mít svůj soubor/složku. Všechny tyto styly musí obsahovat specifikaci pro každou stránku zvlášť:

```scss
body[data-module="rozvrhng"][data-page^="roz_muj_"],
body[data-module="rozvrhng"][data-page^="roz_ucitel_"] {
  ...
}

body[data-module="rozvrhng"][data-page="roz_predmet_gl"] {
  ...
}

```

Pokud přidáváte styl pro nový modul, musíte ho přidat v `useBrowser/index.ts`.