# Open Issues Report

## registration
- add field for username (=displayName)
- add veevalidate for login

## authentication
- make useState persistent through reloads. use cookie for it

## possible improvements
- use an auth cookie. 
  - db.ts -> preplogin could generate an auth cookie
  - db.ts -> prepDataRequest could check for auth cookie