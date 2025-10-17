function solveEquation() {
  const input = document.getElementById("equation").value;
  try {
    // Example parser for simple equations (single variable 'x')
    const sides = input.split("=");
    if (sides.length !== 2) throw "Invalid equation format";

    const left = sides[0].replace(/ /g, "");
    const right = parseFloat(sides[1]);

    // Find coefficients
    const matches = left.match(/([+-]?\d*)x/g);
    const constants = left.replace(/([+-]?\d*x)/g, "")
                          .split(/(?=[+-])/)
                          .map(x => parseFloat(x) || 0);
    const constSum = constants.reduce((a, b) => a + b, 0);

    let coeffSum = 0;
    if (matches) {
      matches.forEach(m => {
        const num = m.replace("x", "");
        coeffSum += num === "" || num === "+" ? 1 : num === "-" ? -1 : parseFloat(num);
      });
    }

    const x = (right - constSum) / coeffSum;
    document.getElementById("result").innerText = `The value of x is: ${x.toFixed(3)}`;
  } catch (err) {
    document.getElementById("result").innerText = "Invalid equation. Try again.";
  }
}
