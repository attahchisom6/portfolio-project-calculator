Requirements
A function named handleOperationWithoutOperator that recieves a string argument name expression
  defines a const list of function names precisely const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot', 'cosec']

  iterates through each element in the list as item
  if item is in the expression
    check if the previous element prevItem before the item in the expression is an operator or a floatParsible.
      if prevItem is an operator.
        proceed to check if the next elemnt after item nextItem delimited by an operator is within a bracket e.g item80+
        if nextItem is not in bracket, enclose it in a bracket e.g item + '(' + nextItem + ')'.
         else if its in a bracket leave it just like that e.g item(90) will be item(90);

      if prevItem is floatparsible.
        proceed to check if the next elemnt after item nextItem delimited by an operator is within a bracket e.g item80+                             if nextItem is not in bracket, enclose it in a bracket e.g item += '(' + nextItem + ')'.                                                       else if its in a bracket leave it just like that e.g item(90) will just be item = item(90);
        join prevItem with item using "*"

        e.g prevItem + "*" item.

  Repeat the above procedure for all the item sp element in the expression so far that matches the item;

the essence of this psuedoCode is to implement a function that achieves the following

1. if an expr = "3 + cos(30)" is paseed to it, it returns '3 + cos(30)"

2. if expr = "3 + 5cos(30)", "3 + 5 * cos(30)" is retuned

3. if expr = "3 + 5cos30", "3 + 5 * cos(30)" is returned

4. and genarally if expr = "2 + cos30 + 7cosec(50) + 4tan80" is passed "2 + cos(30) + 7 * cosec(50) + 4 * tan(80)" is retuned

pls if there is something missing in the requirements to achieve these result u can fix or add it and implement a code to thoroughly  satisfy this requirement

function handleOperationWithoutOperator(expression) {
  const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot', 'cosec'];

  let k = 0;
  while (expression && k < expression.length) {
    for (const item of funcs) {
      if (expression.contains(item)) {
        const itemIndex = expression.indexOf(item);
