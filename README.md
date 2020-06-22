# Recursive Repository

This repository contains a submodule for a previous version of itself that
does not contain a submodule.

The tagged submodule always knows how to build the repository
in which it is specified.

To build this version, run the following command inside this
repo.
```
node ./recursive-repo/build.js
```