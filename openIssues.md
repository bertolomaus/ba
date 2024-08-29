# Open Issues Report

## profil
- name
- avatar
- skills
  - mit angabe, wie gut
- interessen
- kurz-bio input
- credentials ändern
- profil löschen
- userData als useState machen

## frage stellen
- tags
- hilfestellung, was gute fragen ausmacht
- vorschläge, wer helfen könnte

## projekte
- titel
- beschreibung
- zielkarte
- req skills
- ressourcen
  - mitglieder
  - miro, discord, cloud etc
- mitglieder suchen
- sichtbarkeit
  - für alle sichtbar / projekt sucht mitglieder
- häkchen: abgeschlossen

## alle fragen / alle projekte
- suche/filter nach tags
- liste mit allen sichtbaren fragen/projekten
- pagination

## authentication
- make useState persistent through reloads. use cookie for it
- forgot passwpord 

## possible improvements
- use an auth cookie. 
  - db.ts -> preplogin could generate an auth cookie
  - db.ts -> prepDataRequest could check for auth cookie