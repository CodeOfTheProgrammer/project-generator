# Project Generator

Create new applications from project templates.

## Installation

Clone the repo, then from the root of the project install the project generator globally:

```
cd project-generator
npm install -g
```

## Usage

From anywhere, run `generator` and follow the prompts. It will create a directory using the project name in your current working directory.

## Available Templates

These templates are currently supported:

* `static-pug-sass` - Create a static website built from Pug templates and Sass. Supports hot browser reloading during development.

## Adding Templates

Add your new project template under the `templates` directory. The files in your template can contain template strings
that will be replaced with user-provided values. These template strings are currently supported:

* `{{ NAME }}`
* `{{ EMAIL }}`
