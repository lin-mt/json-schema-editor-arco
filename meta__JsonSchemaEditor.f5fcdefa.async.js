"use strict";(self.webpackChunk_quiet_front_end_json_schema_editor_arco=self.webpackChunk_quiet_front_end_json_schema_editor_arco||[]).push([[593],{77102:function(be,L,t){t.r(L),t.d(L,{demos:function(){return T}});var re=t(15009),c=t.n(re),he=t(99289),k=t.n(he),J=t(67294),et=t(57396),me=t(56506),T={"jsonschemaeditor-demo-0":{component:J.memo(J.lazy(k()(c()().mark(function l(){var V,R;return c()().wrap(function(B){for(;;)switch(B.prev=B.next){case 0:return B.next=2,Promise.resolve().then(t.bind(t,56506));case 2:return V=B.sent,R=V.JsonSchemaEditor,B.abrupt("return",{default:function(){return J.createElement(R,null)}});case 5:case"end":return B.stop()}},l)})))),asset:{type:"BLOCK",id:"jsonschemaeditor-demo-0",refAtomIds:["JsonSchemaEditor"],dependencies:{"index.jsx":{type:"FILE",value:`import { JsonSchemaEditor } from '@quiet-front-end/json-schema-editor-arco';

export default () => <JsonSchemaEditor />;`},"@quiet-front-end/json-schema-editor-arco":{type:"NPM",value:"1.0.0"}},entry:"index.jsx"},context:{"@quiet-front-end/json-schema-editor-arco":me},renderOpts:{compile:function(){var l=k()(c()().mark(function R(){var X,B=arguments;return c()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.next=2,t.e(335).then(t.bind(t,37335));case 2:return S.abrupt("return",(X=S.sent).default.apply(X,B));case 3:case"end":return S.stop()}},R)}));function V(){return l.apply(this,arguments)}return V}()}}}},56506:function(be,L,t){t.r(L),t.d(L,{JsonSchemaEditor:function(){return vt}});var re=t(5574),c=t.n(re),he=t(52677),k=t.n(he),J=t(80507),et=t(81917),me=t(96486),T=t.n(me),l=t(67294),V=t(15009),R=t.n(V),X=t(99289),B=t.n(X),fe=t(97857),S=t.n(fe),Ae=t(74668),ae=t(53794),y=t(1911),K=t(56187),w=t(87108),tt=t(54224),oe=t(15695),nt=t(72404),ge=t(59330),De=t(31826),P=t(97101),rt=t(48331),at=t(74122),ot=t(99042),st=t(67945),it=t(94677),Oe=t(84566),lt=t(14539),Be=t(61873),ut=t(63764),dt={base:"vs",inherit:!0,rules:[{background:"FFFFFF",token:""},{foreground:"008e00",token:"comment"},{foreground:"7d4726",token:"meta.preprocessor"},{foreground:"7d4726",token:"keyword.control.import"},{foreground:"df0002",token:"string"},{foreground:"3a00dc",token:"constant.numeric"},{foreground:"c800a4",token:"constant.language"},{foreground:"275a5e",token:"constant.character"},{foreground:"275a5e",token:"constant.other"},{foreground:"c800a4",token:"variable.language"},{foreground:"c800a4",token:"variable.other"},{foreground:"c800a4",token:"keyword"},{foreground:"c900a4",token:"storage"},{foreground:"438288",token:"entity.name.class"},{foreground:"790ead",token:"entity.name.tag"},{foreground:"450084",token:"entity.other.attribute-name"},{foreground:"450084",token:"support.function"},{foreground:"450084",token:"support.constant"},{foreground:"790ead",token:"support.type"},{foreground:"790ead",token:"support.class"},{foreground:"790ead",token:"support.other.variable"}],colors:{"editor.foreground":"#000000","editor.background":"#FFFFFF","editor.selectionBackground":"#B5D5FF","editor.lineHighlightBackground":"#00000012","editorCursor.foreground":"#000000","editorWhitespace.foreground":"#BFBFBF"}},e=t(85893),ct=function(j){var D=j.width,F=j.lineNumbers,f=F===void 0?"on":F,v=j.height,C=j.value,O=j.folding,Z=O===void 0?!0:O,W=j.language,$=j.readOnly,M=$===void 0?!1:$,U=j.renderLineHighlight,G=U===void 0?"all":U,m=j.onChange;function _(a){a.editor.defineTheme("x-code-default",dt)}return(0,e.jsx)("div",{style:{border:"1px solid rgb(var(--color-border))",width:D||"100%"},children:(0,e.jsx)(ut.ZP,{height:v,width:D,value:C,language:W,onChange:m,onMount:j.handleEditorDidMount,beforeMount:_,theme:"x-code-default",options:{readOnly:M,lineNumbers:f,renderLineHighlight:G,folding:Z,smoothScrolling:!0,fontSize:13,scrollBeyondLastLine:!1,scrollbar:{},minimap:{enabled:!1}}})})},Pe=ct,Me=["string","number","array","object","boolean","integer"];function Y(i,j){if(i===null||k()(i)!=="object")return console.error("The provided value is not an object."),-1;var D=Object.keys(i);return D.indexOf(j)}var ht=[{value:"date-time"},{value:"date"},{value:"time"},{value:"email"},{value:"hostname"},{value:"ipv4"},{value:"ipv6"},{value:"uri"},{value:"regex"}],mt=Me.map(function(i){return{value:i}});function Ne(i){switch(i){case"string":return{type:"string"};case"number":return{type:"number"};case"boolean":return{type:"boolean"};case"object":return{type:"object",properties:{}};case"integer":return{type:"integer"};case"array":return{type:"array",items:{type:"string"}};case"null":}return{type:"string"}}var Je=function(j){var D=function(v){return Array.isArray(v)?"array":v===null?"null":k()(v)},F=function f(v){var C=D(v);switch(C){case"object":{var O={};for(var Z in v)v.hasOwnProperty(Z)&&(O[Z]=f(v[Z]));return{type:"object",properties:O,required:Object.keys(v)}}case"array":return{type:"array",items:v.length?f(v[0]):{}};default:return{type:C}}};return F(j)},I=Ae.Z.Row,s=Ae.Z.Col,ft=ae.Z.Option;function xe(i){var j=y.Z.useForm(),D=c()(j,1),F=D[0],f=i.changeSchema,v=i.renameProperty,C=i.isArrayItems,O=i.updateRequiredProperty,Z=i.parentSchemaDepth,W=Z===void 0?0:Z,$=i.removeProperty,M=i.addProperty,U=(0,l.useState)(i.schema),G=c()(U,2),m=G[0],_=G[1],a=(0,l.useState)(),g=c()(a,2),o=g[0],d=g[1],h=(0,l.useState)(i.propertyName),p=c()(h,2),u=p[0],b=p[1],N=(0,l.useState)(m.title),se=c()(N,2),ie=se[0],H=se[1],ve=(0,l.useState)(m.description),q=c()(ve,2),ee=q[0],le=q[1],pt=(0,l.useState)(i.nodeDepth?i.nodeDepth:0),Le=c()(pt,2),ue=Le[0],yt=Le[1],jt=(0,l.useState)(i.namePath?i.namePath:[]),Te=c()(jt,2),E=Te[0],St=Te[1],It=(0,l.useState)(!0),ke=c()(It,2),de=ke[0],Ct=ke[1],Ft=(0,l.useState)(!1),Re=c()(Ft,2),z=Re[0],ce=Re[1],Et=(0,l.useState)(!1),Ke=c()(Et,2),pe=Ke[0],ye=Ke[1],Zt=(0,l.useState)("json"),We=c()(Zt,2),$e=We[0],bt=We[1],At=(0,l.useState)(),Ue=c()(At,2),je=Ue[0],ze=Ue[1],Dt=(0,l.useState)(!1),Ve=c()(Dt,2),Ot=Ve[0],Bt=Ve[1],Pt=(0,l.useState)(!1),we=c()(Pt,2),Mt=we[0],Nt=we[1],Jt=(0,l.useState)(!1),Ge=c()(Jt,2),te=Ge[0],Lt=Ge[1],Tt=(0,l.useState)(!1),He=c()(Tt,2),Qe=He[0],kt=He[1],Rt=(0,l.useState)(!1),Xe=c()(Rt,2),ne=Xe[0],Kt=Xe[1],Wt=(0,l.useState)(!1),Ye=c()(Wt,2),Q=Ye[0],$t=Ye[1],Se=(0,l.useRef)(null),A=typeof u=="undefined";(0,l.useEffect)(function(){_(i.schema)},[i.schema]),(0,l.useEffect)(function(){St(i.namePath?i.namePath:[])},[i.namePath]),(0,l.useEffect)(function(){yt(i.nodeDepth?i.nodeDepth:0)},[i.nodeDepth]);var Ie=(0,l.useCallback)(T().debounce(function(n){typeof n=="function"?n():console.log("Provided argument is not a function")},300,{maxWait:1e3}),[]);(0,l.useEffect)(function(){return function(){Ie.cancel()}},[Ie]),(0,l.useEffect)(function(){!z||!o||(F.setFieldsValue(o),Bt(o.type==="object"),Nt(o.type==="array"),Lt(o.type==="number"),kt(o.type==="boolean"),Kt(o.type==="integer"),$t(o.type==="string"))},[z,JSON.stringify(o)]);var Ce=m.items,Fe=!!(m.type==="object"||C&&(Ce==null?void 0:Ce.type)==="object")&&!C&&!A;function _e(n){Se.current=n}return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(I,{align:"center",style:{paddingBottom:10},children:[(0,e.jsx)(s,{flex:"".concat(24+ue*15,"px"),style:{marginLeft:ue*5},children:(0,e.jsx)(I,{justify:"end",children:m.type==="object"&&(0,e.jsx)(K.Z,{type:"text",size:"mini",style:{color:"rgb(var(--color-text-2))"},icon:de?(0,e.jsx)(ot.Z,{}):(0,e.jsx)(st.Z,{}),onClick:function(){return Ct(!de)}})})}),(0,e.jsx)(s,{flex:"auto",style:{marginLeft:5},children:(0,e.jsx)(w.Z,{status:!A&&u.length===0?"error":void 0,disabled:A||C,value:A?"root":u,placeholder:"\u5C5E\u6027\u540D\u79F0",onBlur:function(){if((u==null?void 0:u.length)===0){J.Z.error("\u5C5E\u6027\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");return}v&&u&&(u==null?void 0:u.length)!==0&&v(E,u)},onChange:function(r){return b(r)}})}),(0,e.jsx)(s,{flex:"16px",style:{marginLeft:5},children:(0,e.jsx)(tt.Z,{disabled:C||A,style:{padding:0},onChange:function(r){O&&u&&O(E.slice(0,W),u,!r)}})}),(0,e.jsx)(s,{flex:"98px",style:{marginLeft:5},children:(0,e.jsx)(ae.Z,{style:{width:"98px"},value:m.type,onChange:function(r){f&&f(E,Ne(r),"type")},children:mt.map(function(n){return(0,e.jsx)(ft,{value:n.value,children:n.value},n.value)})})}),(0,e.jsx)(s,{flex:"auto",style:{marginLeft:5},children:(0,e.jsx)(w.Z,{placeholder:"\u6807\u9898",value:ie,onBlur:function(){f&&f(E.concat(Y(m,"title")),ie,"title")},onChange:function(r){return H(r)}})}),(0,e.jsx)(s,{flex:"auto",style:{marginLeft:5},children:(0,e.jsx)(w.Z,{placeholder:"\u63CF\u8FF0",value:ee,onBlur:function(){f&&f(E.concat(Y(m,"description")),ee,"description")},onChange:function(r){return le(r)}})}),(0,e.jsx)(s,{flex:"72px",style:{marginLeft:5},children:(0,e.jsxs)(I,{style:{width:"72px"},children:[(0,e.jsx)(oe.Z,{content:"\u9AD8\u7EA7\u8BBE\u7F6E",children:(0,e.jsx)(K.Z,{type:"text",size:"mini",icon:(0,e.jsx)(it.Z,{}),style:{color:"rgb(var(--green-6))"},onClick:function(){d(m),ce(!z)}})}),!A||!C||m.type==="object"?(0,e.jsx)(nt.Z,{position:"bottom",droplist:Fe&&(0,e.jsxs)(ge.Z,{children:[(0,e.jsx)(ge.Z.Item,{onClick:function(){M&&M(E,!1)},children:"\u540C\u7EA7\u8282\u70B9"},"addNode"),(0,e.jsx)(ge.Z.Item,{onClick:function(){M&&M(E,!0)},children:"\u5B50\u7EA7\u8282\u70B9"},"addChildNode")]}),children:(0,e.jsx)(oe.Z,{content:Fe?void 0:"\u6DFB\u52A0\u8282\u70B9",children:(0,e.jsx)(K.Z,{type:"text",size:"mini",icon:(0,e.jsx)(Oe.Z,{}),style:{color:"rgb(var(--primary-6))"},onClick:function(){Fe||M&&M(E,!(!C&&!A))}})})}):(0,e.jsx)("div",{style:{width:"24px"}}),(0,e.jsx)(s,{flex:"24px",children:A?(0,e.jsx)(oe.Z,{content:"\u5BFC\u5165Json",children:(0,e.jsx)(K.Z,{type:"text",size:"mini",icon:(0,e.jsx)(lt.Z,{}),style:{color:"rgb(var(--purple-6))"},onClick:function(){return ye(!0)}})}):C?(0,e.jsx)("div",{style:{width:"24px"}}):(0,e.jsx)(oe.Z,{content:"\u5220\u9664\u8282\u70B9",children:(0,e.jsx)(K.Z,{status:"danger",type:"text",size:"mini",icon:(0,e.jsx)(Be.Z,{}),onClick:function(){$&&$(E)}})})}),A&&m.type!=="object"&&(0,e.jsx)(s,{flex:"24px",children:!C&&(0,e.jsx)("div",{style:{width:"24px"}})})]})})]}),m.type==="object"&&de&&m.properties&&Object.keys(m.properties).map(function(n){return m.properties?(0,e.jsx)("div",{children:(0,e.jsx)(xe,S()(S()({},i),{},{isArrayItems:!1,nodeDepth:ue+1,parentSchemaDepth:A?0:W+2,namePath:E.concat(Y(m,"properties"),Y(m.properties,n)),propertyName:n,schema:m.properties[n]}))},String(n)):(0,e.jsx)(e.Fragment,{})}),m.type==="array"&&de&&(0,e.jsx)(xe,S()(S()({},i),{},{isArrayItems:!0,nodeDepth:ue+1,parentSchemaDepth:A?0:W+1,propertyName:"items",namePath:E.concat(Y(m,"items")),schema:m.items})),(0,e.jsx)(De.Z,{title:"\u9AD8\u7EA7\u8BBE\u7F6E",style:{width:900},visible:z,okText:"\u4FDD\u5B58",cancelText:"\u53D6\u6D88",onOk:B()(R()().mark(function n(){return R()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:if(f){x.next=2;break}return x.abrupt("return");case 2:if(!(A||m.type==="object")){x.next=6;break}return f(E,S()(S()({},m),o),"root"),ce(!z),x.abrupt("return");case 6:return x.prev=6,x.next=9,F.validate();case 9:f(E,S()(S()({},m),F.getFieldsValue()),u),ce(!z),x.next=17;break;case 13:x.prev=13,x.t0=x.catch(6),console.log(F.getFieldsError()),J.Z.error("\u5B57\u6BB5\u6821\u9A8C\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5B57\u6BB5\uFF01");case 17:case"end":return x.stop()}},n,null,[[6,13]])})),onCancel:function(){return ce(!z)},children:(0,e.jsxs)(y.Z,{form:F,onValuesChange:function(r,x){Se.current&&Se.current.setValue(JSON.stringify(S()(S()({},o),x),null,2))},children:[!Ot&&Me.indexOf(o==null?void 0:o.type)!==-1&&(0,e.jsx)("div",{style:{borderLeft:"3px solid rgb(var(--primary-6))",fontSize:16,fontWeight:399,paddingLeft:8,marginBottom:13},children:"\u57FA\u672C\u8BBE\u7F6E"}),(Q||te||ne||Qe)&&(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u9ED8\u8BA4\u503C\uFF1A"}),(0,e.jsxs)(s,{span:8,children:[Q&&(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"default",children:(0,e.jsx)(w.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"})}),(te||ne)&&(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"default",children:(0,e.jsx)(P.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"})}),Qe&&(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"default",children:(0,e.jsx)(ae.Z,{style:{width:"100%"},placeholder:"\u8BF7\u9009\u62E9\u9ED8\u8BA4\u503C",options:[{value:"true",label:"true"},{value:"false",label:"false"}]})})]})]}),Q&&(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6700\u5C0F\u957F\u5EA6\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"minLength",children:(0,e.jsx)(P.Z,{min:0,style:{width:"100%"},parser:function(r){return r?parseInt(r.replace(/\D/g,""),10):""},formatter:function(r){return r?"".concat(Math.floor(Math.max(Number(r),0))):""},placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u957F\u5EA6"})})}),(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6700\u5927\u957F\u5EA6\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"maxLength",children:(0,e.jsx)(P.Z,{min:0,style:{width:"100%"},parser:function(r){return r?parseInt(r.replace(/\D/g,""),10):""},formatter:function(r){return r?"".concat(Math.floor(Math.max(Number(r),0))):""},placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u957F\u5EA6"})})})]}),(te||ne)&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6700\u5C0F\u503C\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"minimum",children:(0,e.jsx)(P.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u503C"})})}),(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6700\u5927\u503C\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"maximum",children:(0,e.jsx)(P.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u503C"})})})]}),(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6392\u4ED6\u6700\u5C0F\u503C\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"exclusiveMinimum",children:(0,e.jsx)(P.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u6392\u4ED6\u6700\u5C0F\u503C"})})}),(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6392\u4ED6\u6700\u5927\u503C\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"exclusiveMaximum",children:(0,e.jsx)(P.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u6392\u4ED6\u6700\u5927\u503C"})})})]})]}),Q&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6B63\u5219\u5339\u914D\uFF1A"}),(0,e.jsx)(s,{span:20,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"pattern",children:(0,e.jsx)(w.Z,{placeholder:"\u8BF7\u8F93\u5165\u6B63\u5219\u5339\u914D\u516C\u5F0F"})})})]}),(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u683C\u5F0F\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"format",children:(0,e.jsx)(ae.Z,{allowClear:!0,options:ht.map(function(n){return n.value}),placeholder:"\u8BF7\u9009\u62E9\u5B57\u7B26\u4E32\u683C\u5F0F",style:{width:"100%"}})})})]})]}),Mt&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u5143\u7D20\u552F\u4E00\uFF1A"}),(0,e.jsx)(s,{span:20,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"uniqueItems",triggerPropName:"checked",children:(0,e.jsx)(rt.Z,{})})})]}),(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6700\u5C11\u5143\u7D20\u4E2A\u6570\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"minItems",children:(0,e.jsx)(P.Z,{style:{width:"100%"},parser:function(r){return r?parseInt(r.replace(/\D/g,""),10):""},formatter:function(r){return r?"".concat(Math.floor(Math.max(Number(r),0))):""},placeholder:"\u8BF7\u8F93\u5165\u6700\u5C11\u5143\u7D20\u4E2A\u6570"})})}),(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u6700\u591A\u5143\u7D20\u4E2A\u6570\uFF1A"}),(0,e.jsx)(s,{span:8,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,field:"maxItems",children:(0,e.jsx)(P.Z,{style:{width:"100%"},parser:function(r){return r?parseInt(r.replace(/\D/g,""),10):""},formatter:function(r){return r?"".concat(Math.floor(Math.max(Number(r),0))):""},placeholder:"\u8BF7\u8F93\u5165\u6700\u591A\u5143\u7D20\u4E2A\u6570"})})})]})]}),(Q||te||ne)&&(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:13},children:[(0,e.jsx)(s,{span:4,style:{textAlign:"right"},children:"\u679A\u4E3E\uFF1A"}),(0,e.jsx)(s,{span:20,children:(0,e.jsx)(y.Z.List,{field:"enums",children:function(r,x){var Ee=x.add,Ut=x.remove;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(I,{gutter:10,children:r.map(function(Ze,zt){var Vt=Ze.key,qe=Ze.field;return(0,e.jsx)(s,{span:12,children:(0,e.jsxs)(I,{justify:"start",align:"center",style:{marginBottom:6},children:[(0,e.jsxs)(s,{flex:"auto",children:[Q&&(0,e.jsx)(y.Z.Item,{noStyle:!0,field:qe,rules:[{required:!0}],children:(0,e.jsx)(w.Z,{placeholder:"\u8BF7\u8F93\u5165\u679A\u4E3E\u503C"})}),(te||ne)&&(0,e.jsx)(y.Z.Item,{noStyle:!0,field:qe,rules:[{required:!0}],children:(0,e.jsx)(P.Z,{style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165\u679A\u4E3E\u503C"})})]}),(0,e.jsx)(s,{flex:"36px",style:{paddingLeft:7},children:(0,e.jsx)(K.Z,{icon:(0,e.jsx)(Be.Z,{}),shape:"circle",status:"danger",onClick:function(){return Ut(zt)}})})]})},Vt)})}),(0,e.jsx)(I,{children:(0,e.jsx)(s,{span:12,children:(0,e.jsx)(y.Z.Item,{noStyle:!0,children:(0,e.jsx)(K.Z,{onClick:function(){return Ee()},icon:(0,e.jsx)(Oe.Z,{}),children:"\u6DFB\u52A0\u679A\u4E3E\u503C"})})})})]})}})})]}),(0,e.jsx)("div",{style:{borderLeft:"3px solid rgb(var(--primary-6))",fontSize:16,fontWeight:399,paddingLeft:8,marginBottom:13},children:"Json Schema"}),(0,e.jsx)(Pe,{height:300,language:"json",value:JSON.stringify(o,null,2),handleEditorDidMount:_e,onChange:function(r){Ie(function(){if(r)try{var x=JSON.parse(r);d(x)}catch(Ee){}})}})]})}),(0,e.jsxs)(De.Z,{title:"\u5BFC\u5165",style:{width:900},okText:"\u5BFC\u5165",cancelText:"\u53D6\u6D88",visible:pe,onOk:function(){if(!je||je.length===0){J.Z.warning("\u8BF7\u8F93\u5165\u5BFC\u5165\u7684 Json \u6570\u636E");return}var r;try{r=JSON.parse(je)}catch(Ee){J.Z.error("\u5BFC\u5165\u7684\u5185\u5BB9\u4E0D\u662F Json \u683C\u5F0F\u7684\u6570\u636E");return}var x;switch($e){case"json":x=Je(r);break;case"json-schema":x=r;break}f&&(f([],x,"root"),ye(!pe),ze(void 0))},onCancel:function(){return ye(!pe)},children:[(0,e.jsx)(I,{style:{marginBottom:16},children:(0,e.jsx)(at.Z.Group,{value:$e,type:"button",onChange:function(r){return bt(r)},options:[{value:"json",label:"Json"},{value:"json-schema",label:"JsonSchema"}]})}),(0,e.jsx)(I,{children:(0,e.jsx)(Pe,{height:399,language:"json",handleEditorDidMount:_e,onChange:function(r){return ze(r)}})})]})]})}var gt=xe;function xt(i){function j(a){var g={type:"object",properties:{field:{type:"string"}}};if(!a)return g;switch(k()(a)){case"string":try{return Je(JSON.parse(a))}catch(o){return J.Z.warning("\u521D\u59CB\u5316\u6570\u636E\u4E0D\u662F Json \u5B57\u7B26\u4E32\uFF0C\u65E0\u6CD5\u751F\u6210 JsonSchema"),g}case"object":return a}}var D=(0,l.useState)(j(i.data)),F=c()(D,2),f=F[0],v=F[1],C=(0,l.useState)(0),O=c()(C,2),Z=O[0],W=O[1];(0,l.useEffect)(function(){i.onSchemaChange&&i.onSchemaChange(f)},[f]);function $(a,g,o){if(a.length===0){v(g);return}for(var d=T().cloneDeep(f),h=d,p=0;p<a.length-1;p++){var u=Object.keys(h)[a[p]];h[u]||(h[u]={}),h=h[u]}var b=a[a.length-1],N=Object.keys(h)[b];if(b===-1){if(typeof g=="undefined")return;h[o]=g}else{if(h[N]===g)return;h[N]=g}v(d)}function M(a,g){for(var o=T().cloneDeep(f),d=o,h=null,p="",u=0;u<a.length-1;u++){var b=Object.keys(d),N=void 0;if(typeof a[u]=="number"?N=a[u]:N=b.indexOf(String(a[u])),N<0||N>=b.length){console.error("Path not found: ".concat(a.slice(0,u+1).join(".")));return}h=d,p=b[N],d=d[p]}var se=a[a.length-1],ie=Object.keys(d),H=ie[se];if(H!==g){if(d.hasOwnProperty(H))h[p]=Object.fromEntries(Object.entries(d).map(function(ve){var q=c()(ve,2),ee=q[0],le=q[1];return ee===H?[g,le]:[ee,le]}));else{console.error("Key not found: ".concat(H));return}v(o)}}function U(a,g,o){a.required||(a.required=[]);var d=a.required.indexOf(g);o?d!==-1&&a.required.splice(d,1):d===-1&&a.required.push(g),a.required.length===0&&delete a.required}function G(a,g,o){for(var d=T().cloneDeep(f),h=d,p=0;p<a.length;p++){var u=a[p],b=Object.keys(h);typeof h[b[u]]=="undefined"&&(h[b[u]]={}),h=h[b[u]]}U(h,g,o),v(d)}function m(a){for(var g=T().cloneDeep(f),o=g,d=g,h=0;h<a.length-1;h++)if(o!=null)d=o,o=o[Object.keys(o)[a[h]]];else{console.error("\u79FB\u9664\u7684\u8DEF\u5F84\u65E0\u6548",a);return}var p=Object.keys(o)[a[a.length-1]];U(d,p,!0),o&&k()(o)==="object"&&o.hasOwnProperty(p)&&delete o[p],v(g)}function _(a,g){for(var o=T().cloneDeep(f),d=o,h=0;h<a.length-(g?0:1);h++){var p=Object.keys(d)[a[h]];d[p]||(d[p]={}),d=d[p]}var u=Ne("string");g?d.properties["field_".concat(Z)]=u:d["field_".concat(Z)]=u,W(Z+1),v(o)}return(0,e.jsx)("div",{style:{paddingTop:"10px 10px 0 10px"},children:(0,e.jsx)(gt,{schema:f,changeSchema:$,renameProperty:M,removeProperty:m,addProperty:_,updateRequiredProperty:G})})}var vt=xt},71860:function(be,L,t){t.r(L),t.d(L,{texts:function(){return c}});var re=t(57396);const c=[{value:"1.x.x \u7248\u672C\u5DF2\u5B8C\u5168\u91CD\u6784\u3002",paraId:0,tocIndex:0},{value:"\u9700\u8981\u4E0E ",paraId:0,tocIndex:0},{value:"json-schema-editor-visual",paraId:0,tocIndex:0},{value:" UI \u5E03\u5C40\u7C7B\u4F3C\u7684\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u4F7F\u7528 ",paraId:0,tocIndex:0},{value:"0.x.x",paraId:0,tocIndex:0},{value:" \u7248\u672C\u3002",paraId:0,tocIndex:0},{value:`yarn add @quiet-front-end/json-schema-editor-arco
`,paraId:1,tocIndex:0},{value:"\u7EC4\u4EF6\u4E2D\u7684 JSON \u7F16\u8F91\u5668\u7528\u7684\u662F\u5728\u7EBF\u52A0\u8F7D cdn \u7684\u65B9\u5F0F\uFF0C\u79BB\u7EBF\u4F7F\u7528\u9700\u6DFB\u52A0 ",paraId:2,tocIndex:1},{value:"monaco-editor",paraId:2,tocIndex:1},{value:`yarn add monaco-editor
`,paraId:3,tocIndex:1},{value:"\u52A0\u8F7D monaco-editor",paraId:4,tocIndex:1},{value:`import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

loader.config({ monaco });
`,paraId:5,tocIndex:1},{value:"\u53C2\u6570\u540D\u79F0",paraId:6,tocIndex:2},{value:"\u63CF\u8FF0",paraId:6,tocIndex:2},{value:"\u7C7B\u578B",paraId:6,tocIndex:2},{value:"\u9ED8\u8BA4\u503C",paraId:6,tocIndex:2},{value:"onChange",paraId:6,tocIndex:2},{value:"JsonSchema \u53D8\u66F4\u56DE\u8C03",paraId:6,tocIndex:2},{value:"(schema: JSONSchema7) => void",paraId:6,tocIndex:2},{value:"-",paraId:6,tocIndex:2},{value:"data",paraId:6,tocIndex:2},{value:"\u521D\u59CB\u5316\u7EC4\u4EF6\u6570\u636E",paraId:6,tocIndex:2},{value:"JSONSchema7 | undefined | string;",paraId:6,tocIndex:2},{value:'{"type": "object","properties": {"field": {"type": "string"}}}',paraId:6,tocIndex:2}]}}]);