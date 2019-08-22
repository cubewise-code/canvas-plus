app.controller('NamedMdxCtrl',  ['$scope',  '$rootScope', '$log', '$tm1Ui','$localStorage','$window', '$timeout', '$location',
function($scope,  $rootScope, $log, $tm1Ui, $localStorage, $window, $timeout, $location) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {};
    $scope.selections = {};
    $scope.lists = {};
    $scope.values = {};
    
    $rootScope.cubeView = '';
    $rootScope.pageTitle = "Super Named MDX ";
    $scope.cubeNUrlValue = decodeURI($location.search()['cubeName']); 
    $scope.mdxIdUrlValue = decodeURI($location.search()['mdxId']); 
    if($scope.mdxIdUrlValue != null && $scope.mdxIdUrlValue != 'undefined'     ){
  //console.log($scope.cubeNameUrlValue, "URL VALUES TRACKED" )
        $rootScope.mdxId  = $scope.mdxIdUrlValue; 
        
    }else{
        $rootScope.mdxId = "Data Entry"
    }
    if($scope.cubeNUrlValue  != null && $scope.cubeNUrlValue != 'undefined'){
         
        $rootScope.cubeName = decodeURI($location.search()['cubeName']);
    }else{
        $rootScope.cubeName = "General Ledger" 
    }

    

     
    $rootScope.mdxString = "SELECT {[Period].[Year], [Period].[Jan], [Period].[Feb], [Period].[Mar], [Period].[Apr], [Period].[May], [Period].[Jun], [Period].[Jul], [Period].[Aug], [Period].[Sep], [Period].[Oct], [Period].[Nov], [Period].[Dec]} ON COLUMNS, {TM1DRILLDOWNMEMBER( {[Account].[Net Income]}, ALL, RECURSIVE )} ON ROWS FROM ["+$rootScope.cubeName+"] WHERE ([Year].&[2018], [Region].&[England], [General Ledger Measure].&[Amount], [Currency].&[Local], [Version].&[Budget], [Department].&[Corporate])" 
    $rootScope.useMdx = false;
    $rootScope.useDbr = false;
    $rootScope.useMdxNow = false; 
    $rootScope.showView = true; 
    $rootScope.dimName = [];
    //$rootScope.calendarShow = true ;
     
    $rootScope.attributeOptions = {"alias": {"Year":"Financial Year","Region":"Description" ,"Account": 'Description', "Period": 'Short Description', "Department": 'Description', "Product":"Code&Description", "Version": 'Caption_Default', "Employee": 'Full Name'} }
    $scope.startAllFiltersAreHere = function(){
        $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

        //console.log($rootScope.mdxParameters);
    }
    $scope.read = function(workbook){
  //console.log('do read', workbook);

    }
    $scope.$watch(function () {
        return $rootScope.selections.year;
        
        }, function (newValue, oldValue) { 
            if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
             //console.log(newValue, "mdx attributes changed inside directive");
              
             $rootScope.mdxParameters =  {parameters: {Year:newValue, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

            }
                    
        })
        $scope.$watch(function () {
            return $rootScope.selections.region;
            
            }, function (newValue, oldValue) { 
                if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
               //  console.log(newValue, "mdx attributes changed inside directive");
                  
                 $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:newValue, Department:$rootScope.selections.department}}
    
                }
                        
            })
            $scope.$watch(function () {
                return $rootScope.selections.department;
                
                }, function (newValue, oldValue) { 
                    if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
                 //    console.log(newValue, "mdx attributes changed inside directive");
                      
                     $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:$rootScope.selections.region, Department:newValue}}
        
                    }
                            
                })

              
}]);
app.directive('ngRightClick', ['$parse', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
}]);


