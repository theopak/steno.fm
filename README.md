# [Steno.fm](http://steno.fm) [![Circle CI](https://circleci.com/gh/theopak/steno.svg?style=svg)](https://circleci.com/gh/theopak/steno)

**The search engine for podcasts.** Search by phrase, speaker, and podcast title.

Steno.fm was built in 24 hours by (in alphabetical order) RPI seniors Dan Bulger, Theo Pak, Trevor Phillippi, and Derek Schultz at the [Facebook Global Hackathon Finals 2014](http://goo.gl/d4ldms). It won an honorable mention. As a result of being a hackathon project, the code is absolute garbage and needs to be made scalable and manageable.

![screenshot](screenshots.png)


## Developing

_TODO: rewrite this._

The steno.fm project has two parts: web and indexer.

Get started like this:

    $ git clone https://github.com/theopak/steno.git # get the repo, or pull if you already have it.
    $ cd frontend/                  # the Angular app lives here
    $ npm install -g bower          # install the bower package manager
    $ npm install                   # install dependencies
    $ bower install -g grunt-cli    # install the `grunt` command
    $ bower update                  # install dependencies
    $ grunt build                   # build the Angular app

Use `grunt serve` to run a server on http://localhost:9000. Use `grunt autoshot` to generate a new screenshot _while a local server is running_ on port 9000 (or as configured to in `Gruntfile.js`).

Deploy like this:

    $ grunt build
    $ git commit -am "build for deploy"
    $ git push production master
    $ ssh root@steno.fm
    $ cd /path/to/srv/or/whatever/derek/knows/the/answer
    $ cd frontend/
    $ nodejs web.js
