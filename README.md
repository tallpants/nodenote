# NodeNote

NodeNote is a CLI notes app built with Node.js and NeDB that uses Unix-style commands. Only tested on Linux.

## Demo

[![asciicast](https://asciinema.org/a/124653.png)](https://asciinema.org/a/124653)

## Installing

```
$ git clone https://github.com/tallpants/nodenote
$ cd nodenote
$ npm install
$ npm start
```

## Commands

* `ls` - List all the notes.
* `new` -- Create a new note.
* `view <index>` -- View the note with a particular index.
* `edit <index>` -- Edit the note with a particular index.
* `rm <index>` -- Remove the note with a particular index.
* `rmall` -- Remove all the notes.
* `find <regex>` -- List the notes which contain the regex provided in either the title or the body.
* `exit` -- Close the application.
* `dump` -- Dump the contents of the NeDB store to stdout.

## Note format

The first line of the note is considered the title.

The rest of the note is considered the body of the note.

```
This is the title

The rest of
the note
is considered the
body of the note.
```

## TODO

* Tagging support.
