(this.webpackJsonpdiploma=this.webpackJsonpdiploma||[]).push([[27],{136:function(t,i,n){"use strict";i.a=n.p+"static/media/default_image.2e8f257a.jpg"},614:function(t,i,n){},62:function(t,i,n){"use strict";n(0),n(65);var c=n(2),e="30px",o="10px 30px",s="auto",a="auto";i.a=function(t){var i=t.children,n=t.style,r=t.type,d=t.onClick,l=t.radius,u=t.customHeight,j=t.customWidth,b=t.customPadding,f=t.icon,p=l||e,h=j||s,g=u||a,m=b||o,x=n||"";return Object(c.jsxs)("button",{className:"custom_button ".concat(x),type:r,onClick:d,style:{borderRadius:p,width:h,height:g,padding:m},children:[f&&Object(c.jsx)(f,{}),i]})}},65:function(t,i,n){},740:function(t,i,n){"use strict";n.r(i);n(0),n(614);var c=n(62),e=n(25),o=n(136),s=n(3),a=n(95),r=n(2);i.default=function(){var t=Object(e.c)((function(t){return t.user})).notifications,i=Object(e.b)(),n=Object(s.g)();return Object(r.jsx)("div",{className:"notifications_container",children:t.map((function(t){return Object(r.jsxs)("div",{className:"notification_single_container",children:[Object(r.jsxs)("div",{className:"notification_single",onClick:function(){return c=t,n.push("goal/".concat(c.goalId)),void i(Object(a.f)(c.notificationId));var c},children:[Object(r.jsx)("img",{src:t.thumbnailImageUrl||o.a,alt:t.title}),Object(r.jsxs)("div",{className:"notification_single_right_wrapper",children:[Object(r.jsxs)("div",{className:"notification_single_texts",children:[Object(r.jsx)("h2",{children:t.title}),Object(r.jsx)("div",{children:t.description})]}),"REMINDER"===t.type&&Object(r.jsx)("div",{className:"notifications_single_button",children:Object(r.jsx)(c.a,{radius:"4px",customHeight:"40px",customWidth:"140px",onClick:function(c){return e=t,c.stopPropagation(),n.push("donate/".concat(e.goalId)),void i(Object(a.f)(e.notificationId));var e},children:"Donate Now"})})]}),t.isNew&&Object(r.jsx)("div",{className:"notification_single_indicator"})]}),Object(r.jsx)("button",{onClick:function(n){n.stopPropagation(),i(Object(a.e)(t.notificationId))},className:"notification_single_delete_button",children:"X"})]},t.notificationId)}))})}}}]);
//# sourceMappingURL=27.17a9cf42.chunk.js.map