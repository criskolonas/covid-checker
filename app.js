async function getCovidData(country,callback){  
    const covid_url = 'https://api.covid19api.com/total/country/'+country+'?from=2020-01-22T00:00:00Z&to=2020-08-01T00:00:00Z';
    const response = await fetch(covid_url);
    const data = await response.json();
  
    return data;
}


function makeData(data){
    var x_val=[];
    var y_val=[];
    let temp = 0
    for(let day in data){
        x_val.push(simplifyDate(data[day].Date));
        y_val.push(data[day].Confirmed-temp);
        temp=data[day].Confirmed;
        console.log(temp);
    }
    
    return [x_val,y_val]
}

function simplifyDate(date){
    return date.substr(0,10);
}



document.getElementById("sbtn").onclick = async ()=>{
  var country = document.getElementById("country").value;
  var data = await getCovidData(country);
  const [x_val,y_val] = makeData(data);
  var ctx = document.getElementById("myChart").getContext("2d");
  var myLineChart = new Chart(ctx);
  var config = {
        type: 'line',
        data: {
          labels: x_val,
          datasets: [{
              borderColor: "#3e95cd",
              data:y_val,
              label:data[0].Country,
              fill:false
            }
          ]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                  ticks: {
                      padding: 0
                  }
              }], 
          },
          title: {
            display: true,
            text: 'Confirmed Covid-19 Cases by Day'
          }
        }
      };
    let canvas = document.getElementById("myChart")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myLineChart.destroy();
    myLineChart = new Chart(ctx,config);
    
    
    
};
