"use strict";
let dogs =[];
function Dog(dog) {
  this.title = dog.title;
  this.image_url = dog.image_url;
  this.description = dog.description;
  this.keyword = dog.keyword;
  this.horns= dog.horns;
  dogs.push(this);

}



// Using a clone
Dog.prototype.cloneRender = function () {
  let clonedSection = $("#photo-template").clone();
  clonedSection.find("h2").text(this.title);
  clonedSection.find("p").text(this.description);
  clonedSection.find("img").attr("src", this.image_url);
  clonedSection.removeClass("#photo-template");
  clonedSection.attr("id", this.title);
  $("main").append(clonedSection);
};

let keywords = [];
Dog.prototype.option = function(){
    if (!keywords.includes(this.keyword)){
        keywords.push(this.keyword)
    } 
}

function renderSelect (){
    for(let i =0 ; i < keywords.length ; i++){
        let optionEl = $("<option></option>");
        optionEl.text(keywords[i]);
        optionEl.attr("value", keywords[i]);
        $("#select").append(optionEl);

    }
}



const ajaxSettings = {
  method: "get",
  dataType: "json",
};

$.ajax("data/page-1.json", ajaxSettings).then((data) => {
  data.forEach((dog) => {
    let dogObject = new Dog(dog);

    // render the create dog object
    // dogObject.renderManually();
    dogObject.cloneRender();
    dogObject.option();
  });
  renderSelect();

  $("#select").on("change", function (event){
     let keyword= event.target.value;
     console.log(keyword);
    $("main").empty();
    for(let i = 0; i < dogs.length ; i++){
        if (dogs[i].keyword === keyword){
            console.log(dogs[i].keyword === keyword);
            dogs[i].cloneRender();
        }
    }
  })
});
