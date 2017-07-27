var app = angular.module("app");


app.controller("adminDisplaySpecificMarks", function($scope ,$location,$cookies,$http) {


    var marksList = [];
    $scope.marksList = marksList;


    
$scope.custom = true;
$scope.custom1 = true;
$scope.toggleMarks = function(){
    $scope.custom = $scope.custom === false ? true : false;
};

$scope.toggleData = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
};

$scope.toggleData1 = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
}

    $scope.goToForum=function(){
        $location.path("/mentorDetails");
    };

    $scope.goToMentorDetails=function(){
        $location.path("/mentorDetails");
    };

    $scope.loadAllSubjectWiseMarksForAdminLogin = function(){

        $scope.jsonObject = { "subjectName":$cookies.get('listItemClicked') }
        var url = "http://localhost:3010/admin/imarksdetails/";
        var hpromise = $http.post(url,$scope.jsonObject);
        hpromise.then(function(response) {
            console.log(response.data);

            $scope.marksList = response.data;

        }).catch(function(err) {
            console.log(err);
        });

};


 $scope.listItemClicked =function(event){
        var id = event.target.id;
        console.log(id); 
        $cookies.put('listItemClicked',id);
               $scope.loadAllSubjectWiseMarksForAdminLogin();

    };

      $scope.goHome = function(){
        $location.path("/adminHome");
    };

     $scope.performLogOut = function(){
        $cookies.remove("adminId");
        $cookies.remove("type");
        $cookies.remove("adminUserName");
        $location.path("/");
    };
$scope.addModifylistItemClicked =function(event){
        var id = event.target.id;
       if(id == '11'){
        $location.path("/adminModifyDetails");
       }else
       {
        $location.path("/adminUploadExcelSheet");

       }
    };

});