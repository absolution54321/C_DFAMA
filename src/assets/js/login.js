var app = angular.module("app");

app.controller("login", function($scope, $location, $http, $cookies) {

  $scope.data={};
  //console.log(data.user);

  $scope.clicked = function()
  {
    console.log($scope.data);
    $scope.jsonObject = {
                          "UserId":$scope.data.user,
                          "UserPwd": $scope.data.pwd,
                          "UserType":$scope.data.result
                         };
        
        var url = "http://localhost:3010/";
        var hpromise = $http.post(url, $scope.jsonObject);
        
        hpromise.then(function(response) 
        {

        //    console.log(response.data[0].mentorId);
            //console.log(response.data[0].mentorId);
            //routing according to login
              if(response.data.length>0)
              {
                  if($scope.data.result==1)
                  {
                    $location.path("/adminHome");

                    $cookies.put('adminId', response.data[0].adminId);
                    $cookies.put('type', $scope.data.result);
                    $cookies.put('adminUserName', response.data[0].adminUsername);

                  }
                  else if($scope.data.result==2)
                  {
                    $location.path("/studentHome");
                    
                    $cookies.put('studentId', response.data[0].studentId);
                    $cookies.put('type', $scope.data.result);
                    $cookies.put('studentUserName', response.data[0].studentUsername);
                    console.log($cookies);

                  }
                  else if($scope.data.result==3)
                  {
                    $location.path("/mentorHome");
       
                    $cookies.put('mentorId', response.data[0].mentorId);
                    $cookies.put('type', $scope.data.result);
                    $cookies.put('mentorUserName', response.data[0].mentorUsername);
                  }
              }
              else
              {
                alert("Invalid Credentials");
              }
        }).catch(function(err) 
            {
              console.log(err);
            });        
 };  

});