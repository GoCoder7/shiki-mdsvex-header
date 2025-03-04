# Introduce

a shiki transformer for [mdsvex](https://github.com/pngwn/MDsveX) that adds a **header** as a child of `pre.shiki` element.

It adds the `div.header` element to before (or after) of the `code` element as a sibling.

`div.header`element contains two `span` elements, `span.lang` and `span.title`
# example
## yields
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
## from(markdown metadata)
### title as string
````md
```js index.js
console.log("Hello World!");
```
````

### title as json
````md
```js {"title": "index.js"}
console.log("Hello World!");
```
````
- the key for title is `"title"`.

### title and lang as json
````md
```ts {"title": "index.js", "lang": "js"}
console.log("Hello World!");
```
````
- the key for language is `"lang"`. it overrides default language(in this example, `"js"` not `"ts"`)

# Init

```shell
pnpm i -D @gocoder/shiki-mdsvex-header
```

## Config

if we want to use `shiki` in `mdsvex`, we should specify `highlighter()`function.

this is the things you should have to do for make this library works
1. open `svelte.config.js` file
2. specify the **metadata** parameter of _mdsvexOptions_'s `highlighter()` function as the **3rd parameter**
3. add `meta` property to the `codeToHtml()`method's option as an object with `lang` and `meta` properties
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
- you can customize the **class** that added to each elements, and **visibility**, **string case**, and **position**

| Option             | Description                                                                                                                                                                                                    | Default value |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **headerClass**    | the class for the **header**(`div` element)<br><br>**Type**: `string` \| `undefined`                                                                                                                           | **"header"**  |
| **headerToBottom** | if true, the **header** will be added AFTER of the `code` element<br><br>Type: `boolean` \| `undefined`                                                                                                        | **false**     |
| **langCase**       | define the case of the **lang** string<br>- `"cap"`: capitalize<br>- `"up"`: uppercase<br>- `"none"`: raw string<br><br>Type: `"cap"` \| `"up"` \| `"none"` \| `undefined`                                     | **"cap"**     |
| **langClass**      | the class for the **lang**(`span` element)<br><br>Type: `string` \| `undefined`                                                                                                                                | **"lang"**    |
| **langFirst**      | if true, place the **lang** before **title**<br>(by default, the **title** first)<br><br>Type: `boolean` \| `undefined`                                                                                        | **false**     |
| **langVisible**    | if false, remove the **lang**(`span` element) from the **header**<br><br>Type: `boolean` \| `undefined`                                                                                                        | **true**      |
| **titleCase**      | define the case of the **title** string<br>- `"cap"`: capitalize<br>- `"up"`: uppercase<br>- `"low"`: lowercase<br>- `"none"`: raw string<br><br>Type: `"cap"` \| `"up"` \| `"low"` \| `"none"` \| `undefined` | **"none"**    |
| **titleClass**     | the class for the **title**(`span` element)<br><br>Type: `string` \| `undefined`                                                                                                                               | **"title"**   |
| **titleVisible**   | if false, remove the **title**(`span` element) from the **header**<br><br>Type: `boolean` \| `undefined`                                                                                                       | **true**      |

# License

MIT
