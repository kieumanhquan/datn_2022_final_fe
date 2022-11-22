import { jsPDF } from "jspdf"
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('Roboto-regular-normal.ttf', font);
this.addFont('Roboto-regular-normal.ttf', 'Roboto-regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