app.directive('dragSelect', ['$window','$document', function ($window, $document) {
    return {
        scope: {
            dragSelectIds: '='
        },
        controller: function ($scope, $element) {
            var cls = 'eng-selected-item';
            var startCell = null;
            var isRemoving = false;
            var dragging = false;
            var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

            function mouseUp(el) {
                dragging = false;
                // Select or deselect the all class switchers

                // Make sure that headers are not selected for weekdays
                for (var k = 0; k < weekdays.length; k++) {
                    var count_selected = 0;
                    for (i = 0; i < 11; i++) {
                        var id = weekdays[k] + "-" + i;
                        if (document.getElementById(id).classList.contains(cls)) {
                            count_selected = count_selected + 1
                        };

                    }
                    if (count_selected === 11) {
                        var id = weekdays[k] + "-all";

                        document.getElementById(id).classList.add(cls);
                    } else {
                        var id = weekdays[k] + "-all";
                        document.getElementById(id).classList.remove(cls);
                    };
                }

                // Make sure that headers are not selected for hours
                for (i = 0; i < 11; i++) {
                    var count_selected = 0;
                    for (var k = 0; k < weekdays.length; k++) {
                        var id = weekdays[k] + "-" + i;
                        if (document.getElementById(id).classList.contains(cls)) {
                            count_selected = count_selected + 1
                        };

                    }
                    if (count_selected === 7) {
                        var id = "hour-" + i;
                        document.getElementById(id).classList.add(cls);
                    } else {
                        var id = "hour-" + i;
                        document.getElementById(id).classList.remove(cls);
                    }


                }


            }

            function mouseDown(el) {
                dragging = true;
                setStartCell(el);
                setEndCell(el);
            }



            function setStartCell(el) {
                startCell = el;
                // (1) determine if we're removing or adding based on the start cell
                isRemoving = el.hasClass(cls);
            }

            function mouseEnter(el) { if (!dragging) return; setEndCell(el); }


            function setEndCell(el) {

                // Code for Monday
                var day_of_week = "mon";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 24; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                var day_of_week = "tue";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                var day_of_week = "wed";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                var day_of_week = "thu";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                var day_of_week = "fri";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 24; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                var day_of_week = "sat";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                var day_of_week = "sun";
                if (el.attr('id') === day_of_week + "-all") {
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < 11; i++) {
                            var id = day_of_week + "-" + i;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };
                    }

                };

                // Code for hours

                if (el.attr('id').startsWith("hour")) {
                    var hour = el.attr('id').split("-")[1];
                    console.log(hour);
                    // If highlighted true
                    if (el.hasClass(cls) === true) {
                        var i;
                        for (i = 0; i < weekdays.length; i++) {
                            var id = weekdays[i] + "-" + hour;
                            document.getElementById(id).classList.remove(cls);
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            $scope.dragSelectIds.splice(elIndex, 1)

                        };

                    }
                    /// If highlighted false
                    if (el.hasClass(cls) === false) {
                        var i;
                        for (i = 0; i < weekdays.length; i++) {
                            var id = weekdays[i] + "-" + hour;
                            var elIndex = $scope.dragSelectIds.indexOf(id);
                            document.getElementById(id).classList.add(cls);
                            elIndex === -1 && $scope.dragSelectIds.push(id);
                        };

                    }

                }

                if (el.hasClass(cls)) { // if added then remove on click
                    el.removeClass(cls);
                    var elIndex = $scope.dragSelectIds.indexOf(el[0].id);
                    elIndex !== -1 && $scope.dragSelectIds.splice(elIndex, 1)
                    // (2) don't return here
                    // return false; 
                }
                if (!$scope.dragSelectIds) {
                    $scope.dragSelectIds = [];
                }
                
                // (3) remove or add each element here
                $(cellsBetween(startCell, el)).each(function(i, elem) {
                    if (isRemoving)
                      removeElement($(elem));
                    else 
                      addElement($(elem));
                });


            }

            function removeElement(el) {
              el.removeClass(cls);
              var elIndex = $scope.dragSelectIds.indexOf(el[0].id);
              elIndex !== -1 && $scope.dragSelectIds.splice(elIndex, 1)
            }
            
            function addElement(el) {
              el.addClass(cls);
              var elIndex = $scope.dragSelectIds.indexOf(el[0].id);
              elIndex === -1 && $scope.dragSelectIds.push(el.attr('id'));
            }

            function rectangleSelect(selector, x1, x2, y1, y2) {
                var elements = [];
                jQuery(selector).each(function () {
                    var $this = jQuery(this);
                    var offset = $this.offset();
                    var x = offset.left;
                    var y = offset.top;
                    var w = $this.width();
                    var h = $this.height();

                    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                        // this element fits inside the selection rectangle
                        elements.push($this.get(0));
                    }
                });
                return elements;
            }

            function allCells(start, end) {
              console.log('start, end', start, end);
            }

            function cellsBetween(start, end) {

                var bounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
                bounds.minX = $window.Math.min($(start).offset().left, $(end).offset().left);
                bounds.minY = $window.Math.min($(start).offset().top, $(end).offset().top);
                bounds.maxX = $window.Math.max($(end).offset().left + $(end).width(), $(start).offset().left + $(start).width());
                bounds.maxY = $window.Math.max($(end).offset().top + $(end).height(), $(start).offset().top + $(start).height());

                var initiallySelectedTds = rectangleSelect("td", bounds.minX, bounds.maxX, bounds.minY, bounds.maxY);

                for (var i = 0; i < initiallySelectedTds.length; i++) {
                    if ($(initiallySelectedTds[i]).offset().left < bounds.minX)
                        bounds.minX = $(initiallySelectedTds[i]).offset().left;
                    if ($(initiallySelectedTds[i]).offset().left + $(initiallySelectedTds[i]).width() > bounds.maxX)
                        bounds.maxX = $(initiallySelectedTds[i]).offset().left + $(initiallySelectedTds[i]).width();
                    if ($(initiallySelectedTds[i]).offset().top < bounds.minY)
                        bounds.minY = $(initiallySelectedTds[i]).offset().top;
                    if ($(initiallySelectedTds[i]).offset().top + $(initiallySelectedTds[i]).height() > bounds.maxY)
                        bounds.maxY = $(initiallySelectedTds[i]).offset().top + $(initiallySelectedTds[i]).height();
                }
                return rectangleSelect("td", bounds.minX, bounds.maxX, bounds.minY, bounds.maxY);

            }


            function wrap(fn) {
                return function () {
                    var el = angular.element(this);
                    $scope.$apply(function () {
                        fn(el);
                    });
                }
            }

            $element.delegate('td', 'mousedown', wrap(mouseDown));
            $element.delegate('td', 'mouseenter', wrap(mouseEnter));
            $document.delegate('body', 'mouseup', wrap(mouseUp));
        }
    }
}]);