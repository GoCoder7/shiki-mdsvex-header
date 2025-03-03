# Introduce

a shiki transformer for [mdsvex](https://github.com/pngwn/MDsveX) that adds a **header** as a child of `pre.shiki` element
the `div` element is added before (or after) of the `code` element as **header** and
it has children `span` elements for **lang** and **title**

## from(markdown metadata)

like this(the whole meta data become the **title** contents)

````md
```js index.js
console.log("Hello World!");
```
````

or like json format(the value of "title" key become the **title** contents)

````md
```js {"title": "index.js"}
console.log("Hello World!");
```
````

if you want to change the language to be displayed, just add **"lang"** entry to the json

````md
```ts {"title": "index.js", "lang": "js"}
console.log("Hello World!");
```
````

## yields(html)

```html
<pre class="shiki">
	<div class="header">
		<span class="lang">js</span>
		<span class="title">index.js</span>
	</div>
	<code>...</code>
	<!-- header can be added hear also -->
</pre>
```

# Init

```shell
pnpm i -D @gocoder/shiki-mdsvex-header
```

## Config

you should pass the **language** and **metadata** from _mdsvex_ to _shiki_'s `meta`option

this is the things you should have to do for make this transformer works

1. open `svelte.config.js` file
2. get the `meta` from _mdsvexOptions_'s `highlighter()` function as the **3rd parameter**
3. add `meta` property to the `codeToHtml()`method's option as an object with `lang` and `meta` properties

in mdsvexOptions, we add shiki with `highlighter()`function

actually, we can get the metadata of the codeblock as the 3rd parameter of `highlighter()`function, and if we want to use the language information, we also have to passover the language to the shiki like this

```js
// svelte.config.js
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

const shikiHighlighter = await createHighlighter({...});
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text', meta) => {
			const html = escapeSvelte(
				shikiHighlighter.codeToHtml(code, {
					lang,
					theme: 'dracula',
					meta: { lang, meta },
					...
				})
			);
			return `{@html \`${html}\`}`;
		}
	},
};
```

## Add Transformer

```js
import { addHeader } from "@gocoder/shiki-mdsvex-header";

// optional
const addHeaderOptions = {
  headerClass: "my-header",
  langVisible: true,
};

export async function highlight(code, lang) {
  return await codeToHtml(code, {
    lang,
    transformers: [addHeader(addHeaderOptions)],
  });
}
```

# Options

- you can customize the **class** that added to each elements and **visibility**, **string case**, and **position**

| Option             | Description                                                                                                                               | Default value |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **headerClass**    | the class for the **header**(`div` element)                                                                                               | **"header"**  |
| **headerToBottom** | if true, the **header** will be added after the `code` element                                                                            | **false**     |
| **langCase**       | define the case of the **lang** string<br>- `"cap"`: capitalize<br>- `"up"`: uppercase<br>- `"none"`: raw string                          | **"cap"**     |
| **langClass**      | the class for the **lang**(`span` element)                                                                                                | **"lang"**    |
| **langVisible**    | if false, remove the **lang**(`span` element) from the **header**                                                                         | **"true"**    |
| **titleCase**      | define the case of the **title** string<br>- `"cap"`: capitalize<br>- `"up"`: uppercase<br>- `"low"`: lowercase<br>- `"none"`: raw string | **"none"**    |
| **titleClass**     | the class for the **title**(`span` element)                                                                                               | **"title"**   |
| **langFirst**      | if true, place the **lang** before **title**<br>or place the **lang** after **title** by default                                          | **false**     |
| **titleVisible**   | if false, remove the **title**(`span` element) from the **header**                                                                        | **true**      |

# License

MIT
