async function getCovidData(country,callback){  
    const covid_url = 'https://api.covid19api.com/total/country/'+country;
    const response = await fetch(covid_url);
    const data = await response.json();
  
    return data;
}


function makeData(data){
    var x_val=[];
    var y_val=[];
    for(let day in data){
        x_val.push(data[day].Date);
        y_val.push(data[day].Confirmed);
    }
    
    return [x_val,y_val]
}

function makeChart(x_val,y_val,data){
    var ctx = document.getElementById('myChart').getContext('2d');
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
          title: {
            display: true,
            text: 'Confirmed Covid-19 Cases by Day'
          }
        }
      };

    var myLineChart = new Chart(document.getElementById("myChart"),config);
}

document.getElementById("sbtn").onclick = async ()=>{
    var inp = document.getElementById("country");
    var data = await getCovidData(inp.value);
    const [x_val,y_val] = makeData(data);
    makeChart(x_val,y_val,data);
};;
