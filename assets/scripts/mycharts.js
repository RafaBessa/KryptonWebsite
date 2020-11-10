
P_dict = {'INTJ':['Analista','Arquiteto'],
'INTP':['Analista','Lógico'],
'ENTJ':['Analista','Comandante'],
'ENTP':['Analista','Inovador'],

'INFJ':['Diplomata','Advogado'],
'INFP':['Diplomata','Mediador'],
'ENFJ':['Diplomata','Protagonista'],
'ENFP':['Diplomata','Ativista'],

'ISTJ':['Sentinela','Logístico'],
'ISFJ':['Sentinela','Defensor'],
'ESTJ':['Sentinela','Executivo'],
'ESFJ':['Sentinela','Cônsul'],

'ISTP':['Explorador','Virtuoso'],
'ISFP':['Explorador','Aventureiro'],
'ESTP':['Explorador','Empresário'],
'ESFP':['Explorador','Animador']
}


function processData(allText) {
    var record_num = 7;  // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var lines = [];

    var headings = entries.splice(0,record_num);
    while (entries.length>0) {
        var tarr = [];
        for (var j=0; j<record_num; j++) {
            tarr.push(headings[j]+":"+entries.shift());
        }
        lines.push(tarr);
    }
    console.log(lines[0]);
    // alert(lines[0][0]);
    return lines;
}


data = processData(return_csv());
count_data = get_count_data(data);

function get_count_data(x){
    var datasets = [[0,0,0,0],[0,0,0,0]]
    x.forEach(data_read);
    function data_read(item, index){
        for (i=3;i<7;i++){
            if (item[i].split(':')[1] == 0 ){
                datasets[0][i-3] += 1;
            } 
            else{
                datasets[1][i-3] += 1;
            }
       }
    }
    return datasets;
}









function map_label_to_dataset(value, index, array) {
  if (index % 2 == 0) {
    color = "#8e5ea2";
    d = count_data[0];
  } else {
    color = "#3e95cd";
    d = count_data[1];
  }

  var x = { label: value, backgroundColor: color, data: d };
  return x;
}

// d3.csv("../db/kryptonPersonas.csv").then(makeChart);


  

  var L = ["A", "B"];

  var datasets = L.map(map_label_to_dataset);

  console.log(datasets);

