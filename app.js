//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    var DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      addBtn: ".add__btn",
      incomelist: ".income__list",
      expenseslist: ".expenses__list"
    };
  
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value, // exp, inc
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        };
      },
  
      getDOMstrings: function() {
        return DOMstrings;
      },

      clearFields: function() {
        var fields = document.querySelectorAll(
          DOMstrings.inputDescription + ", " + DOMstrings.inputValue
        );
  
        // Convert List to Array
        var fieldsArr = Array.prototype.slice.call(fields);
  
        fieldsArr.forEach(function(el, index, array) {
          el.value = "";
        });
  
        fieldsArr[0].focus();
        // for(var i = 0; i < fieldsArr.length; i ++ ){
        //   fieldsArr[i].value = "";
        // }

      },
  
      addListItem: function(item, type) {
    //орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ
    var html, list;
    if (type === "inc") {
      list = DOMstrings.incomelist;
      html =
        '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
    } else {
        list = DOMstrings.expenseslist;
      html =
        '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }
    //тэр html дотроо зарлагын утгуудыг replace ашиглаж өөрчилж өгнө
    html = html.replace("%id%", item.id);
    html = html.replace("$$DESCRIPTION$$", item.description);
    html = html.replace("$$VALUE$$", item.value);

    // Бэлтгэсэн HTML ээ dom руу хийж өгнө
    document.querySelector(list).insertAdjacentHTML("beforeend", html);
}
};
})();
//Сахүүтэй ажиллах контроллер
var financeController = (function() {
    // private data
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    // private data
    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var calculateTotal = function(type){
      var sum = 0;
      data.items[type].forEach(function(el){
        sum = sum + el.value;
      });

      data.totals[type] = sum;

    }  
    // private data
    var data = {
      items: {
        inc: [],
        exp: []
      },
  
      totals: {
        inc: 0,
        exp: 0
      },

      tusuv: 0,
      huvi: 0
    };

    return {
        tusvoogTootsoolno: function(){
          calculateTotal("inc");
          calculateTotal("exp");

          data.tusuv = data.totals.inc - data.totals.exp;
          data.huvi = Math.round((data.totals.exp/data.totals.inc)*100) + "%";
        },

        tusviigAvah: function(){
          return {
            tusuv: data.tusuv,
            huvi: data.huvi,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp
          }
        },
        addItem: function(type, desc, val) {
          var item, id;
    
          if (data.items[type].length === 0) id = 1;
          else {
            id = data.items[type][data.items[type].length - 1].id + 1;
          }
    
          if (type === "inc") {
            item = new Income(id, desc, val);
          } else {
            item = new Expense(id, desc, val);
          }
    
          data.items[type].push(item);
    
          return item;
        },
    
        seeData: function() {
          return data;
        }
      };
    })();
//Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
        //дэлгэцнээс оруулсан өгөгдлийг олж авна
        var input = uiController.getInput();

        if(input.description !== "" && input.value){
            // олж авсан өгөгдлөө санхүүгийн контроллерт дамжуулан тэнд хадгална
  var item = financeController.addItem(
    input.type,
    input.description,
    input.value
  );
    //олж авсан өгөгдлөө тохирох хэсэгт дэлгэцэнд гаргана
    uiController.addListItem(item, input.type);
    uiController.clearFields();
        }
      
    //төсвийг тооцно
    financeController.tusvoogTootsoolno();
    // эцийн үдэгдэл тооцох
        var tusuv = financeController.tusviigAvah();
    //дэлгэцэнд гаргана
    console.log(tusuv);
};
  
var setupEventListeners = function() {

  var DOM = uiController.getDOMstrings();

  document.querySelector(DOM.addBtn).addEventListener("click", function() {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
};

return {
  init: function() {
    console.log("Application started...");
    setupEventListeners();
  }
};
})(uiController, financeController);

appController.init();