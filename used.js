function urlLoader(met,url,tipe,data) {
return new Promise(function(resolve, reject) {
var request = new XMLHttpRequest();
request.open(met, url);
request.responseType = tipe;
request.onload = function() {
if (request.status == 200) {
resolve(request.response);
} else {
reject(Error('Request Failed' + request.statusText));
}
};
request.onerror = function(e) {
reject(Error('network error'));
};
request.send(data);
});
}

function fileUploader(url,tipe,cont,data) {
	return new Promise(function(resolve, reject) {
		var formData = new FormData();
		formData.append("myFile", document.getElementById(cont).files[0]);
		formData.append("json", data);
		var request = new XMLHttpRequest();
		request.responseType = tipe;
		request.open('POST', url);
		request.send(formData);
		request.onload = function() {
			if (request.status == 200) {
				resolve(request.response);
			} else {
				reject(Error('Request Failed' + request.statusText));
			}
		};
		request.onerror = function(e) {
			reject(Error('network error'));
		};
	});
}


function checkCompat(){
if (typeof(Worker) !== "undefined") {
if (typeof(Storage) !== "undefined") {
return true;
} else {
return false;
}
} else {
return false;
}
}
function dateNaming(a){
if(a==null){
return '-';
}else{
let arr = a.split("-"),nb='';
switch(arr[1]){
case '01':
nb='Januari';
break;
case '02':
nb='Februari';
break;
case '03':
nb='Maret';
break;
case '04':
nb='April';
break;
case '05':
nb='Mei';
break;
case '06':
nb='Juni';
break;
case '07':
nb='Juli';
break;
case '08':
nb='Agustus';
break;
case '09':
nb='September';
break;
case '10':
nb='Oktober';
break;
case '11':
nb='November';
break;
case '12':
nb='Desember';
break;
default :
nb='Kesalahan Tanggal';
}
return arr[2]+' '+nb+' '+arr[0];
}
}
function splitHash(a){
if(a==null){
return a;
}else{
let arr = a.split("#");
return arr;
}
}
function reloadPage(){
history.pushState("", document.title, window.location.pathname);
window.location.href='';
}
function setLocalStorage(a){}
function makeKey(){
let j = "",k = "0123456789abcdef";
for (let q = 0; q < 16; q++) {
j += k.charAt(Math.floor(Math.random() * 16));
}
return j;
}
function locStorr() {
let objLoc = {},
keys = Object.keys(localStorage),
i = keys.length;
while ( i-- ) {
objLoc[ keys[i] ] = localStorage.getItem( keys[i] );
}
return objLoc;
}
function sesStorr() {
let objSes = {},
keys = Object.keys(sessionStorage),
i = keys.length;
while ( i-- ) {
objSes[ keys[i] ] = sessionStorage.getItem( keys[i] );
}
return objSes;
}

function clearStorage(){
localStorage.clear();
sessionStorage.clear();
}
function init(){
if(checkCompat()){
let b=locStorr(),c=sesStorr();
if(!$.isEmptyObject(b.sesskey)){
let ss = JSON.stringify({s:b.sesskey});
try {
urlLoader('POST','sesscheck','json',ss).
then(function(t){
switch(t.r) {
case true:
//
break;
case false:
clearStorage();
location.reload();
break;
default:
clearStorage();
location.reload();
}
});
}
catch(err) {
$('body').html('Terjadi Kesalahan');
}
}else{
clearStorage();
document.location=h;
}
}else{
$('body').html('Browser anda tidak mendukung aplikasi');
}
}
function thelogout(){
let b=locStorr(),c=sesStorr();
if(!$.isEmptyObject(b.sesskey)){
let ss = JSON.stringify({s:b.sesskey});
try {
urlLoader('POST','logout','json',ss).
then(function(t){
location.reload();
});
}
catch(err) {
document.location='undefined';
}
}else{
clearStorage();
document.location='undefined';
}
}