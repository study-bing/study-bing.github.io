(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{340:function(s,t,n){s.exports=n.p+"assets/img/70.3199bd25.jpg"},525:function(s,t,n){"use strict";n.r(t);var a=n(1),e=Object(a.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[t("a",{attrs:{href:"https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/"),t("OutboundLink")],1),s._v(" "),t("img",{attrs:{src:n(340),alt:" 删除排序链表中的重复元素"}})]),s._v(" "),t("h2",{attrs:{id:"_1-常规解法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-常规解法"}},[s._v("#")]),s._v(" 1.常规解法")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @param {ListNode} head\n * @return {ListNode}\n */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("deleteDuplicates")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("head")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("head"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" current "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" head"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("next\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" pre "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" head\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("current"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不等于就跳过")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("pre"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("val "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!==")]),s._v(" current"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("val"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            pre"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("next "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" current\n            pre "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" current\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        current "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" current"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("next\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 清空后节点")]),s._v("\n        pre"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("next "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" head\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);