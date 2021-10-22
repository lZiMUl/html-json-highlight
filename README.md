# Welcome to Html Json Highlight

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


Install Command:
```
npm install html-json-highlight --save
```

Use Module
```js
import HtmlJsonHighlight from 'html-json-highlight';

const Demo = new HtmlJsonHighlight({
	string: 'hello',
	number: 123,
	boolean: true,
	object: {
		string: 'world',
		number: 321,
		false
	},
	array: [
		'lZiMUl',
		258,
		true
	],
	
});

// Simulator koa Route
Route.get('/', async socket => {
	socket.status = 200;
	socket.type = 'text/html';
	socket.response.body =  await Demo.body(false);
})
```