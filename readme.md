=========================================

Hi Ciro,  Try;  creating a new React app & not eject from it.

You'll be using create-react-app version 3.4.0.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Windows OS:  Use admin mode.

---------------------------------------------------------------------

#1)  Quit your command-line (CL) & browser,

This ensures your CL isn't (still) running another process.

---------------------------------------------------------------------

#2)  Inside your CL,  run:

npm cache verify when complete,  run ...

npm cache clean --force

Above: Mac: prefix sudo.   Ignore any warning.

---------------------------------------------------------------------

#3)  Make sure you're using Node version 12.16.1 LTS.

Not recommended:  version 13.11.0 Current.

Check your version:  node -v

https://nodejs.org/en/   Note:  It will include NPM.

---------------------------------------------------------------------

#4)  Run: npm install -g create-react-app@3.4.0

Above;  Mac:  prefix sudo.

It's ok to overwrite your current global installation of CRA.

npm uninstall -g create-react-app if you want to uninstall.

Above:  Mac:  prefix sudo.

---------------------------------------------------------------------

#5)  Point your CL to where you want to create your project.

Note:  Don't run React apps from your desktop.

Some operating system (situations) may be problematic.

Mac OS:  I use my Home folder.   Windows OS > Documents.

---------------------------------------------------------------------

Fully read steps #6a & #6b before acting.

#6a)  Inside your CL run:  create-react-app my-app

This will create a project named my-app.

Your project name must use: lowercase,  dashes,  numbers.

- - - - - - - -

Above:  Mac do NOT prefix sudo unless you get permission errors.

If you use sudo for this stage, (later) you'll need to add your

account to the src folder to make changes.  <<< Mac OS.

- - - - - - - -

#6b)  Watch your CL for any additional instructions (if any).

Perform the suggested dependency installs (updates),

but Don't preform any "breaking changes".

Your CL will notify you if a suggestion is a "breaking change".

If suggested,  run:  npm audit fix   (Mac prefix: sudo)

It's ok if all vulnerabilities can't be fixed. Just move on.

---------------------------------------------------------------------

#7)  You'll need to install any required packages.

Example: radium & styled-components.

Point your CL to your project folder (if not already).

Run:  npm install radium    (Mac prefix: sudo)

See step #6b again.

- - - - - - - - - - - - - - - - - -

Later (or now) install:  axios, react-router-dom, ...

---------------------------------------------------------------------

#8)  Point your CL to your (new) project folder.

Above:  This step is often forgotten.

---------------------------------------------------------------------

#9)  Open Google Chrome.   then ...

With your CL still pointing to your project folder,

run:  npm start.

In (about) 15 seconds, the app should load into Chrome.

Note:  If I don't pre-open Chrome,

my app will open inside Safari (browser).

Do this,  to make sure the default React app works.

---------------------------------------------------------------------

#10)  Quit your command-line (CL) & browser.

---------------------------------------------------------------------

#11)  Replace the src folder (default) content with

your project's src folder content.

Or,  with the course src folder content.

---------------------------------------------------------------------

Below:  If relevant ...

#12)  Next,  activate the CSS Modules.

I recommend the non-eject version.

Make the CSS Modules .module adjustment:

Example:  The App.css file name becomes App.module.css

import classes from './App.css';

becomes:  import classes from './App.module.css';

Above:  do this for all files that use import classes.....

---------------------------------------------------------------------

#13)  Perform steps #8 (if required) & #9.

================================= MLR
