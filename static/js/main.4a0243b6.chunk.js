(this.webpackJsonpfra=this.webpackJsonpfra||[]).push([[0],{329:function(e,n,t){"use strict";t.r(n);var o=t(11),i=t.n(o),a=t(72),r=t.n(a),s=(t(78),t(40)),c=t(41),u=t(43),l=t(42),h=(t(79),t(73)),d=t.n(h),f=t(8),g=i.a.lazy((function(){return t.e(6).then(t.bind(null,333))})),p=i.a.lazy((function(){return t.e(5).then(t.bind(null,340))})),b=i.a.lazy((function(){return t.e(4).then(t.bind(null,334))})),m=i.a.lazy((function(){return t.e(7).then(t.bind(null,335))})),j=i.a.lazy((function(){return t.e(3).then(t.bind(null,336))})),v=i.a.lazy((function(){return t.e(9).then(t.bind(null,337))})),w=i.a.lazy((function(){return t.e(8).then(t.bind(null,338))})),S={input:"",imageUrl:"",boxes:[],route:"signin",isSignedIn:!1,user:{id:"",name:"",email:"",entries:0,joined:""}},y=function(e){Object(u.a)(t,e);var n=Object(l.a)(t);function t(){var e;return Object(s.a)(this,t),(e=n.call(this)).calculateFaceLocations=function(e){var n=document.getElementById("inputimage"),t=Number(n.width),o=Number(n.height);return e.outputs[0].data.regions.map((function(e){var n=e.region_info.bounding_box;return{leftCol:n.left_col*t,topRow:n.top_row*o,rightCol:t-n.right_col*t,bottomRow:o-n.bottom_row*o}}))},e.displayFaceBoxes=function(n){e.setState({boxes:n})},e.loadUser=function(n){e.setState({user:{id:n.id,name:n.name,email:n.email,entries:n.entries,joined:n.joined}})},e.onSubmit=function(){e.setState({imageUrl:e.state.input});var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:e.state.input})};fetch("https://face-recognition-app-backend.herokuapp.com/imageurl",n).then((function(e){return e.json()})).then((function(n){if(n){var t={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.state.user.id})};fetch("https://face-recognition-app-backend.herokuapp.com/image",t).then((function(e){return e.json()})).then((function(n){n&&e.setState(Object.assign(e.state.user,{entries:n}))})).catch(console.log)}e.displayFaceBoxes(e.calculateFaceLocations(n))})).catch((function(e){return console.log(e)}))},e.onInputChange=function(n){return e.setState({input:n.target.value})},e.onRouteChange=function(n){"signout"===n?(e.setState({isSignedIn:!1}),e.setState({initialState:S})):"home"===n&&e.setState({isSignedIn:!0}),e.setState({route:n})},e.state=S,e}return Object(c.a)(t,[{key:"render",value:function(){var e=this.state,n=e.isSignedIn,t=e.route,i=e.boxes,a=e.imageUrl;return Object(f.jsxs)("div",{className:"App",children:[" ",Object(f.jsx)(d.a,{className:"particles",params:{particles:{number:{value:150},size:{value:3}},interactivity:{events:{onhover:{enable:!0,mode:"repulse"}}}}})," ",Object(f.jsxs)(o.Suspense,{fallback:Object(f.jsx)("div",{children:"Chargement..."}),children:[" ",Object(f.jsx)(g,{isSignedIn:n,onRouteChange:this.onRouteChange}),"home"===t?Object(f.jsxs)("div",{children:[" ",Object(f.jsx)(p,{})," ",Object(f.jsx)(m,{name:this.state.user.name,entries:this.state.user.entries})," ",Object(f.jsx)(b,{onInputChange:this.onInputChange,onSubmit:this.onSubmit})," ",Object(f.jsx)(j,{boxes:i,imageUrl:a})," "]}):"signin"===t?Object(f.jsx)(v,{loadUser:this.loadUser,onRouteChange:this.onRouteChange}):Object(f.jsx)(w,{loadUser:this.loadUser,onRouteChange:this.onRouteChange})]})]})}}]),t}(o.Component),O=function(e){e&&e instanceof Function&&t.e(10).then(t.bind(null,339)).then((function(n){var t=n.getCLS,o=n.getFID,i=n.getFCP,a=n.getLCP,r=n.getTTFB;t(e),o(e),i(e),a(e),r(e)}))},x=(t(328),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function C(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(Object(f.jsxs)(i.a.StrictMode,{children:[" ",Object(f.jsx)(y,{})," "]}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/face-detection",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/face-detection","/service-worker.js");x?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):C(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):C(n,e)}))}}(),O()},78:function(e,n,t){},79:function(e,n,t){}},[[329,1,2]]]);
//# sourceMappingURL=main.4a0243b6.chunk.js.map