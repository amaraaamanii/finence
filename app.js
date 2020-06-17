//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn:'.add__btn'
    };

   return {
       getInput: function(){
           return {
           type: document.querySelector(DOMstrings.inputType).value,
           description: document.querySelector(DOMstrings.inputDescription).value,
           value: document.querySelector(DOMstrings.inputValue).value
       }
   },
   getDOMstrings: function(){
       return DOMstrings;
   }
}
})();
//Сахүүтэй ажиллах контроллер
var financeController = (function() {
 var Income = function(id, description, value) {
     this.id = id;
     this.description = description;
     this.value = value
 }

 var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value
}

var data = {
    allItems: {
        inc: [],
        exp: []
    },

    totals: {
        inc: 0,
        exp: 0
    }
}


})();
//Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function(){
        //дэлгэцнээс оруулсан өгөгдлийг олж авна
    console.log(uiController.getInput());
    // олж авсан өгөгдлөө санхүүгийн контроллерт дамжуулан тэнд хадгална
    //олж авсан өгөгдлөө тохирох хэсэгт дэлгэцэнд гаргана
    //төсвийг тооцно
    // эцийн үдэгдэл тооцоог дэлгэцэнд гаргана
    }

    var setupEventListeners = function(){

        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function(){
            ctrlAddItem();
        });
    
        document.addEventListener("keypress", function(event){
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            };
        });
    }

    return {
        init: function() {
        console.log('web ajilllaj ehellee ...............');
        setupEventListeners();
        }
    }
    
})(uiController, financeController);

appController.init();