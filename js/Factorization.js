var Factorization = function() {
    var initModule = function() {   // initialize module
        $("#divCalc").click(calculate);
        $("#divClear").click(clear);
    };
    
    var calculate = function(e) { // Do this when CALCULATE button is clicked
        if(e.type == "click") {
            $("#tree").remove();
            var err = validateInput();
            if(err == true)
            {
                var divRes = $("#divRes");
                var number = $("#number").val();
                var fact = Factorize(number);
                var normalForm = arrayToNormal(fact);
                var expForm = arrayToExponential(fact);

                // divRes.html(normalForm +"<br>" + expForm);
                
                // Show normal form
                divRes.append($("<span id='normalLabel'></span>"));
                $("#normalLabel").html("The prime factorization is : <br>");
                divRes.append($("<span id='normalRes'></span>"));
                $("#normalRes").html(normalForm + "<p>");

                // Show exponential form
                divRes.append($("<span id='expLabel'></span>"));
                $("#expLabel").html("Exponential form : <br>");
                divRes.append($("<span id='expRes'></span>"));
                $("#expRes").html(expForm + "<p>");

                if($("#createTree").prop("checked") == true)
                    createTree(number,fact);
            }
        }
    };

    var clear = function(e) { // Do this when CLEAR button is clicked
        if(e.type == "click") {
            var number = $("#number");
            var divRes = $("#divRes");
            $("#tree").remove();
            $('#createTree').prop('checked', false);
            $("#divErr").html("");
            number.val("");
            divRes.html("");
            
        }
    };

    function arrayToNormal(fact) { // convert an array of factors to AxBxC...Z
        var factors = "";
        for( var i = 0; i < fact.length-1; i++)
            factors = factors + fact[i] + " x ";
        factors = factors + fact[fact.length-1];
        return factors;
    }

    function arrayToExponential(fact) { // convert an array of factors to A^a x B^b x C^c...Z^z
        var factors = "";
        var i;
        for( i = 0; i < fact.length; i++)
        {
            var exp = 1;
            factors = factors + fact[i];
            while(fact[i] == fact[i+1])
            {
                exp++;
                i++;
            }
            factors = factors + "<sup>" + exp + "</sup>";
            if (i < fact.length - 1)
                factors = factors + " x ";
        }

        return factors;
    }

    function createTree(number, fact) { // Create a tree
        var numOfFactors = fact.length;
        var colSize = numOfFactors + 1;
        var rowSize = 2 * numOfFactors - 1;
        
        
        if($('#tree').length == 0) // only append if element doesnt exist
            $("#sResults:last").append($("<div id='tree'><p\><span id='treeLabel'>Factorization tree : </span></div>"));
        var tree = $("#tree");
        var currFactor = 0;
        var currColNumber = 1;
        var setDelay = 0;
        for(var j = 0; j < rowSize; j++)
        {
            var newRow = $("<div id = 'row" + j + "' class='row'> </div>");
            tree.append(newRow);
            for(var i = 0; i < colSize; i++)
            {
                if ((j == 0) && (i == 1))   // print first number
                {
                    content = number;
                }
                else if ((j % 2 == 1) && (i == currColNumber)) // print lines
                {
                    content = "/ \\";
                }
                else if ((j % 2 == 0) && (j != 0) && (i == currColNumber - 1)) // print factor
                {
                    content = fact[currFactor];
                }
                else if ((j % 2 == 0) && (j != 0) && (i == currColNumber + 1)) // print new number
                {
                    content = number/fact[currFactor];
                    number = number/fact[currFactor];
                    currFactor++;
                }
                else
                {
                    content = "";
                }

                var newCell = $("<div id = 'cell" + i + "' class = 'cell'>" + content + "</div>");

                
                newCell.css({"display" : "inline-block",
                              "width" : "30px",
                              "height" : "15px",
                              "opacity": 0,
                              "text-align" : "center"});

                if(content != "" && content != "/ \\")
                {
                    newCell.css({    
                        "color": "rgba(255, 255, 255, 0.678)",
                        "border": "1px solid rgba(255, 255, 255, 0.678)",
                        "padding": "2%",
                        "border-radius" : "50%"});
                } 

                newRow.append(newCell);
                
                newCell.delay(setDelay).animate({opacity: 1}, 1000);
                setDelay = setDelay + 150;

            }
            if (j > 0 && j % 2 == 0)
                currColNumber++;
        }
    }




    function validateInput() { // check if input is valid
        var number = $("#number").val();
        var res = true;
        var errNull = "Must contain a value";
        var errNeg = "Value must be positive";
        var err = $("#divErr");
        var divRes = $("#divRes");
        if(number == "")
        {
            res = false;
            err.html(errNull);
            divRes.html("");
        }
        else if(parseInt(number) <= 0)
        {
            res = false;
            err.html(errNeg);
            divRes.html("");
        }
        else if (isPrime(number) == true)
        {
                err.html("This is a prime number!");
                res = false;
                divRes.html("");
        }
        else
            err.html("");
        
        return res;
    }

    function Factorize(number) { // CHANGE ME 
        var factors = [];
        var x = 2;
        while(x <= number)
        {
            if (number % x == 0)
            {
                factors.push(x);
                number = number / x;
            }
            else
            {
                x = nextPrime(x);
            }
        }
        if(number != 1)
            factors.push(number);
        return factors;
    }

    function isPrime(number) { // check if a number is prime
        var i;
        for (i = 2; i < number; i++) { 
            if((number % i) == 0)
                return false;
            }
        return true;
    }

    function nextPrime(currNumber) { // returns the next prime number
        while(true)
        {
            currNumber++;
            if(isPrime(currNumber) == true)
                return currNumber;
        }
    }
    
    return { initModule : initModule };
}();

$(document).ready(function() {Factorization.initModule(); });