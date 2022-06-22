#!/bin/sh
npx prisma generate
npx prisma migrate deploy
npx prisma studio &
node build/index.js
