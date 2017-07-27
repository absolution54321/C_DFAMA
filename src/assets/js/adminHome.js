var app = angular.module("app");

app.controller("adminHome", function($scope,$location,$cookies,$http) {

$scope.custom = true;
$scope.custom1 = true;
$scope.ansCountObj = {};
//ARRAY FOR TEAM PERFORMANCE
  $scope.teamPerformanceList = [];
  $scope.mentorPerFormanceList = [];
  $scope.ListOfTeams=[];

$scope.myJsonPP = {
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "pie",
        backgroundColor: "#fff",
        title: {
             textAlign: 'center',
             text: "Mentor Performance"
        },
        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: "%v Points"
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
        series: [{
            text: "Mentor1",
            values: [],
            backgroundColor: "#FA6E6E #FA9494",
        }, {
            text: "Mentor2",
            values: [],
            backgroundColor: "#F1C795 #feebd2"
        }, {
            text: "Mentor3",
            values: [],
            backgroundColor: "#FDAA97 #FC9B87"
        }]
    };


$scope.myValues = [];
$scope.myObj = {
     scaleX: [{
        values: ["11","12"]
    }],
  series:[
        {
            lineColor:"#900000",
            marker:{
                backgroundColor:"#dc3737",
                borderWidth:1,
                shadow:0,
                borderColor:"#f56b6b"
            }
        },
        {
            lineColor:"#efe634",
            marker:{
                backgroundColor:"#fff41f",
                borderWidth:1,
                shadow:0,
                borderColor:"#fdffc0"
            }
        },
    ]
};


//FOR TEAM PERFORMANCE
$scope.jsonObjForTeam ={};

$scope.toggleMarks = function(){
    $scope.custom = $scope.custom === false ? true : false;
};

$scope.toggleData = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
};

$scope.toggleData1 = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
};


    $scope.goToForum=function(){
        $location.path("/mentorDetails");
    };

    $scope.goToMentorDetails=function(){
        $location.path("/mentorDetails");
    };

    $scope.listItemClicked =function(event){
        var id = event.target.id;
        console.log(id); 
        $cookies.put('listItemClicked',id);
                $location.path("/adminDisplaySpecificMarks");

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

    $scope.goHome = function(){
        $location.path("/adminHome");
    };

     $scope.performLogOut = function(){
        $cookies.remove("adminId");
        $cookies.remove("type");
        $cookies.remove("adminUserName");
        $location.path("/");
    };   



    //FOR TEAM PERFORMANCE
     $scope.myJson1 = {
      type : 'bar',
       title: {
      textAlign: 'center',
      text: "Team Performance"
    },
      scaleX:{
             values: $scope.ListOfTeams,
             itemsOverlap: true,
             item: {
                  angle:45
                  }
             },
      series : [{
        values : []
      }]
    };

    
    $scope.calculateTeamPerformance = function(){
        var url = "http://localhost:3010/mentor/calcTeamPerformance/";

        var hpromise = $http.get(url);
   
        hpromise.then(function (response) {
            console.log(response);

            
        if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                   var add = response.data[i].AJLS+response.data[i].AJMS+ response.data[i].ALS + response.data[i].AMS+response.data[i].AWLS+ response.data[i].AWMS+ response.data[i].CJLS+ response.data[i].CJMS+ response.data[i].CLS+ response.data[i].CMS+ response.data[i].DBLS+ response.data[i].DBMS+ response.data[i].DNLS+ response.data[i].DNMS+ response.data[i].OLS+ response.data[i].OMS+ response.data[i].SLS+ response.data[i].SMS;
                   $scope.teamPerformanceList.push(add);
                   $scope.ListOfTeams.push(response.data[i].teamId);         
            }
             $scope.myJson1.series[0].values = $scope.myJson1.series[0].values.concat($scope.teamPerformanceList);

         }

         
        }).catch(function (err) {
            console.log(err);
        });

        $scope.getTotalAnswers(function(){
        var url = "http://localhost:3010/mentor/getTotalAnsCount/";

        var hpromise = $http.get(url);
   
        hpromise.then(function (response) {
            console.log(response);

            
        if (response.data.length > 0) {
            $scope.ansCountObj = response.data;
        }}).catch(function (err) {
            console.log(err);
        })
        });
        $scope.calculateMentorPerformance();
        $scope.calculateClassPerformance();

    }

      
    $scope.calculateMentorPerformance = function(){
        var url = "http://localhost:3010/mentor/calcMentorPerformance/";

        var hpromise = $http.get(url);
   
        hpromise.then(function (response) {
            console.log(response);

            
        if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                   var add= response.data[i].INTERACTION + response.data[i].PACE+ response.data[i].RESPONSE+ response.data[i].SESSIONS+response.data[i].COMM+response.data[i].EXP; 
                   var k=0;
                   for(k=0;k<$scope.ansCountObj.length;k++){
                       if($scope.ansCountObj.mentorId == response.data[i].mentorId ){
                           add = add+ $scope.ansCountObj.COUNT;
                       } 
                   }
                   $scope.mentorPerFormanceList.push(add);
                   $scope.myJsonPP.series[i].values = $scope.myJsonPP.series[i].values.concat(add);
         }
       //  $scope.myJson2.series[0].values = $scope.myJson2.series[0].values.concat($scope.mentorPerFormanceList);
        }
        }).catch(function (err) {
            console.log(err);
        });
    };

    $scope.calculateClassPerformance= function(){
         var url = "http://localhost:3010/mentor/calcClsPerformance/";

        var hpromise = $http.get(url);
   
        hpromise.then(function (response) {
            console.log(response);

            
        if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                   var add = response.data[i].AJLS+response.data[i].AJMS+ response.data[i].ALS + response.data[i].AMS+response.data[i].AWLS+ response.data[i].AWMS+ response.data[i].CJLS+ response.data[i].CJMS+ response.data[i].CLS+ response.data[i].CMS+ response.data[i].DBLS+ response.data[i].DBMS+ response.data[i].DNLS+ response.data[i].DNMS+ response.data[i].OLS+ response.data[i].OMS+ response.data[i].SLS+ response.data[i].SMS;
                   $scope.teamPerformanceList.push(add);
                   $scope.ListOfTeams.push(response.data[i].teamId);         
            }
             $scope.myJson1.series[0].values = $scope.myJson1.series[0].values.concat($scope.teamPerformanceList);

         }

         
        }).catch(function (err) {
            console.log(err);
        });
            
    }

});