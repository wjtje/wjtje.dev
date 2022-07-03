# wjtje.dev <!-- omit in toc -->

> The source code for the website [https://www.wjtje.dev/](wjtje.dev)

## Index <!-- omit in toc -->

- [Features](#features)
- [Getting started](#getting-started)
- [Folder layout](#folder-layout)
- [License](#license)

## Features

- Auto generated GitHub event log
- Auto generated OpenStreepMap event log
- Easy to use contact options
- i18n support
- Dark and light mode support

## Getting started

1. Run a Prisma comptable database server (e.g. `docker-compose up -d database`)
2. Change the `.env` file and `src/lib/common.ts` files with your settings
3. Change the required text inside the `src/i18n` folders
4. Install all the packages `npm i`
5. Run the project `npm run dev`

## Folder layout

- `src/routes`: All the routes
- `src/lib/i18n`: All the text files
- `src/lib/components`: Small parts of pages or common components

## License

The MIT License (MIT) - Copyright (c) 2022 Wouter van der Wal
