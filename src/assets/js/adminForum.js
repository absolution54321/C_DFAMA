var app = angular.module("app");


app.controller("adminForum", function ($scope,$anchorScroll,$window, $compile, $filter, $http, $cookies, $location) {

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
<<<<<<< HEAD
    $scope.username = $cookies.get('adminUserName');
=======
    $scope.username = $cookies.get('mentorUserName');
>>>>>>> b4e7b29f79a86d7e1059edfffdc6612c3fd6ad2b

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
        if($scope.Answers.contentAns){
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

                console.log(response.data);
                alert("Your answer is posted successfully...");
            }
            else alert("Some error occurred to post answer");

        }).catch(function (err) {
            console.log(err);
             
        });
        $scope.answeredQuestionsAnswers.push($scope.Answers);
        $scope.forumInit();
        }
    else{
        alert("Write something before posting");
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
                $scope.forumInit();
                console.log(response.data);
                alert("Your answer is posted successfully...");
                $scope.answeredQuestionsAnswers.push($scope.Answers);
         $scope.forumInit();
            }

        }).catch(function (err) {
            console.log(err);
            alert("Some error occurred to post answer");
        });
        $scope.forumInit();
        }
    else{
        alert("You have exceeded character limit...");
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
        
<<<<<<< HEAD
        if($scope.search.tag!=""){
=======
        if($scope.search.tag){
>>>>>>> b4e7b29f79a86d7e1059edfffdc6612c3fd6ad2b
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
<<<<<<< HEAD
            $scope.forumInit();
=======
            alert("select tag before searching");
>>>>>>> b4e7b29f79a86d7e1059edfffdc6612c3fd6ad2b
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