new Chart(document.getElementById("bar_chart_count_person"), {
    type: "bar",
    data: {
      labels: ["I  -  E", "N  -  S", "T  -  F", "J  -  P"],
      datasets: datasets,
    },
    options: {
      title: {
        display: true,
        text: "Comparação das Caracteristicas individuais",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

//get percents
p1 = Math.round((count_data[0][0]/(count_data[0][0] +count_data[1][0]))*1000)/10;
p2 = Math.round((count_data[0][1]/(count_data[0][0] +count_data[1][0]))*1000)/10;
p3 = Math.round((count_data[0][2]/(count_data[0][0] +count_data[1][0]))*1000)/10;
p4 = Math.round((count_data[0][3]/(count_data[0][0] +count_data[1][0]))*1000)/10;


//update percentage in text
  document.getElementById("p01").innerHTML = p1 + "%";
  document.getElementById("p02").innerHTML = p2 + "%";
  document.getElementById("p03").innerHTML = p3 + "%";
  document.getElementById("p04").innerHTML = p4 + "%";

//update percentage in progress bar
document.getElementById("pb01").style="width: "+p1+"%;";
document.getElementById("pb02").style="width: "+p2+"%;";
document.getElementById("pb03").style="width: "+p3+"%;";
document.getElementById("pb04").style="width: "+p4+"%;";
function return_csv(){
    return "Id, Name, Personality,P01,P02,P03,P04,0,Bessa,INTP,0,0,0,1,1,Gugão,INTJ,0,0,0,0,2,Simons,ISFP,0,1,1,1,3,Bruna,ESFJ,1,1,1,0,4,Clara,ESFP,1,1,1,1,5,Amanda,INFP,0,0,1,1,6,Tucão,ISFJ,0,1,1,0,7,Gui,ENFP,1,0,1,1,8,Chomp,INTJ,0,0,0,0,9,Gutão,ESFP,1,1,1,1,10,Duarte,ISTJ,0,1,0,0,11,Cardoso,INFP,0,0,1,1,12,Marcelo,INFP,0,0,1,1,13,Rol,ISTJ,0,1,0,0,14,Liana,ISFJ,0,1,1,0,15,Ponds,INFP,0,0,1,1";

}



//fill table

function create_user_row_div(img_path,name,sub_name){
  var div1 = document.createElement("div");
  div1.className =  "widget-content p-0";
  var div2 = document.createElement("div");
  div2.className =  "widget-content-wrapper";
  var div3 = document.createElement("div");
  div3.className =  "widget-content-left mr-3"; 
  var div4 = document.createElement("div");
  div4.className =  "widget-content-left"; 
  var img1 = document.createElement("img");
  img1.className = "rounded-circle";
  img1.style.width = "50px";
  img1.alt = "";
  img1.src = img_path;
  //img to 4
  div4.appendChild(img1);
  //3 to 4
  div3.appendChild(div4);
  //3 to 2
  div2.appendChild(div3);
  var div5 = document.createElement("div");
  div5.className =  "widget-content-left flex2"; 
  var div6 = document.createElement("div");
  div6.className =  "widget-heading"; 
  div6.innerHTML = name;
  // var div7 = document.createElement("div");
  // div7.className =  "widget-subheading opacity-7"; 
  // div7.innerHTML = sub_name;
  //6e7 -> 5
  div5.appendChild(div6);
  // div5.appendChild(div7);
  //5 to 2
  div2.appendChild(div5);
  div1.appendChild(div2);

    return div1;
}


function mount_people_row(id,dataRow,row){
  id = dataRow[0].split(':')[1];
  
  name = dataRow[1].split(':')[1];
  ptype = dataRow[2].split(':')[1];
  img_path = "assets/images/people/"+name+".jpg";
  category = P_dict[ptype][0];
  profession = P_dict[ptype][1];

  //Cell1
  var cell1 = row.insertCell(0);
  cell1.className = "text-center text-muted";
  cell1.innerHTML = "#"+id;

  //Cell2
  var cell2 = row.insertCell(1);
  cell2.appendChild(create_user_row_div(img_path=img_path,name=name,sub_name="Web Developer"));

  //Cell3
  var cell3 = row.insertCell(2);
  cell3.className = "text-center";
  cell3.innerHTML = ptype;
// "badge badge-success" -> green ->diplomata
// "badge badge-primary" -> blue -> sentinela
// "badge badge-warning" -> orange -> explorador
//"badge badge-alternate" -> roxo -> analista
  badge_dict  ={ 'Analista' : "badge badge-alternate" , 
  'Diplomata' : "badge badge-success",
   'Sentinela' : "badge badge-primary",
    'Explorador' : "badge badge-warning"}  

  //Cell4
  var cell4 = row.insertCell(3);
  cell4.className = "text-center";
  var div_cell4 = document.createElement("div");
  div_cell4.className =  badge_dict[category]; 
  div_cell4.innerHTML = category;
  cell4.appendChild(div_cell4);
  //Cell5
  var cell5 = row.insertCell(4);
  cell5.className = "text-center";
  var div_cell5 = document.createElement("div");
  div_cell5.className =  badge_dict[category]; 
  div_cell5.innerHTML = profession;
  cell5.appendChild(div_cell5);
  
}

function mount_people_table(table,data){
// console.log(data)
for (x=0; x<data.length; x++){
  var row = table.insertRow(x+1);
  mount_people_row(x,data[x],row)
}


}



// TABELA DE SIMILIARIDADE
function calculate_sim(data){
  Head = [];
  Rows = [];
  Percent_label = ['0%',"25%",'50%',"75%","100%"];
  max = data.length;
  for (x=0;x<max;x++){
    person = data[x];
    Head.push(person[1].split(':')[1]);
    r = [];
    r.push(person[1].split(':')[1]);
    person_p1 = person[3].split(':')[1]
    person_p2 = person[4].split(':')[1]
    person_p3 = person[5].split(':')[1]
    person_p4 = person[6].split(':')[1]

    for(y=0; y<max; y++){
      p_row = data[y];
      val = 0;
      p_row_p1 = p_row[3].split(':')[1]
      p_row_p2 = p_row[4].split(':')[1]
      p_row_p3 = p_row[5].split(':')[1]
      p_row_p4 = p_row[6].split(':')[1]

      if (person_p1 == p_row_p1){
        val += 1;
      }
      if (person_p2 == p_row_p2){
        val += 1;
      }
      if (person_p3 == p_row_p3){
        val += 1;
      }
      if (person_p4 == p_row_p4){
        val += 1;
      }
      r.push(Percent_label[val])

    }
    Rows.push(r)

  }
  return [Head, Rows]
}

// Find a <table> element with id="myTable":
var table = document.getElementById("peopleTab");

mount_people_table(table=table,data=data);

document.getElementById("deletable_row").remove(); 







function mount_sim_table(table,dataH,dataR){
  //Create Table head
  head = table.createTHead();
  head_row = head.insertRow(0);
  var cell0 = head_row.insertCell(0)
  cell0.innerHTML = "";
  for (x=0; x<dataH.length; x++){
    var cell = head_row.insertCell(x+1);
    cell.innerHTML = "<b>"+dataH[x]+"<b\>";
    cell.className = "text-center";
    
  }

  // create rows
  for (x=0; x<dataR.length; x++){
      var row = table.insertRow(x+1);
      d = dataR[x];
      //cells
      for (y=0; y<d.length;y++){
        cell = row.insertCell(y);
        cell.className = "text-center text-muted";
        cell.innerHTML = "<b>"+d[y]+"<b\>";
        if(d[y] == "0%"){
          cell.style.backgroundColor = "#eca1a6D9"
        }
        if(d[y] == "25%"){
          cell.style.backgroundColor = "#f7cac9D9"
        }
        if(d[y] == "50%"){
           cell.style.backgroundColor = " #e3eaa7D9"
        }
        if(d[y] == "75%"){
          cell.style.backgroundColor = "#d5e1dfD9"
        }
        if(d[y] == "100%"){
          cell.style.backgroundColor = "#b5e7a0D9"
        }
      }
     }
 
  // console.log(data)
  // for (x=0; x<data.length; x++){
  //   var row = table.insertRow(x+1);
  //   mount_people_row(x,data[x],row)
  // }
  
  
  }
  

//Tabela de similiaridade
tab_sim = document.getElementById("Tab_sim"); 

cal_sim = calculate_sim(data);
head_data = cal_sim[0];
row_data = cal_sim[1];

mount_sim_table(tab_sim,head_data,row_data);

document.getElementById("trremove2").remove(); 
