# simpler-translate

A even simpler translate helper method.

* [Installation](#installation)
* [Usage](#usage)
* [Operators](#operators)

## Installation

```
npm i simpler-translate
```

## Usage

Create the translate helper by initializing it with an object of languages containing objects of key/value translations.

```js
import { Translate } from 'simpler-translate';

const translate = Translate({ 'en': { 'HELLO': 'Hello' }, 'nl': { 'HELLO': 'Hallo' } });

console.log(await translate('en', 'HELLO')); // --> Hello
console.log(await translate('nl', 'HELLO')); // --> Hallo
```

Replacement values can be used in the same format as [javascript template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

```js
import { Translate } from 'simpler-translate';

const translate = Translate({ 'en': { 'HELLO': 'Hello ${name}' }});

console.log(await translate('en', 'HELLO', { name: 'Hank' })); // --> Hello Hank
```

The translations object can also be a promise returned by reading a file from the filesystem or fetching a file.

```js
import { Translate } from 'simpler-translate';

const translate = Translate(Promise.resolve({ 'en': { 'HELLO': 'Hello' }, 'nl': { 'HELLO': 'Hallo' } }));

console.log(await translate('en', 'HELLO')); // --> Hello
console.log(await translate('nl', 'HELLO')); // --> Hallo
```

If you need more control over how your replacement values get joined with the translated text you can use `TranslateRaw` which will return the result as seperate segments just like [tag functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).

```js
import { TranslateRaw } from 'simpler-translate';

const translate = Translate({ 'en': { 'HELLO': 'Hello ${name}, how are you doing?' }});

console.log(await translate('en', 'HELLO', { name: 'Hank' })); // -> `[ ['Hello ', ', how are you doing?'], 'Hank' ]`

```
