'use strict';
let objArr = [];
let keyWord = [];
let inx = 0;
function Animals(img, title, des, key, horns){
    this.img = img;
    this.title = title;
    this.des = des;
    this.key = key;
    this.horns = horns;
    this.id = inx;
    objArr.push(this)
}
let container;
Animals.prototype.renderAll = function() {
    container = $('#photo-template').clone();
    $('main').append(container);
    container.find('h2').text(this.title);
    container.find('img').attr('src',this.img);
    container.find('p').text(this.key);
    container.removeAttr('id');
    container.attr('id', this.id);
    inx++;
}
Animals.prototype.addOption = function(){ 
    if (keyWord.includes(this.key)){

    }else{
        keyWord.push(this.key)
        let newOption = $('<option></option>');
        $('#select').append(newOption);
        newOption.text(this.key);
}}

function renderSelect () {
    $('#select').on('click', function(){
        for (let i = 0; i<inx; i++){
            if (objArr[i].key == $('#select').val()) {
                $('#'+i).show();
            }else{
                if($('#select').val() == 'default'){
                    $('#'+i).show();
                }else{
                $('#'+i).hide();
            }}
        }
    })
}


function getData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSettings).then( data => {
        data.forEach(element => {
            let newAnimal = new Animals(element.image_url, element.title, element.description, element.keyword, element.horns);
            newAnimal.renderAll();
            newAnimal.addOption();
        });
    }
    
    )}

$('document').ready(getData);
renderSelect();