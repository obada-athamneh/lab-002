"use strict";
let dogs = [];
function Dog(dog) {
  this.title = dog.title;
  this.image_url = dog.image_url;
  this.description = dog.description;
  this.keyword = dog.keyword;
  this.horns = dog.horns;
  dogs.push(this);

}

// Using a clone
// Dog.prototype.cloneRender = function () {
//   let clonedSection = $("#photo-template").clone();
//   clonedSection.find("h2").text(this.title);
//   clonedSection.find("p").text(this.description);
//   clonedSection.find("img").attr("src", this.image_url);
//   clonedSection.removeClass("#photo-template");
//   clonedSection.attr("id", this.title);
//   $("main").append(clonedSection);
// };

Dog.prototype.cloneRender = function () {
  $('section:last-child').attr('id', ids);
  let template = $("#photo-template").html();
  let html = Mustache.render(template, this);
  $("main").append(html);
}

let keywords = [];
Dog.prototype.option = function () {
  if (!keywords.includes(this.keyword)) {
    keywords.push(this.keyword)
  }
}

function renderSelect() {
  for (let i = 0; i < keywords.length; i++) {
    let optionEl = $("<option></option>");
    optionEl.text(keywords[i]);
    optionEl.attr("value", keywords[i]);
    $("#select").append(optionEl);
  }
}
let keyword2 = [];
function renderSelect2() {
  for (let i = 0; i < keyword2.length; i++) {
    let optionEl = $("<option></option>");
    optionEl.text(keyword2[i]);
    optionEl.attr("value", keyword2[i]);
    $("#select").append(optionEl);

  }
}




const ajaxSettings = {
  method: "get",
  dataType: "json",
};
let ids = 0;
$.ajax("data/page-1.json", ajaxSettings).then((data) => {
  data.forEach((dog) => {
    let dogObject = new Dog(dog);

    // render the create dog object
    // dogObject.renderManually();

    dogObject.cloneRender();
    ids++
    dogObject.option();

  });
  renderSelect();
});





$("#select").on("change", function () {
  let keyword = $("#select").val();
  console.log(keyword);
  $("main").empty();
  for (let i = 0; i < dogs.length; i++) {
    if (dogs[i].keyword === keyword || keyword === 'default') {
      dogs[i].cloneRender();
    }
  }
})

$("#sort").on("change", () => {
  let sort = $("#sort").val();
  if (sort === 'Keyword') {
    dogs = dogs.sort((a, b) => {
      if (a.keyword < b.keyword) {
        return -1;
      }
      if (a.keyword > b.keyword) {
        return 1;
      }
      return 0;
    });
  } else {
    dogs = dogs.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
  $("main").empty();
  dogs.forEach((dog) => {
    dog.cloneRender();
  })
});

function selectFile() {
  emptySelect();
  $("main").empty();
  $.ajax("data/page-1.json", ajaxSettings).then((data) => {
    data.forEach((dog) => {
      let dogObject = new Dog(dog);

      // render the create dog object
      // dogObject.renderManually();

      dogObject.cloneRender();
      ids++
      dogObject.option();

    });
    renderSelect();
  });
}

function emptySelect() {
  keywords = [];
  $("#select")               //Select the parent of the object
    .children()             //Select all the children of the parent
    .not(':first-child')    //Unselect the first child
    .remove();
}

function selectFile2() {
  emptySelect();
  $("main").empty();
  $.ajax("data/page-2.json", ajaxSettings).then((data) => {
    data.forEach((dog) => {
      let dogObject = new Dog(dog);
      console.log(dogObject.image_url)
      // render the create dog object
      // dogObject.renderManually();
      dogObject.cloneRender();
      ids++;

      dogObject.option();
    });
    renderSelect();
  });
}
