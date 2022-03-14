"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[956],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return d}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),l=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=l(e.components);return r.createElement(u.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=l(t),d=o,f=m["".concat(u,".").concat(d)]||m[d]||c[d]||i;return t?r.createElement(f,a(a({ref:n},s),{},{components:t})):r.createElement(f,a({ref:n},s))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=m;var p={};for(var u in n)hasOwnProperty.call(n,u)&&(p[u]=n[u]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3372:function(e,n,t){t.r(n),t.d(n,{assets:function(){return s},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return p},metadata:function(){return l},toc:function(){return c}});var r=t(7462),o=t(3366),i=(t(7294),t(3905)),a=["components"],p={sidebar_position:2},u="Input Group",l={unversionedId:"core/input-group",id:"core/input-group",title:"Input Group",description:"Blueprint InputGroup component controlled and binded to Formik Field component. Holds the same original component properties with extra following properties.",source:"@site/docs/core/input-group.md",sourceDirName:"core",slug:"/core/input-group",permalink:"/docs/core/input-group",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/core/input-group.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Form Group",permalink:"/docs/core/form-group"},next:{title:"Numeric Input",permalink:"/docs/core/numeric-input"}},s={},c=[{value:"Reference",id:"reference",level:2},{value:"Props",id:"props",level:3},{value:"name",id:"name",level:4},{value:"fastField",id:"fastfield",level:4},{value:"Example",id:"example",level:2}],m={toc:c};function d(e){var n=e.components,t=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"input-group"},"Input Group"),(0,i.kt)("p",null,"Blueprint ",(0,i.kt)("a",{parentName:"p",href:"https://blueprintjs.com/docs/#core/components/text-inputs"},"InputGroup")," component controlled and binded to Formik Field component. Holds the same original component properties with extra following properties."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"interface InputGroupProps extends Omit<FieldConfig, 'children'>, Omit<PBInputGroupProps2, 'value' | 'name'>")),(0,i.kt)("h2",{id:"reference"},"Reference"),(0,i.kt)("h3",{id:"props"},"Props"),(0,i.kt)("h4",{id:"name"},"name"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"name: string")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"Required"))),(0,i.kt)("p",null,"A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like ",(0,i.kt)("inlineCode",{parentName:"p"},"social.facebook"),"."),(0,i.kt)("h4",{id:"fastfield"},"fastField"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"fastField: boolean")),(0,i.kt)("p",null,"Switches to use ",(0,i.kt)("inlineCode",{parentName:"p"},"<FastField />")," Formik component instead of the regular ",(0,i.kt)("inlineCode",{parentName:"p"},"Field")," component, FastField is an optimized for performance to be used on large forms (~30+ fields) or when a field has very expensive reandering requirements. ",(0,i.kt)("a",{parentName:"p",href:"https://formik.org/docs/api/fastfield"},"Read more")," about FastField on Formik documentation."),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"example"},"Example"),(0,i.kt)("p",null,"The following example demonstrates how to use binded Input Group component with Formik."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport { Formik, Form, FormikHelpers } from 'formik';\nimport * as Yup from 'yup';\nimport { FormGroup, InputGroup } from '../packages/core/src';\n\nconst FormValidation = Yup.object().shape({\n  firstName: Yup.string()\n    .min(2, 'Too Short!')\n    .max(50, 'Too Long!')\n    .required('Required'),\n});\n\ninterface Values {\n  firstName: string;\n  lastName: string;\n}\n\nexport const Page = () => {\n  return (\n    <article>\n      <Formik\n        initialValues={{\n          firstName: 'Ahmed',\n          lastName: 'Bouhuolia\n        }}\n        validationSchema={FormValidation}\n        onSubmit={(\n          values: Values,\n          { setSubmitting }: FormikHelpers<Values>\n        ) => {}}\n      >\n        <Form>\n          <FormGroup name={'firstName'} label={'First name'}>\n            <InputGroup name={'firstName'} />\n          </FormGroup>\n\n          <FormGroup name={'lastName'} label={'Last name'}>\n            <InputGroup name={'lastName'} />\n          </FormGroup>\n\n          <button type=\"submit\">Submit</button>\n        </Form>\n      </Formik>\n    </article>\n  );\n};\n")))}d.isMDXComponent=!0}}]);