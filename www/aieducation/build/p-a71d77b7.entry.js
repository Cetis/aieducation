import{r as t,h as e,H as i,g as o}from"./p-68751d42.js";const s=class{constructor(e){t(this,e),this.countryName="United States of America"}countrySelected(t){t.detail&&(this.countryName=t.detail,this.content=document.getElementById(this.countryName),this.removeChildContent(),this.content&&this.setChildContent())}removeChildContent(){document.getElementById("oi-text-current")&&this.contentElement.removeChild(document.getElementById("oi-text-current"))}setChildContent(){let t=this.content.cloneNode(!0);t.setAttribute("id","oi-text-current"),this.contentElement.appendChild(t)}componentDidLoad(){this.contentElement=document.getElementById("oi-text-content"),this.content=document.getElementById(this.countryName),this.setChildContent()}render(){return e(i,null,e("div",{id:"oi-text-content",tabindex:"0"}),e("slot",null))}get element(){return o(this)}};s.style=":host{display:block}";export{s as oi_text}