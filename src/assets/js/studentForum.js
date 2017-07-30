var app = angular.module("app");


app.controller("studentForum", function ($scope,$anchorScroll, $window, $compile, $filter, $http, $cookies, $location) {

    $scope.goToRespHomePage = function () {
        var type = $cookies.getObject('type');
        if (type == 1)
            $location.path("/adminHome");
        if (type == 2)
            $location.path("/studentHome");
        if (type == 3)
            $location.path("/mentorHome");
    };
    $scope.backToTop = function() {
    $location.hash('scrollToDivID');
    $anchorScroll();
    };
$scope.backToTop2 = function() {
    $location.hash('scrollToDivID2');
    $anchorScroll();
    };
    $scope.currentQuestion = {};
    $scope.unansweredQuestions = [];
    $scope.answeredQuestions = [];
    $scope.Answers = {};
    $scope.comments = [];
    $scope.answeredQuestionsAnswers = [];
    $scope.username = $cookies.get('studentUserName');

    $scope.postQuestion = function () {
        console.log($scope.currentQuestion.contentQue.length);
        if($scope.currentQuestion.contentQue.length <1000 && $scope.currentQuestion.contentQue.length > 0){
            if($scope.currentQuestion.tag){
                $scope.currentQuestion.studentId=$cookies.getObject('studentId');
                $scope.currentQuestion.postedDate=new Date();
            $scope.jsonObj = {
            "contentQue": $scope.currentQuestion.contentQue,
            "tag": $scope.currentQuestion.tag,
            "studentid": $scope.currentQuestion.studentId,
            "postedDate":$scope.currentQuestion.postedDate
        }
        var url = "http://localhost:3010/forum/postQuestion"
        var hpromise = $http.post(url, $scope.jsonObj);
        hpromise.then(function (response) {
            console.log(response);
            if(response.data.affectedRows>0){
                 $scope.forumInit();
                $scope.unansweredQuestions.push($scope.currentQuestion);
               
                alert("Question posted successfully....");
                console.log($scope.currentQuestion);
    //             $scope.currentQuestion.contentQue = "";
    //    $scope.currentQuestion.tag = "";     
            }; 
        }).catch(function (err) {
            console.log(err);
            alert("Some error to post question");
        });     
        }
} 
    else{
        alert("You have exceeded character limit....");
    };    
    };

    $scope.answerQuestion = function () {
        if ($scope.Answers.answerText) {
            $scope.jsonObj = {
                "qid": $scope.Answers.id,
                "answer": $scope.Answers.answerText,
                "mentorId": $cookies.get('mentorId'),
                "postedDate": new Date()
            }

            console.log($scope.Answers.answerText);

            var url = "http://localhost:3010/forum/furtherAnswers"

            var hpromise = $http.post(url, $scope.jsonObj);

            hpromise.then(function (response) {

                console.log(response.data);

            }).catch(function (err) {
                console.log(err);
            });
            $scope.answeredQuestionsAnswers.push($scope.Answers);
        }
        else {
            alert("Write something before posting");
        }

    };

    $scope.hideid = true;
    $scope.hide = true;
    $scope.show = true;



    $scope.performLogOut = function () {
        $cookies.remove("studentId");
        $cookies.remove("type");
        $cookies.remove("studentUserName");
        $location.path("/");
    };

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

    $scope.forumInit = function () {
        //for fetching unanswered questions
        $scope.unansweredQuestions.length = 0;
        $scope.answeredQuestionsAnswers.length = 0;
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

    $scope.firstAnswerQuestion = function () {

        $scope.jsonObj = {
            "qId": $scope.Answers.id,
            "qCont": $scope.Answers.answerText,
            "mentorId": $cookies.get('mentorId')
        };

        var url = "http://localhost:3010/forum/firstAnswer";
        var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {

                console.log(response.data);
            }

        }).catch(function (err) {
            console.log(err);
        });

    };

}); 
