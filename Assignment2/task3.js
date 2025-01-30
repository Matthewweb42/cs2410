/*
Since people are going to be buying virtual property in the meta-verse they will need to know how much their mortgage on that property will be. 
See https://www.bankrate.com/mortgages/mortgage-calculator/Links to an external site. 
for a working example and the formula for calculating the monthly payment.

The mortgage calculator should include inputs for the loan amount, the yearly interest rate, and the number of years the loan term will be. 
Widgets R' Us would like the calculation to be updated anytime the user changes one of the fields rather than when the user pushes a button. 
This means that you will need to pre-populate each of the inputs with good default values and provide an initial calculation for those default values.

Note that because you are asking the user for yearly interest rate and number of years you will need to convert
 that into a monthly interest rate and number of months for your calculation.

You can use the blur event on the fields to re-perform the calculation. You will need to use the javascript parseFloat function
 to get the information from the text the user inputs. parseFloat takes a string and returns an number. If the string doesn't contain a 
 number then parseFloat will return the NaN value. The only way to know if something contains the NaN value is to use `Number.isNaN(yourValue)`.

Additionally, the Math object will be your friend. `Math.pow(num, exponent)` 
is how you do an exponent in JavaScript.

Other Technical Requirements

If the user provides an incorrect value for one of the fields then the calculation 
should display a message saying that an error occurred but the program should not crash.

If the user deletes the value from one of the fields and blurs the field, rather than display an error you 
should just re-populate the field with the original default value and perform the calculation.
*/




