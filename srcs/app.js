'use strict';

import {
	readFileSync
} from 'fs';
import {
	parse
} from 'ini';

const configs = parse(readFileSync('./node_modules/html-json-highlight/configs/default.ini', 'utf-8'));

class HtmlJsonHighlight {
	static Font = configs.Font.Font || 'Arial';
	static Colors = {
		Comma: configs.Colors.Comma || "#4169E1",
		Key: configs.Colors.key || "#008B8B",
		Colon: configs.Colors.Colon || "#FF1493",
		String: configs.Colors.String|| "#DC143C",
		Number: configs.Colors.Number || "#32CD32",
		Boolean: configs.Colors.Boolean || "#DAA520",
		Null: configs.Colors.Null || "#8B4513",
		Object: configs.Colors.Object || "#556B2F",
		Array: configs.Colors.Array || "#7B68EE"
	}

	constructor(body) {
		this.index = 1;
		this.raw = body;
		this.newBody = [
			'{<br />'
		];

		Object.keys(body).forEach((value, index, arr) => {
			const subValue = Object.values(body);
			if(index === arr.length - 1) {
				this.newBody.push(`${HtmlJsonHighlight.space(2)}${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Key, `"${value}"`)}${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Colon, ':')} ${HtmlJsonHighlight.valueColor(subValue[index])}`);
			} else {
				this.newBody.push(`${HtmlJsonHighlight.space(2)}${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Key, `"${value}"`)}${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Colon, ':')} ${HtmlJsonHighlight.valueColor(subValue[index])}${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Comma, ',')}<br />`);
			}
		});
		this.newBody.push('<br />}');
		this.body.bind(this);
	}

	static color(color, value, type) {
		switch(type) {
			case 'String':
				return HtmlJsonHighlight.font(color, `"${value}"`);
			break;
	
			case 'Number':
				return HtmlJsonHighlight.font(color, value)
			break;
			
			case 'Boolean':
				return HtmlJsonHighlight.font(color, value)
			break;
			
			case 'Null':
				return HtmlJsonHighlight.font(color, value)
			break;
			
			case 'Object':
				this.subObject = (new HtmlJsonHighlight(value)).subBody();
				this.subObject = this.subObject.substring(1, this.subObject.length - 1)
				return `${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Object, '{')}${HtmlJsonHighlight.font(color, HtmlJsonHighlight.subObject.replaceAll(HtmlJsonHighlight.space(2), `${HtmlJsonHighlight.space(3)}#p$l$a$c$-$lZi:MUl$`))}${HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Object, `${HtmlJsonHighlight.space(2)}}`)}`;
			break;

			case 'Array':
				return [HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Array, '['), value.map(value => HtmlJsonHighlight.font(color, HtmlJsonHighlight.valueColor(value))).join(HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Comma, ', ')), HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Array, ']')].join('')
			break;
		}
	}

	static valueColor(value) {
		switch(Object.prototype.toString.call(value)) {
			case '[object String]':
				return HtmlJsonHighlight.color(HtmlJsonHighlight.Colors.String, value, 'String');
			break;

			case '[object Number]':
				return HtmlJsonHighlight.color(HtmlJsonHighlight.Colors.Number, value, 'Number');
			break;

			case '[object Boolean]':
				return HtmlJsonHighlight.color(HtmlJsonHighlight.Colors.Boolean, value, 'Boolean');
			break;
			
			case '[object Null]':
				return HtmlJsonHighlight.color(HtmlJsonHighlight.Colors.Null, value, 'Null');
			break;

			case '[object Object]':
				return HtmlJsonHighlight.color(HtmlJsonHighlight.Colors.Object, value, 'Object');
			break;

			case '[object Array]':
				return HtmlJsonHighlight.color(HtmlJsonHighlight.Colors.Array, value, 'Array');
			break;
		}
	}
	
	static font(color, content) {
		return `<font style="color: ${color}; font-family: ${HtmlJsonHighlight.Font}">${content}</font>`;
	}
	
	static space(quantity) {
		return new Array(quantity).fill('&nbsp;').join('');
	}
	
	subBody() {
		return this.newBody.join('');
	}
	
	body(status) {
		if(status)
		return this.raw;
		else {
			this.data = this.newBody.join('').replaceAll('#p$l$a$c$-$lZi:MUl$', HtmlJsonHighlight.space(1));
			this.data = HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Object, '{').concat(this.data.slice(1, this.data.length - 1)).concat(HtmlJsonHighlight.font(HtmlJsonHighlight.Colors.Object, '}'))
			return this.data;
		}
	}
};

export default HtmlJsonHighlight;