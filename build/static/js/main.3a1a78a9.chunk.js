(this.webpackJsonpzenft=this.webpackJsonpzenft||[]).push([[0],{30:function(e,t,n){},48:function(e,t){},54:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var c=n(7),a=n(42),s=n.n(a),o=(n(54),n.p,n(30),n(25)),r=n(26),l=n(11),i=n(13),j=Object(o.a)({apiKey:"AIzaSyD2sk9ieS0n4s9ZXLt0PFzkR2_hXTfvOLk",authDomain:"zenft-site.firebaseapp.com",projectId:"zenft-site",storageBucket:"zenft-site.appspot.com",messagingSenderId:"703732687630",appId:"1:703732687630:web:03f9b0572d61c3ad6ead5f",measurementId:"G-8BHTVB0XWE"}),d=(Object(r.a)(j),j),b=n(24),u=n(22),h=n(6);var p=function(){Object(u.c)(d);var e=Object(c.useState)(" "),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(" "),o=Object(l.a)(s,2),r=o[0],j=o[1],p=Object(i.f)();return Object(h.jsx)("header",{className:"App-header3",children:Object(h.jsxs)("div",{className:"card1",children:[Object(h.jsx)("div",{className:"inputdiv",children:Object(h.jsx)("input",{className:"input1",onChange:function(e){a(e.target.value)},placeholder:"Enter username"})}),Object(h.jsx)("div",{className:"inputdiv",children:Object(h.jsx)("input",{type:"password",className:"input2",onChange:function(e){j(e.target.value)},placeholder:"Enter password"})}),Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("button",{className:"nav-button2",onClick:function(){console.log(n),console.log(r);var e=Object(b.b)();Object(b.c)(e,n,r).then((function(e){e.user;localStorage.currentUser=e.user.uid,localStorage.loggedin=!0,console.log(e.user.uid),console.log(e.user.email),p.push("/Profile"),console.log("success")})).catch((function(e){e.code,e.message}))},children:"Login"})})]})})};var O=function(){var e=["January","February","March","April","May","June","July","August","September","October","November","December"],t=Object(u.c)(d),n=Object(c.useState)(" "),a=Object(l.a)(n,2),s=a[0],o=a[1],r=Object(c.useState)(" "),i=Object(l.a)(r,2),j=i[0],p=i[1],O=Object(c.useState)(" "),g=Object(l.a)(O,2),m=g[0],v=g[1];return Object(h.jsx)("header",{className:"App-header3",children:Object(h.jsxs)("div",{className:"card1",children:[Object(h.jsx)("div",{className:"inputdiv",children:Object(h.jsx)("input",{className:"input1",onChange:function(e){o(e.target.value)},placeholder:"Enter Email"})}),Object(h.jsx)("div",{className:"inputdiv",children:Object(h.jsx)("input",{className:"input3",onChange:function(e){v(e.target.value),console.log(m)},placeholder:"Enter User Name"})}),Object(h.jsx)("div",{className:"inputdiv",children:Object(h.jsx)("input",{type:"password",className:"input2",onChange:function(e){p(e.target.value)},placeholder:"Enter Password"})}),Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("button",{className:"nav-button2",onClick:function(){console.log(s),console.log(j),console.log(m);var n=Object(b.b)();Object(b.a)(n,s,j).then((function(n){var c=n.user,a=c.uid,s=c.email;console.log("success");var o=new Date,r=o.getFullYear(),l=o.getMonth(),i=e[l]+" "+r;Object(u.e)(Object(u.d)(t,"users/"+a),{email:s,NFTs:[],username:m,joined:i})})).catch((function(e){e.code,e.message}))},children:"Sign up"})})]})})},g=n(20);var m=function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsxs)("div",{className:"App-header1",children:[Object(h.jsx)("button",{onClick:function(){document.getElementsByClassName("audio-element")[0].play(),console.log("playing audio"),window.scrollTo(0,window.innerHeight)},className:"nav-button",children:"Investors"}),Object(h.jsx)("button",{onClick:function(){document.getElementsByClassName("audio-element1")[0].play(),console.log("playing audio"),window.scrollTo(0,1300)},className:"nav-button",children:"Creators"}),Object(h.jsx)("button",{onClick:function(){window.scrollTo(0,0)},className:"nav-button",children:"Careers"}),Object(h.jsx)("button",{className:"nav-button",children:Object(h.jsx)(g.b,{to:"login",children:"Login"})}),Object(h.jsx)("button",{className:"nav-button",children:Object(h.jsx)(g.b,{to:"signup",children:"Sign up"})}),Object(h.jsx)("button",{className:"nav-button",children:Object(h.jsx)(g.b,{to:"profile",children:"Profile"})})]}),Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)("img",{src:"yinyang.png",className:"App-logo",alt:"logo"}),Object(h.jsx)("p",{className:"paragraph",children:"zeNFT is an early-stage startup developing a platform for discovery, creation, and exchange of NFTs. We are looking for motivated individuals interested in transforming the NFT ecosystem by making it easier to understand and more accessible to everyday people. We are building a platform for the next wave of of NFTs that is as easy as searching on Google, posting on Instagram, and buying an app in the app store. Entirely self-funded, we are now seeking seed investors to complete and launch our MVP and continue to innovate. We have customers in hand."})]}),Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)("img",{src:"yinyang.png",className:"App-logo",alt:"logo"}),Object(h.jsx)("p",{className:"paragraph",children:"We have many investors beating down the door to get in on the action.  NFTs are one of the hottest items in the financial markets and we're nowhere near mass adoption.  There is certainly money to be made now and in the distant future but those who get in earliest will reap the biggest rewards."})]}),Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsxs)("div",{className:"card",children:[Object(h.jsx)("img",{src:"robert.jpg",alt:"Avatar"}),Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("h4",{children:Object(h.jsx)("b",{children:"Robert Beit"})}),Object(h.jsx)("p",{children:"Front-End Web Developer"})]})]}),Object(h.jsxs)("div",{className:"card",children:[Object(h.jsx)("img",{src:"kyle.jpg",alt:"Avatar"}),Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("h4",{children:Object(h.jsx)("b",{children:"Kyle Leesang"})}),Object(h.jsx)("p",{children:"Blockchain Developer"})]})]})]}),Object(h.jsx)("audio",{className:"audio-element",children:Object(h.jsx)("source",{src:"sweetvictory.mp3"})}),Object(h.jsx)("audio",{className:"audio-element1",children:Object(h.jsx)("source",{src:"lotr1.mp3"})})]})},v=n(4),x=n(5),f=n(8),N=n(9),y=function(e){Object(f.a)(n,e);var t=Object(N.a)(n);function n(){var e;Object(v.a)(this,n);for(var c=arguments.length,a=new Array(c),s=0;s<c;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).onClick=function(){var t=e.props,n=t.label;(0,t.onClick)(n)},e}return Object(x.a)(n,[{key:"render",value:function(){var e=this.onClick,t=this.props,n=t.activeTab,c=t.label,a="tab-list-item";return n===c&&(a+=" tab-list-active"),Object(h.jsx)("li",{className:a,onClick:e,children:c})}}]),n}(c.Component),C=y,S=function(e){Object(f.a)(n,e);var t=Object(N.a)(n);function n(e){var c;return Object(v.a)(this,n),(c=t.call(this,e)).onClickTabItem=function(e){c.setState({activeTab:e})},c.state={activeTab:c.props.children[0].props.label},c}return Object(x.a)(n,[{key:"render",value:function(){var e=this.onClickTabItem,t=this.props.children,n=this.state.activeTab;return Object(h.jsxs)("div",{className:"tabs",children:[Object(h.jsx)("ol",{className:"tab-list",children:t.map((function(t){var c=t.props.label;return Object(h.jsx)(C,{activeTab:n,label:c,onClick:e},c)}))}),Object(h.jsx)("div",{className:"tab-content",children:t.map((function(e){if(e.props.label===n)return e.props.children}))})]})}}]),n}(c.Component);var w=function(){var e=Object(c.useState)(" "),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(" "),o=Object(l.a)(s,2),r=o[0],j=o[1],d=Object(c.useState)(" "),p=Object(l.a)(d,2),O=(p[0],p[1],Object(u.d)(Object(u.c)()));Object(u.b)(Object(u.a)(O,"users/".concat(localStorage.currentUser))).then((function(e){if(e.exists()){console.log(e.val());var t=e.val();a(t.username),j(t.joined)}else console.log("No data available"),console.log(localStorage.currentUser)})).catch((function(e){console.error(e)}));var g=Object(i.f)();return void 0===localStorage.currentUser&&(g.push("/"),console.log("running ")),Object(h.jsxs)("div",{children:[Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsx)("img",{src:"yinyang.png",className:"App-logo",alt:"logo"})}),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsx)("p",{className:"paragraph",children:n})}),Object(h.jsx)("div",{children:Object(h.jsx)("p",{className:"paragraph",children:"collector started with bananas"})}),Object(h.jsx)("div",{children:Object(h.jsx)("p",{className:"paragraph",children:r})})]})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"nav-button2",onClick:function(){var e=Object(b.b)();Object(b.d)(e).then((function(){console.log("signed out"),localStorage.currentUser=void 0,localStorage.loggedin=!1,console.log(localStorage.currentUser),g.push("/Login")})).catch((function(e){}))},children:"Logout"})})]}),Object(h.jsx)("div",{className:"App-header2",children:Object(h.jsxs)(S,{children:[Object(h.jsx)("div",{label:"Collected",children:"Collected"}),Object(h.jsx)("div",{label:"Created",children:"Created"}),Object(h.jsx)("div",{label:"Favorited",children:"Favorited"}),Object(h.jsx)("div",{label:"Activity",children:"Activity"}),Object(h.jsx)("div",{label:"Offers",children:"Offers"})]})})]})},k=n(29),T=n(46),A=["component"];function F(e){var t=e.component,n=Object(T.a)(e,A);return"true"==localStorage.loggedin?(console.log("undefined ran"),Object(h.jsx)(i.b,Object(k.a)(Object(k.a)({},n),{},{render:function(e){return localStorage.currentUser?Object(h.jsx)(t,Object(k.a)({},e)):Object(h.jsx)(i.a,{to:"/login"})}}))):(console.log("normal ran"),console.log(localStorage.currentUser),console.log(localStorage.loggedin),console.log(1==localStorage.loggedin),Object(h.jsx)(i.b,Object(k.a)(Object(k.a)({},n),{},{render:function(e){return Object(h.jsx)(i.a,{to:"/login"})}})))}var E=n(48),I=n.n(E);var L=function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(F,{exact:!0,path:"/Profile",component:w}),Object(h.jsx)(F,{path:"/UpdateProfile",component:I.a}),Object(h.jsx)(i.b,{exact:!0,path:"/Login",component:p}),Object(h.jsx)(i.b,{exact:!0,path:"/Signup",component:O}),Object(h.jsx)(i.b,{exact:!0,path:"/",component:m})]})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,66)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),s(e),o(e)}))};s.a.render(Object(h.jsx)(g.a,{children:Object(h.jsx)(L,{})}),document.getElementById("root")),U()}},[[65,1,2]]]);
//# sourceMappingURL=main.3a1a78a9.chunk.js.map