var app = angular.module("app");


app.controller("forum", function ($scope, $window, $compile, $filter, $http, $cookies, $location) {

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
    $scope.Answers = [];
    $scope.comments = [];

    $scope.postQuestion = function () {
        var url = "http://localhost:3010/forum/postQuestion";
        var hpromise = $http.post(url, $scope.currentQuestion);
        hpromise.then(function (response) {
            console.log(response);
            $scope.currentQuestion.question = "";
        }).catch(function (err) {
            console.log(err);
        });
    };

    $scope.answerQuestion = function () {
        
    };
    // var inputData ={};
    $scope.hideid = true;
    $scope.hide = true;
    $scope.show = true;
    
    $scope.showAnswers = function ($event,item) {
        var id = angular.element($event.currentTarget).parent().children().last().html();
        // $scope.hide = $scope.hide === false ? true : false;
        item.hide = !item.hide;
        $scope.Answers.length=0;
        //for fetching Answers of answered question
    $scope.inputData = {"quesId":id};
    var url = "http://localhost:3010/forum/getAnswers";
    var hpromise = $http.post(url,$scope.inputData);

    hpromise.then(function (response) {
        console.log(response);
        if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.Answers.push({
                    "answer": response.data[i].answerText,
                    "ansId": response.data[i].questionId,
                    "answeredBy": response.data[i].mentorId,
                    "answeredTime": response.data[i].postedDateAns
                });

            }
        }
    }).catch(function (err) {
        console.log(err);
    });
    };

    $scope.addToAnswers = function () {

    };

    $scope.showComments = function ($event,item) {
        var aid = angular.element($event.currentTarget).parent().children().last().html();
        // $scope.show = $scope.show === false ? true : false;
        item.show = !item.show;
        $scope.comments.length=0;
        //for fetching comments of answers
        $scope.inputAnsId = {"ansId":aid};
    var url = "http://localhost:3010/forum/getComments";
    var hpromise = $http.post(url,$scope.inputAnsId);

    hpromise.then(function (response) {
        console.log(response);
        if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {

                if (response.data[i].mentorId != null) {
                    commentBy = response.data[i].mentorId;
                }
                else
                    commentBy = response.data[i].studentId;
                $scope.comments.push({
                    "comment": response.data[i].commentText,
                    "commentedBy": commentBy,
                    "ansId": response.data[i].answerId,
                    "commentedTime": response.data[i].postedDateCmt
                });
            }
        }

    }).catch(function (err) {
        console.log(err);
    });


    };

    $scope.addToComments = function () {

    };

    $scope.searchTagwise = function () {

    };

    $scope.searchDatewise = function () {

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
                for (var i = 0; i < response.data.length; i++) {
                    $scope.unansweredQuestions.push({
                        "question": response.data[i].questionText,
                        "tag": response.data[i].tag,
                        "postedBy": response.data[i].studentId,
                        "postedDate": response.data[i].postedDateQue
                    });
                }
            }
        }).catch(function (err) {
            console.log(err);
        });

        //for fetching answered questions
        //for fetching Question of answered question
        var url = "http://localhost:3010/forum/forumInitB";
        var hpromise = $http.get(url);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                $scope.answeredQuestions=response.data;
                // for (var i = 0; i < response.data.length; i++) {
                    // $scope.answeredQuestions.push({
                    //     "question": response.data[i].questionText,
                    //     "tag": response.data[i].tag,
                    //     "postedBy": response.data[i].studentId,
                    //     "postedDate": response.data[i].postedDateQue,
                    //     "qid": response.data[i].questionId
                    // });


                // }
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    // $scope.getforumUserName = function(){
    //     var type = $cookies.getObject('type');
    //     if(type==1)
    //         $scope.username=$cookies.getObject('adminUserName');
    //     if(type==2)
    //         $scope.username=$cookies.getObject('studentUserName');
    //     if(type==3)
    //         $scope.username=$cookies.getObject('mentorUserName');
    // };

}); 