
var countyData;
var educationData;


var drawMap=()=>{
   const w= 500;
  const h=500;
  padding = 60;


  var svg=d3.select('body')
  .append("svg")
  .attr('width', w)
  .attr('height',h)
  
  
    var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .attr("id", "tooltip")
                  .style("opacity", 100)
  
  svg.selectAll('path')
     .data(countyData)
     .enter()
     .append('path')
  .attr('d',d3.geoPath())
     .attr('class','county')
     .attr('fill',(d) => {
      const county = educationData.find((item) => {
   return item['fips'] === d['id']})
  const percent = county['bachelorsOrHigher'];
  if (percent <=25){
    return 'purple'
  }else if (percent <=50){
    return 'green'
  }else if (percent <=75){
    return 'blue'
  }else {return 'red'}
  })
  .attr('data-fips',(d)=>{return d['id']})
  .attr('data-education',(d) => {
      const county = educationData.find((item) => {
   return item['fips'] === d['id']})
       const percent = county['bachelorsOrHigher'];
    return percent;})
.on("mouseover",function(d){
    tooltip.transition()
           .duration(200)
           .style("opacity", 0.9);
    const county = educationData.find((item) => {
   return item['fips'] === d['id']})
     tooltip.html(county['fips'] + ' - ' + county['area_name'] + ', ' + 
                    county['state'] + ' : ' + county['bachelorsOrHigher'] + '%')
   tooltip.attr('data-education', county['bachelorsOrHigher'])
  })
   .on("mouseout", function(d){
        tooltip.transition()
               .duration(50)
               .style("opacity", 0);
      });
  
   
      
}
   
   

d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json").then((data,error)=>{
  if(error){
    console.log(error)
  }else{
    countyData=topojson.feature(data,data.objects.counties).features
    console.log(countyData)
    
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json").then((data,error)=>{
      if(error){
        console.log(error)
      }
      else{
        educationData= data
        console.log(educationData)
        drawMap()
      }
    })
  
  }})

