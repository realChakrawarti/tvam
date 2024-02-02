# त्वम्: Tvam

# References:

-   SQLite ERB: https://github.com/amilajack/erb-sqlite-example
-   Node SQLite3 API: https://github.com/TryGhost/node-sqlite3/wiki/API
-   SQLite Official Docs: https://www.sqlite.org/docs.html
-   How to use sqlite sequalize inside boilerplate: https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/3083

-   How does SQLite works: https://jvns.ca/blog/2014/09/27/how-does-sqlite-work-part-1-pages/ and https://jvns.ca/blog/2014/10/02/how-does-sqlite-work-part-2-btrees/

-   Fonts: https://fonts.google.com/selection?query=Tiro+Typeworks

-   React Design Patterns: https://www.toptal.com/react/react-design-patterns-and-best-practices

# Make use of:

-   When writing SQL hard, make use of KnexJs https://knexjs.org/. Its a query builder.

# Projects Reference:

-   https://github.dev/SteveCastle/loki/
-   i18n: https://github.com/xiaolai/everyone-can-use-english
-   https://github.com/lyswhut/lx-music-desktop

# Pitfalls

## Usage of alias in `main.ts`

https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/2737#issuecomment-1430101495

## SQLite binary issue

On trying to the package we application, we got the following error,

```
• build native dependency from sources  name=sqlite3
                                          version=5.1.7
                                          platform=win32
                                          arch=x64
                                          napi=
reason=prebuild-install failed with error (run with env DEBUG=electron-builder to get more information)
                                          error=prebuild-install info begin Prebuild-install version 7.1.1
    prebuild-install warn This package does not support N-API version 36
    prebuild-install warn install prebuilt binaries enforced with --force!
    prebuild-install warn install prebuilt binaries may be out of date!
    prebuild-install info looking for local prebuild @ prebuilds\sqlite3-v5.1.7-napi-v36-win32-x64.tar.gz
    prebuild-install info looking for cached prebuild @ C:\Users\<user_name>\AppData\Local\npm-cache\_prebuilds\9aa761-sqlite3-v5.1.7-napi-v36-win32-x64.tar.gz
    prebuild-install http request GET https://github.com/TryGhost/node-sqlite3/releases/download/v5.1.7/sqlite3-v5.1.7-napi-v36-win32-x64.tar.gz
    prebuild-install http 404 https://github.com/TryGhost/node-sqlite3/releases/download/v5.1.7/sqlite3-v5.1.7-napi-v36-win32-x64.tar.gz
    prebuild-install warn install No prebuilt binaries found (target=36 runtime=napi arch=x64 libc= platform=win32)
```

After a little digging we found that NAPI, Native API at the time of writing is 9, but its saying 36.

Here is what is in the sqlite3 `package.json`

```
"binary": {
"napi_versions": [
    3,
    6
]
},
```

which is used by `prebuild-install -r napi` to build the binary file. Here `-r` stands for runtime. So, by default it tries to download by adding the items in the array.

The way we solved this by, downloading the correct binary gzip from github, and pasting the same in `C:\Users\<user_name>\AppData\Local\npm-cache\_prebuilds` directory, with the name `9aa761-sqlite3-v5.1.7-napi-v36-win32-x64.tar.gz` so it matches when it tries to find it.

We could ourself create the binary file of sqlite3 by doing following:

```
npm i sqlite3 --build-from-source --runtime=electron --target=<electron_version> --dist-url=https://electronjs.org/headers
```

which is documented at the bottom of `README.md` file on the sqlite3 repository.

Update: The above process i.e; installing from command didn't work. Downgrading to v5.1.6 solved the issue, https://github.com/TryGhost/node-sqlite3/issues/1748

# Project Structure

## `root` Directory

```
├───.erb // Electron react boilerplate webpack configuration and scripts
│
├───.vscode // VSCode IDE configuration
│
├───assets // Static images and fonts
│
├───release
│   │   
│   └───app // Include platform specific library binary
│
├───src // Source code of the entire application
```

## `main` Directory

```
│   main.ts // Entry file for main process
│   preload.ts // Setup exposing ipcRenderer to the renderer process
│   util.ts // Utility functions
|
├───controller // Excute queries on the database
│
├───models // Contains initialization of database and its tables
│
└───service // Handles ipcRenderer events on ipcMain and registers the corresponding listener
```

## `renderer` Directory

```
│   App.tsx // Entry file for react application
│   index.ejs // HTML main template
│   index.tsx // Entry file for renderer process
│   preload.d.ts // Type definition of ipcRenderer
│
├───element // Re-usable elements to be used in view
├───styles //
│       global.css // Tailwind and Shadcn styles configuration
│
└───view // Views in the application
```
