# Instrukcja — dodawanie komentarza do LTOA-9825 przez REST API JIRA
Poniższe instrukcje używają endpointu REST JIRA: `/rest/api/2/issue/{issueKey}/comment`.
Wymagania
- zalogowana sesja w kontrolowanej przeglądarce MCP (dla `fetch` z `credentials: 'same-origin'`) LUB
- konto z tokenem / Basic Auth (użyć `curl` z nazwą użytkownika i hasłem / tokenem).
Przykład — `fetch` w kontekście strony (np. w Playwright/skripcie MCP, używa zalogowanej sesji):
```js
await page.evaluate(async () => {
  const issue = 'LTOA-9825';
  const text = 'jednak się pomyliłem';
  const res = await fetch(`/rest/api/2/issue/${issue}/comment`, {
  method: 'POST',
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ body: text })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
});
```

Przykład — `curl` (Basic Auth):
```bash
curl -u "USERNAME:PASSWORD" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"body":"jednak się pomyliłem"}' \
  "https://jira.lppsa.com/rest/api/2/issue/LTOA-9825/comment"
```

Co zwrócić uwagę
- Odpowiedź przy sukcesie: HTTP 201 i JSON z polem `id` (id komentarza) oraz `created`.
- Jeśli używasz `fetch` w kontekście strony, pamiętaj o `credentials: 'same-origin'` żeby wysłać ciasteczka sesji.
- W starszych wersjach JIRA Server (np. 7.13.0) endpointy wyglądają tak samo; niektóre instalacje mogą blokować API dla anonimowych żądań.

Zastosowanie w MCP / automatyzacji
- W skrypcie MCP użyj powyższego `page.evaluate(...)` z `issue` i `text` ustawionymi dynamicznie.
- Zapisz snapshot strony po wykonaniu POST (opcjonalne), aby mieć dowód dodania komentarza.

Przykład szybkiego kroku w Playwright/MCP (kompaktowo):
```js
const resp = await page.evaluate(async ({issue, text}) => {
  const r = await fetch(`/rest/api/2/issue/${issue}/comment`, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({ body: text })
  });
  return { status: r.status, body: await r.json() };
}, { issue: 'LTOA-9825', text: 'jednak się pomyliłem' });
console.log(resp);
```

To wszystko — przy pytaniach dostosuję instrukcję do twojego skryptu MCP lub dodam przykład z auth tokenem.
# Instrukcja: Dodawanie komentarzy do zgłoszenia JIRA (LTOA-9825)

Cel
- Szybkie przypomnienie jak dodać komentarz do otwartego zgłoszenia w JIRA korzystając z tej automatyzacji (Playwright MCP) lub ręcznie.

Plik:
- `.playwright-mcp/mcp/LTOA-9825-comment-instructions.md` — ten plik.

Kiedy używać tej instrukcji
- Jesteś zalogowany w JIRA i masz w przeglądarce otwarte konkretne issue (np. https://jira.lppsa.com/browse/LTOA-9825).
- Chcesz, żeby asystent dodał komentarz do tego zgłoszenia (tak jak wcześniej).

Sposób 1 — Poprosić asystenta (automatycznie)
1. Przejdź w przeglądarce do issue (np. LTOA-9825).
2. Wróć do czatu z asystentem i napisz jedną z komend:
   - `jestem` — informuje asystenta, że jesteś na stronie i on może wykonać operacje (odczyt, dodanie komentarza itp.).
   - `dodaj komentarz: <treść komentarza>` — asystent doda komentarz o podanej treści do aktualnie otwartego issue.
   - `odczytaj` — asystent pobierze szczegóły zgłoszenia i zapisze je do pliku MD.
3. Przykład: `dodaj komentarz: Mateusz Littwin proszę wykonać to zadanie w 2 dni.`

Uwaga:
- Asystent działa na aktualnie aktywnej karcie JIRA w kontrolowanej przeglądarce MCP. Upewnij się, że issue jest otwarte i zalogowany/a jesteś.

Sposób 2 — Ręcznie w JIRA (krok po kroku)
1. Otwórz issue (np. LTOA-9825).
2. Kliknij przycisk `Komentarz` (sekcja "Aktywność" → "Komentarze").
3. Wpisz treść komentarza w edytorze.
4. Kliknij `Dodaj`.

Format komentarzy (propozycja)
- Krótkie polecenie + termin:
  - `@Mateusz Littwin — proszę zrobić to zadanie w 2 dni.`
- Jeśli dodajesz szczegóły lub kroki: używaj list numerowanych lub punktowanych.

Co zrobić, gdy asystent nie może wkleić komentarza
- Sprawdź, czy jesteś zalogowany w JIRA w tej samej sesji przeglądarki kontrolowanej przez MCP.
- Jeśli edytor komentarza jest w iframe i asystent nie wstawił treści, otwórz edytor ręcznie, wklej tekst i kliknij `Dodaj`.

Dodatki
- Można prosić asystenta o zapisanie snapshotu strony lub pobranie treści (zapis MD) przed/po dodaniu komentarza.
- Plik z historią issue i komentarzami jest zapisywany w: `.playwright-mcp/mcp/LTOA-9825.md` (jeśli użyjesz komendy `odczytaj`).

---
Jeśli chcesz, mogę teraz:
- zaktualizować instrukcję (dodać szablony komentarzy),
- lub zautomatyzować cykliczne przypomnienia (przypomnienie za 2 dni) — napisz, którą opcję wybierasz.

Aktualizacja przykładu
 
- **Przykład wykonany:** dodałem komentarz do zgłoszenia `LTOA-9823` z treścią `54321` (HTTP 201).
- **ID komentarza:** `7740773`
- **Utworzono:** 2026-01-14T13:38:23.681+0100

Przykład `fetch` dla `LTOA-9823` (użyj w kontrolowanej przeglądarce MCP):
```js
await page.evaluate(async () => {
  const issue = 'LTOA-9823';
  const text = '54321';
  const res = await fetch(`/rest/api/2/issue/${issue}/comment`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: text })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
});
```