function sanitize_input(card_number) {

    if(card_number.length == 0) {
        document.getElementById('result').innerHTML = "<h3 class='ui center aligned header'><p style='color: red;'>Please enter a credit card number in the box before checking.</p></h3>";
        return false;
    }

    if(isNaN(card_number)) {
        document.getElementById('result').innerHTML = "<h3 class='ui center aligned header'><p style='color: red;'>Invalid input. Please enter the credit card number only.</p></h3>";
        return false;
    }

    return true;
}

function check_card() {

    // clear the previous attempt
    document.getElementById('result').innerHTML = "";
    document.getElementById('card_type').innerHTML = "";

    // get the card number from the input field
    var input = document.getElementById('input').value;

    card_number = input.replace(/-/g, "");
    
    if(sanitize_input(card_number)) {
        
        // itterate over the input and double every second digit from right to left
        // if result is two digits, add both digits
        
        var i;
        var sum1 = 0;
        var sum2 = 0;

        for(i = card_number.length - 2; i >= 0; i = i - 2) {
            var doubled = parseInt(card_number[i]) * 2;

            if(doubled > 9) {
                doubled = "" + doubled;
                var reduced = parseInt(doubled[0]) + parseInt(doubled[1]);
                sum1 = sum1 + parseInt(reduced);
            }

            else {
                sum1 = sum1 + doubled;
            }
        }

        // itterate over the input and sum all odd places from right to left

        for(i = card_number.length - 1; i >= 0; i = i - 2) {
            sum2 = sum2 + parseInt(card_number[i]);
        }

        // sum the sums :P

        var final_sum = sum1 + sum2;

        if(final_sum % 10 == 0 && card_number.length > 12 && card_number.length < 17) {
            document.getElementById('result').innerHTML = "<h3 class='ui center aligned header'><p style='color: green;'>VALID CREDIT CARD NUMBER</p></h3>"

            // check card type

            var type = '';

            switch(card_number[0]) {
                case '4':
                    type = 'Visa';
                    break;
                case '5':
                    type = 'Master Card';
                    break;
                case '6':
                    type = 'Discover Card';
                    break;
                default:
                    if(card_number.substring(0,2) == '37') {
                        type = 'American Express';
                    }
                    else {
                        type = 'Not a known card company.'
                    }
            }

            document.getElementById('card_type').innerHTML = "<h5 class='ui center aligned header'><p style='color: green;'>Card Type: " + type + "</p></h5>";
        }
        else {
            document.getElementById('result').innerHTML = "<h3 class='ui center aligned header'><p style='color: red;'>INVALID CREDIT CARD NUMBER</p></h3>"
        }
    }

}