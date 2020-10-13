async function getCovidData(country){  
    const covid_url = 'https://api.covid19api.com/total/country/'+country;
    const response = await fetch(covid_url);
    const data = await response.json();
    const [x_val,y_val] = makeData(data);
    console.log(x_val);
    console.log(y_val);

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


function makeData(data){
    var x_val=[];
    var y_val=[];

    for(let day in data){
        x_val.push(data[day].Date);
        y_val.push(data[day].Confirmed);
    }
    
    return [x_val,y_val]
}

var btn = document.getElementById("sbtn");
btn.onclick = ()=>{
    var inp = document.getElementById("country");
    getCovidData(inp.value);
    
};
