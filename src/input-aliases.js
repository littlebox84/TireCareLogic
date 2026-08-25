(function(root){
'use strict';
const C=root.TIRE_CATALOG;if(!C)return;
const baseSearch=C.search.bind(C),baseParse=C.parseTireSize.bind(C),baseCompat=C.compatibilityForTire.bind(C);
const clean=v=>String(v??'').trim().toUpperCase().replace(/[–—]/g,'-');
function canonicalize(input){
 let s=clean(input);
 if(/^(TR|TV)?[A-Z]*\d+[A-Z]*$/i.test(s)&&!/^(P|LT|ST)\d/.test(s))return s;
 let m=s.match(/^\s*(P|LT|ST)?\s*(\d{3})\D+(\d{2,3})\D+(\d{2})\s*$/);if(m)return`${m[1]||''}${m[2]}/${m[3]}R${m[4]}`;
 m=s.match(/^\s*(P|LT|ST)?(\d{3})(\d{2})(\d{2})\s*$/);if(m)return`${m[1]||''}${m[2]}/${m[3]}R${m[4]}`;
 m=s.match(/^\s*(\d{3})\s*[\/ -]\s*(\d{2,3})\s*[R -]?\s*(\d{2}\.5)\s*$/);if(m)return`${m[1]}/${m[2]}R${m[3]}`;
 m=s.match(/^\s*(\d{3})\D+(\d{2,3})\D+(\d{2}\.5)\s*$/);if(m)return`${m[1]}/${m[2]}R${m[3]}`;
 m=s.match(/^\s*(\d{2})\s*[ ,\/-]+\s*(\d{1,2}(?:\.\d+)?)\s*[ ,\/-]+\s*(\d{1,2}(?:\.5)?)\s*$/);if(m)return`${m[1]}X${m[2]}-${m[3]}`;
 m=s.match(/^\s*(\d{2,3})\s*[ ,\/-]+\s*(\d{1,2}(?:\.\d+)?)\s*[R ,\/-]+\s*(\d{1,2}(?:\.5)?)\s*$/);if(m&&Number(m[1])<80)return`${m[1]}X${m[2]}R${m[3]}`;
 m=s.match(/^\s*(\d{3})(\d{2})\s*$/);if(m){const lead=Number(m[1]),width=lead>=400?(lead/100).toFixed(2):(lead/10).toFixed(1);return`${width}-${m[2]}`;}
 m=s.match(/^\s*(\d{3})R?(\d{2})\s*$/);if(m){const lead=Number(m[1]),width=lead>=400?(lead/100).toFixed(2):(lead/10).toFixed(1);return`${width}R${m[2]}`;}
 return s;
}
C.canonicalizeShopInput=canonicalize;
C.search=function(q){const c=canonicalize(q),r=baseSearch(c);r.originalQuery=q;r.canonicalQuery=c;return r;};
C.parseTireSize=function(q){return baseParse(canonicalize(q));};
C.compatibilityForTire=function(q){const c=canonicalize(q),r=baseCompat(c);r.originalInput=q;r.canonicalInput=c;return r;};
root.TIRE_CATALOG=C;
})(typeof window!=='undefined'?window:globalThis);
