var workDay = [
    {time: 8, text: ""},
    {time: 9, text: ""},
    {time: 10, text: ""},
    {time: 11, text: ""},
    {time: 12, text: ""},
    {time: 13, text: ""},
    {time: 14, text: ""},
    {time: 15, text: ""},
    {time: 16, text: ""},
    {time: 17, text: ""}
  ];

$(document).ready(function() {
  var scheduledItems = JSON.parse(localStorage.getItem("schedule")) || [];

    var date = moment().format("MMMM D, YYYY");
    var storageDate = moment().format("YYYY-MM-DD");
    console.log(moment(storageDate.split("-")).subtract(2, 'days').subtract(1,"months").format("YYYY-MM-DD"));

    console.log(storageDate);

    $("#today").text(date);

   var currentHour = parseInt(moment().format("HH"));

  scheduledItems.forEach(function(item) {
    console.log(item);
    var currentItem = $('[data-time=' + item.time + ']');
    if (currentItem.length) {
      var input = currentItem.closest('.row').find('input');
      input.val(item.text);
    }
   });
    
   $('.row').each(function (index, element) {
    var time = parseInt($(element).find('[data-time]').attr("data-time"));
    var input = $(element).find('input');
    
    console.log(time, input);

    // if this elements time is in the list populate it with text

    if (currentHour > time) {    
      // logic for past // secondary
      input.attr('class', 'bg-secondary');
    } else if (currentHour === time) {
      // logic for present // primary
      input.attr('class', 'bg-primary');
    }
  });
    
    // localStorage.setItem("", JSON.stringify());
    
    $(".saveBtn").on("click", function() {
        var parent = $(this).closest('.row');
        var savedTime = parseInt($(parent.children()[0]).attr("data-time"));
        var text = parent.find("input").val();
        console.log(savedTime);
        
        scheduledItems.push({time: savedTime, text: text, day: storageDate});
        localStorage.setItem("schedule", JSON.stringify(scheduledItems));
    })
})
