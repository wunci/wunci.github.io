(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21f87f"],{d9e9:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",[a("h2",[t._v("dialog 弹出框（全局调用）")]),a("p",[a("br"),t._v("模拟系统的消息弹出框组件，用于消息提示、操作处理。")]),a("blockquote",[a("p",[t._v("alert")])]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("template")]),t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("@click")]),t._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v('"open"')]),t._v(">")]),t._v("弹出弹窗"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("button")]),t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("template")]),t._v(">")]),t._v("\n")])]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("default")]),t._v(" {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("methods")]),t._v(": {\n    open() {\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("this")]),t._v(".$dialog.alert("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v("'我是请提示'")]),t._v(")\n    }\n  }\n}\n")])]),a("blockquote",[a("p",[t._v("confirm")])]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("template")]),t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("@click")]),t._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v('"open"')]),t._v(">")]),t._v("弹出弹窗"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("button")]),t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[t._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[t._v("template")]),t._v(">")]),t._v("\n")])]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("default")]),t._v(" {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("methods")]),t._v(": {\n    open() {\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("this")]),t._v(".$dialog.confirm("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v("'我是请提示'")]),t._v(").then("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[t._v("res")]),t._v("=>")]),t._v("{\n          "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[t._v("// 点击了确定")]),t._v("\n      }).catch("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[t._v("res")]),t._v("=>")]),t._v("{\n          "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[t._v("// 点击了取消")]),t._v("\n      })\n    }\n  }\n}\n")])]),a("blockquote",[a("p",[t._v("完整实例演示")])]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[t._v("this")]),t._v(".$dialog.confirm({\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("title")]),t._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v("'这是title'")]),t._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("content")]),t._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v("'这是内容'")]),t._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("cancelBtnText")]),t._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v("'取消'")]),t._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("confirmBtnText")]),t._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[t._v("'确定'")]),t._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("disabledClick")]),t._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[t._v("true")]),t._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[t._v("zIndex")]),t._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[t._v("2000")]),t._v("\n}).then("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[t._v("res")]),t._v("=>")]),t._v("{\n    "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[t._v("// 点击了确定")]),t._v("\n}).catch("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[t._v("res")]),t._v("=>")]),t._v("{\n    "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[t._v("// 点击了取消")]),t._v("\n})\n")])]),a("blockquote",[a("p",[t._v("Api")])]),a("div",{staticClass:"table-container"},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("参数")]),a("th",{staticStyle:{"text-align":"center"}},[t._v("说明")]),a("th",{staticStyle:{"text-align":"center"}},[t._v("类型")]),a("th",{staticStyle:{"text-align":"center"}},[t._v("可选值")]),a("th",{staticStyle:{"text-align":"center"}},[t._v("默认值")])])]),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("title")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("顶部title文字")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("string")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("提示")])]),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("content")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("提示文字")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("string")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")])]),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("cancelBtnText")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("左侧显示取消的文字")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("string")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("取消")])]),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("confirmBtnText")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("右侧显示确定的文字")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("string")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("确定")])]),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("disabledClick")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("背景是否可以点击隐藏")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("false")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("false/true")])]),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("zIndex")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("层级")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("number")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("2000")])])])])])])}],r=a("2877"),l={},c=Object(r["a"])(l,e,n,!1,null,null,null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d21f87f.371a066b.js.map