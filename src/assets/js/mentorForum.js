var app = angular.module("app");


app.controller("mentorForum", function ($scope,$anchorScroll,$window, $compile, $filter, $http, $cookies, $location) {
$scope.custom = true;
    $scope.custom1 = true;
    $scope.custom2 = true;
    $scope.custom3 = true;
    $scope.goToRespHomePage = function () {
        var type = $cookies.getObject('type');
        if (type == 1)
            $location.path("/adminHome");
        if (type == 2)
            $location.path("/studentHome");
        if (type == 3)
            $location.path("/mentorHome");
    };

    $scope.currentQuestion = {};
    $scope.unansweredQuestions = [];
    $scope.answeredQuestions = [];
    $scope.Answers = {};
    $scope.comments = [];
    $scope.answeredQuestionsAnswers = [];
    $scope.username = $cookies.get('mentorUserName');

    $scope.backToTop = function() {
    $location.hash('scrollToDivID');
    $anchorScroll();
    };
$scope.backToTop2 = function() {
    $location.hash('scrollToDivID2');
    $anchorScroll();
    };

    $scope.answerQuestion = function ($event) {
        $scope.Answers.questionId = angular.element($event.currentTarget).parent().prev().children().last().html();
        console.log($scope.Answers.id1);
        console.log("----------------");
        if($scope.Answers.contentAns.length<1500 && $scope.Answers.contentAns.length>0){
            $scope.Answers.mentorId=$cookies.get('mentorId');
            $scope.Answers.postedDate=new Date();
        $scope.jsonObj = {
            "qid": $scope.Answers.questionId,
            "answer": $scope.Answers.contentAns,
            "mentorId": $scope.Answers.mentorId,
            "postedDate":$scope.Answers.postedDate
        }

        console.log($scope.Answers.id1);

        var url = "http://localhost:3010/forum/furtherAnswers"

        var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            if (response.data.affectedRows > 0) {
                $scope.custom3=false;
                console.log(response.data);
                
            }
           
        }).catch(function (err) {
            console.log(err);
             
        });
        
        $scope.answeredQuestionsAnswers.push($scope.Answers);
      
        }
    else{
        $scope.custom2=false;
    }
 
    };
$scope.hiddenDiv = false;
$scope.hiddenAnswers = false;
$scope.hiddenAnsPost = false;

    $scope.firstAnswerQuestion = function ($event) {
$scope.Answers.questionId = angular.element($event.currentTarget).parent().prev().children().last().html();
        console.log($scope.Answers.id1);
        console.log("----------------");
        if($scope.Answers.contentAns.length>0 && $scope.Answers.contentAns.length<1500){
            $scope.Answers.mentorId=$cookies.get('mentorId');
            $scope.Answers.postedDate=new Date();
        $scope.jsonObj = {
            "qId": $scope.Answers.questionId,
            "qCont": $scope.Answers.contentAns,
            "mentorId": $scope.Answers.mentorId,
            "postedDate":$scope.Answers.postedDate
        };

        var url = "http://localhost:3010/forum/firstAnswer";
        var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.affectedRows > 0) {
              $scope.custom1=false;
                console.log(response.data);
           
                $scope.answeredQuestionsAnswers.push($scope.Answers);
        
            }

        }).catch(function (err) {
            console.log(err);
           
        });
      
        }
    else{
        $scope.custom=false;
    };
   
    };
    // var inputData ={};
    $scope.hideid = true;
    $scope.hide = true;
    $scope.show = true;

    $scope.searchTagwise = function ($event) {
        $scope.search.tag = angular.element($event.currentTarget).parent().parent().prev().val();
        $scope.answeredQuestions.length=0;
        $scope.unansweredQuestions.length=0;
        $scope.answeredQuestionsAnswers.length=0;

        //for fetching unanswered questions
        $scope.jsonObj = {
            "tag": $scope.search.tag
        };
        
        if($scope.search.tag =! ""){
            console.log($scope.search.tag);
            
            var url = "http://localhost:3010/forum/searchTagA";

           var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                 $scope.unansweredQuestions = response.data;
                console.log(response.data);
            }
        }).catch(function (err) {
            console.log(err);
        });

        var url = "http://localhost:3010/forum/searchTagB";

           var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                 $scope.answeredQuestions = response.data;
                console.log(response.data);
            }
        }).catch(function (err) {
            console.log(err);
        });

        var url = "http://localhost:3010/forum/searchTagC";
        var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                $scope.answeredQuestionsAnswers = response.data;

                console.log(response.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
        }
        else {
            $scope.forumInit();
        }
    };

    $scope.performLogOut = function () {
        $cookies.remove("studentId");
        $cookies.remove("type");
        $cookies.remove("studentUserName");
        $location.path("/");
    };

    $scope.forumInit = function () {
        //for fetching unanswered questions

        var url = "http://localhost:3010/forum/forumInitA";
        var hpromise = $http.get(url);

        hpromise.then(function (response) {
            console.log(response);

            if (response.data.length > 0) {
                $scope.unansweredQuestions = response.data;
            }
        }).catch(function (err) {
            console.log(err);
        });

        // new try in forum
        var url = "http://localhost:3010/forum/forumInitB";
        var hpromise = $http.get(url);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                $scope.answeredQuestions = response.data;

                console.log(response.data);
            }

        }).catch(function (err) {
            console.log(err);
        });

        //for fetching answered questions
        //for fetching Question of answered question
        var url = "http://localhost:3010/forum/forumInitC";
        var hpromise = $http.get(url);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                $scope.answeredQuestionsAnswers = response.data;

                console.log(response.data);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };

    

}); 