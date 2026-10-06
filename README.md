# Dili Wonka

Live site: https://dili-wonka.vercel.app/

The live Magic Hats game still uses the earlier trackable-ball rules. This source snapshot uses hidden-choice rules and is not deployed.

Browser game with Magic Doors, Magic Hats, Gacha, daily bonuses, and a leaderboard. The interface is in English. Guest play is available; X sign-in unlocks the golden-ticket draw.

This repository contains the static frontend and Vercel routing configuration. The `/api` and `/auth` rewrites point to an existing Cloudflare Worker; this frontend alone does not host a backend or database.

To inspect locally, serve `public/` with any static HTTP server. Gameplay and sign-in require the deployed API. No credentials or deployment state are included.
