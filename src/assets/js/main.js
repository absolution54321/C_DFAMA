var app = angular.module("app", ["ngRoute", "ngCookies", "zingchart-angularjs"]); // [] Dependency


app.config(function ($routeProvider) {

    $routeProvider.otherwise("/");

    $routeProvider.when("/", {
        "templateUrl": "./src/views/login.html",
        "controller": "login"
    });


    //MENTOR RELATED ROUTES
    $routeProvider.when("/mentorHome", {
        "templateUrl": "./src/views/mentorHome.html",
        "controller": "mentorHome"
    });

    $routeProvider.when("/mentorAgenda", {
        "templateUrl": "./src/views/mentorAgenda.html",
        "controller": "mentorAgenda"
    });

    $routeProvider.when("/teamPerformance", {
        "templateUrl": "./src/views/TeamPerformance.html",
        "controller": "teamPerformance"
    });


    // Student Related Routes
    $routeProvider.when("/studentHome", {
        "templateUrl": "./src/views/studentHome.html",
        "controller": "studentHome"
    });

    $routeProvider.when("/studentMarksTable", {
        "templateUrl": "./src/views/studentMarksTable.html",
        "controller": "studentMarksTable"
    });

    $routeProvider.when("/studentAgenda", {
        "templateUrl": "./src/views/studentAgenda.html",
        "controller": "studentAgenda"
    });

    $routeProvider.when("/studentFeedbackForm", {
        "templateUrl": "./src/views/studentFeedbackForm.html",
        "controller": "studentFeedbackForm"
    });

    //ADMIN RELATED ROUTES 
    $routeProvider.when("/adminHome", {
        "templateUrl": "./src/views/adminHome.html",
        "controller": "adminHome"
    });

    $routeProvider.when("/mentorDetails", {
        "templateUrl": "./src/views/mentorDetails.html",
        "controller": "mentorDetails"
    });

    $routeProvider.when("/adminDisplaySpecificMarks", {
        "templateUrl": "./src/views/adminDisplaySpecificMarks.html",
        "controller": "adminDisplaySpecificMarks"
    });

    $routeProvider.when("/adminModifyDetails", {
        "templateUrl": "./src/views/adminModifyDetails.html",
        "controller": "adminModifyDetails"
    });

    $routeProvider.when("/adminUploadExcelSheet", {
        "templateUrl": "./src/views/adminUploadExcelSheet.html",
        "controller": "adminUploadExcelSheet"
    });


    //DEMO PURPOSE
    $routeProvider.when("/studentHome", {
        "templateUrl": "./src/views/studentHome.html",
        "controller": "studentHome"
    });

    //ABOUT US
    $routeProvider.when("/aboutUs", {
        "templateUrl": "./src/views/aboutUs.html",
        "controller": "aboutUs"
    });

    //Forum route
    $routeProvider.when("/forum", {
        "templateUrl": "./src/views/forum.html",
        "controller": "forum"
    });


});

app.run(function ($location, $rootScope, $cookies, $http, $window) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        console.log(new Date());
        var adminId = $cookies.getObject('adminId');
        var studentId = $cookies.getObject('studentId');
        var mentorId = $cookies.getObject('mentorId');
        var type = $cookies.getObject('type');

        console.log($window.location.href == 'http://localhost:3000/#!/mentorHome');

        if ($window.location.href == 'http://localhost:3000/#!/adminHome'
                || $window.location.href == 'http://localhost:3000/#!/mentorDetails'
                || $window.location.href == 'http://localhost:3000/#!/adminDisplaySpecificMarks'
                || $window.location.href == 'http://localhost:3000/#!/adminDisplaySpecificMarks'
                || $window.location.href == 'http://localhost:3000/#!/adminModifyDetails'
                || $window.location.href == 'http://localhost:3000/#!/adminUploadExcelSheet') {
            if (adminId == undefined) {
                if (type == 2) {
                    $location.path("/studentHome");
                }
                else if (type == 3) {
                    $location.path("/mentorHome");
                }


            }
        }

        if ($window.location.href == 'http://localhost:3000/#!/studentHome'
            || $window.location.href == 'http://localhost:3000/#!/studentMarksTable'
            || $window.location.href == 'http://localhost:3000/#!/studentAgenda'
            || $window.location.href == 'http://localhost:3000/#!/studentFeedbackForm') {
            if (studentId == undefined) {
                if (type == 1) {
                    $location.path("/adminHome");
                }
                else if (type == 3) {
                    $location.path("/mentorHome");
                }


            }
        }

        if ($window.location.href == 'http://localhost:3000/#!/mentorHome'
            || $window.location.href == 'http://localhost:3000/#!/mentorAgenda'
            || $window.location.href == 'http://localhost:3000/#!/teamPerformance') {
            if (mentorId == undefined) {
                if (type == 1) {
                    $location.path("/adminHome");
                }
                else if (type == 2) {
                    $location.path("/studentHome");
                }


            }
        }

        if (adminId == undefined && studentId == undefined && mentorId == undefined) {
            $location.path("/");
        }

        if($window.location.href == 'http://localhost:3000/#!/')
            {
                if(adminId != undefined)
                    {
                        $location.path("/adminHome");
                    }
                if(studentId != undefined)
                    {
                        $location.path("/studentHome");
                    }
                if(mentorId != undefined)
                    {
                        $location.path("/mentorHome");
                    }
            }
    });
});