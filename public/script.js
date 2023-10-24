document.addEventListener("DOMContentLoaded", function () {
    var metaphorCountInput = document.getElementById("metaphor_count");
  
    if (metaphorCountInput) {
      metaphorCountInput.addEventListener("input", function () {
        if (this.value < 0) {
          this.value = 0;
        }
      });
    }
  });