(this.webpackJsonppinatic=this.webpackJsonppinatic||[]).push([[0],{32:function(n,t,e){},33:function(n,t,e){},56:function(n,t,e){"use strict";e.r(t);var r=e(1),a=e(0),i=e.n(a),o=e(20),c=e.n(o),u=(e(32),e.p,e(33),e(9)),f=e(3),s=e(21),d=e(22),p=e(7),j=e.n(p),b=function(){function n(){Object(s.a)(this,n)}return Object(d.a)(n,null,[{key:"getProfileInfo",value:function(t){j.a.get(n.endpoint+"summary").then((function(n){return t(n.data)}))}},{key:"getOwnedGames",value:function(t){j.a.get(n.endpoint+"owned-games").then((function(n){return t(n.data.response)}))}}]),n}();b.endpoint="https://pinatic-api.herokuapp.com/";var l=e(4),g=e(23),O=e.n(g);function x(){var n=Object(f.a)(["\n    margin-left: 4px;\n    font-weight: 500;\n"]);return x=function(){return n},n}function h(){var n=Object(f.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n"]);return h=function(){return n},n}function v(){var n=Object(f.a)(["\n    height: 12px;\n    width: 12px;\n    border-radius: 100%;\n    background-color: ",";\n"]);return v=function(){return n},n}function m(){var n=Object(f.a)(["\n    display: inherit;\n    font-size: 24px;\n    font-weight: 400;\n"]);return m=function(){return n},n}function y(){var n=Object(f.a)(["\n    font-size: 20px;\n    display: inherit;\n"]);return y=function(){return n},n}function w(){var n=Object(f.a)(["\n    margin-top: 8px;\n    margin-bottom: 8px;\n    height: 1px;\n    background-color: black;\n    width: 100%;\n"]);return w=function(){return n},n}function k(){var n=Object(f.a)(["\n    font-size: 24px;\n    font-weight: 500;\n"]);return k=function(){return n},n}function F(){var n=Object(f.a)(["\n    margin-top: 40px;\n    padding: 12px;\n    background-color: #a8a8a8;\n    border-radius: 4px;\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n    text-align: center;\n"]);return F=function(){return n},n}function S(){var n=Object(f.a)(["\n    background-image: url(",");\n    background-repeat: no-repeat;\n    background-position: center;\n    height: 200px;\n    width: 200px;\n"]);return S=function(){return n},n}function z(){var n=Object(f.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    animation: fadein 3s;\n\n    @keyframes fadein {\n        from { opacity: 0; }\n        to   { opacity: 1; }\n    }\n"]);return z=function(){return n},n}var I=l.a.div(z()),L=l.a.div(S(),(function(n){return n.url})),P=l.a.div(F()),B=l.a.span(k()),C=l.a.div(w()),E=l.a.span(y()),G=l.a.span(m()),J=l.a.div(v(),(function(n){return n.color})),T=l.a.div(h()),A=l.a.span(x()),D=function(n){return["Offline","Online","Busy","Away","Snooze","Looking to trade","Looking to play"][n]},M=function(){var n,t=Object(a.useState)(),e=Object(u.a)(t,2),i=e[0],o=e[1],c=Object(a.useState)(),f=Object(u.a)(c,2),s=f[0],d=f[1];return Object(a.useEffect)((function(){b.getProfileInfo((function(n){return o(n)}))}),[]),Object(a.useEffect)((function(){b.getOwnedGames((function(n){return d(n)}))}),[]),console.log(i),console.log(s),Object(r.jsx)(I,{children:i&&s&&Object(r.jsxs)(P,{children:[Object(r.jsx)(L,{url:i&&i.avatarfull}),Object(r.jsx)(B,{children:i.personaname}),Object(r.jsxs)(T,{children:[Object(r.jsx)(J,{color:(n=i.personastate,["gray","green","red","yellow","orange","brown","purple"][n])}),Object(r.jsx)(A,{children:D(i.personastate)})]}),Object(r.jsx)(C,{}),Object(r.jsx)(E,{children:"Owned games"}),Object(r.jsx)(G,{children:Object(r.jsx)(O.a,{end:s.game_count||200,duration:2})})]})})};var _=function(){return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(M,{})})},q=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,57)).then((function(t){var e=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;e(n),r(n),a(n),i(n),o(n)}))};c.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(_,{})}),document.getElementById("root")),q()}},[[56,1,2]]]);
//# sourceMappingURL=main.8723ed91.chunk.js.map