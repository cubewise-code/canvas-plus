// Dependencies
var system = require('system'),
    webpage = require('webpage'),
	fs = require('fs');

//Arguments
var domain = system.args[1];
var sessionId = system.args[2];
var url = system.args[3];
var outputPath = system.args[4];
var pageOrientation = system.args[5];
var pageSize = system.args[6];
var dpi = parseInt(system.args[7]);
var pageCheckAttempt = parseInt(system.args[8]);
	
var pdfViewportWidth,
    pdfViewportHeight,
    cmToInchFactor = 0.393701,
    widthInInches,
    heightInInches,
    temp;

switch(pageSize){
	case 'LETTER':
	default:
		widthInInches = 8.5;
		heightInInches = 11;
		break;
	case 'LEGAL':
		widthInInches = 8.5;
		heightInInches = 14;
		break;
	case 'A3':
		widthInInches = 11.69
		heightInInches = 16.54;
		break;
	case 'A4':
		widthInInches = 8.27;
		heightInInches = 11.69;
		break;
	case 'A5':
		widthInInches = 5.83;
		heightInInches = 8.27;
		break;
	case 'TABLOID':
		widthInInches = 11;
		heightInInches = 17;
		break;
}

//reduce by the margin (assuming 1cm margin on each side)
widthInInches-= 2*cmToInchFactor;
heightInInches-= 2*cmToInchFactor;

//interchange if width is equal to height
if(pageOrientation === 'Landscape'){
	temp = widthInInches;
	widthInInches = heightInInches;
	heightInInches = temp;
}

//calculate corresponding viewport dimension in pixels
pdfViewportWidth = dpi*widthInInches;
pdfViewportHeight = dpi*heightInInches;

if (url) {

  var page = webpage.create();
  
  page.onError = function (msg, trace) {
		console.log(msg);
		trace.forEach(function(item) {
			console.log('  ', item.file, ':', item.line);
		});
	};
	
  phantom.addCookie({
	  'name'     : 'APPBASESESSIONID',
	  'value'    : sessionId,
	  'domain'   : domain,
	  'path'     : '/'
  });
  
  // paper size
  page.paperSize = {  format: pageSize,  orientation: pageOrientation, margin: '1cm' };

  // Set viewport
  page.viewportSize = {
    width: pdfViewportWidth,
    height: pdfViewportHeight
  };
  
  //fs.write('C:\\CWAS\\webapps\\samples\\WEB-INF\\print\\scripts\\settings.txt', JSON.stringify(page.paperSize) + '\n', 'a');
  //fs.write('C:\\CWAS\\webapps\\samples\\WEB-INF\\print\\scripts\\settings.txt', JSON.stringify(page.viewportSize) + '\n', 'a');
  
  if(url.indexOf("?") > -1){
	  url += "&print";
  }
  else {
	  url += "?print";
  }

  page.open(url, function(status) {
	  
	var attempts = 0;

    function checkPageReady() {

      // Evaluate page
      var isReady = page.evaluate(function() {
        var content = document.getElementById("page-status");
        if (content.textContent == "READY"){
          return true;
        }
      });

      // Output HTML if defined and exit
      if (isReady) {
    	  setTimeout(function(){
    		  page.render(outputPath, {format: 'pdf', quality: '100'});
              phantom.exit();
    	  }, 500);
      }
      else if (attempts < pageCheckAttempt) {
        attempts++;
        // Try again
        setTimeout(checkPageReady, 100);
      } else {
    	// Break if too many attempts were made
        console.error('Failed to wait for the requested page to load');
        phantom.exit();
      }
    }
  
    if (status === 'success') {
		window.setTimeout(function () {
			checkPageReady();
        }, 1000);  
    } else {
      // Otherwise, if page cannot be found, exit
      phantom.exit();
    }
	
  });
}